import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { modules as seedModules, moduleAccents, moduleImages } from "./data.js";
import { useAuth } from "./AuthContext.jsx";
import { supabase, isSupabaseConfigured } from "./lib/supabase.js";

const CourseContext = createContext(null);
const STORAGE_KEY = "skykapital-progress-v1";

// Seed each module with its accent colour and themed photo.
const seeded = seedModules.map((m) => ({
  ...m,
  accent: moduleAccents[m.id],
  image: moduleImages[m.id],
}));

// Load saved progress and overlay it onto the current seed. We persist only
// the *progress* (status/score/progress), never content — so code edits to
// lessons/quizzes still take effect while a learner's progress survives.
function loadInitial(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return { modules: seeded, acknowledgements: [] };
    const saved = JSON.parse(raw);
    const byId = saved.progress || {};
    const modules = seeded.map((m) =>
      byId[m.id]
        ? {
            ...m,
            status: byId[m.id].status ?? m.status,
            score: byId[m.id].score ?? m.score,
            progress: byId[m.id].progress ?? m.progress,
            completedOn: byId[m.id].completedOn ?? m.completedOn,
          }
        : m
    );
    return { modules, acknowledgements: saved.acknowledgements || [] };
  } catch {
    return { modules: seeded, acknowledgements: [] };
  }
}

export function CourseProvider({ children }) {
  // Progress is stored PER ACCOUNT when signed in (fresh accounts start at
  // zero); the shared key is only used in local demo mode without auth.
  const { enabled: authEnabled, user } = useAuth();
  const storageKey =
    authEnabled && user ? `skykapital-progress-${user.id}` : STORAGE_KEY;

  const initial = loadInitial(storageKey);
  const [modules, setModules] = useState(initial.modules);
  const [acknowledgements, setAcknowledgements] = useState(
    initial.acknowledgements
  );

  // Switch data when a different account signs in (or out). `loadedKey`
  // guards the persist effect below: never write state that belongs to the
  // PREVIOUS key into the new one (that would copy demo/test progress into a
  // fresh account).
  const loadedKey = useRef(storageKey);
  useEffect(() => {
    const d = loadInitial(storageKey);
    setModules(d.modules);
    setAcknowledgements(d.acknowledgements);
    loadedKey.current = storageKey;
    // Signed in: the DATABASE is the source of truth for completions —
    // records survive any device and can back real certification.
    if (authEnabled && user && isSupabaseConfigured) {
      (async () => {
        const { data: mp } = await supabase
          .from("module_progress")
          .select("*")
          .eq("user_id", user.id);
        const { data: acks } = await supabase
          .from("acknowledgements")
          .select("*")
          .eq("user_id", user.id);
        if (mp?.length)
          setModules((prev) =>
            prev.map((m) => {
              const r = mp.find((x) => x.module_id === m.id);
              if (r && r.status === "completed" && m.status !== "completed")
                return {
                  ...m,
                  status: "completed",
                  completedOn: m.completedOn ?? (r.updated_at || "").slice(0, 10),
                  score: m.score
                    ? { ...m.score, earned: r.earned ?? m.score.earned }
                    : m.score,
                };
              return m;
            })
          );
        if (acks?.length)
          setAcknowledgements(
            acks.map((a) => ({
              id: a.doc_id,
              title: a.doc_title,
              name: a.signed_name,
              date: (a.signed_at || "").slice(0, 10),
            }))
          );
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef();
  const toastId = useRef(0);

  // Persist whenever progress or acknowledgements change — but only once the
  // state in memory actually belongs to this key (see loadedKey above).
  useEffect(() => {
    if (loadedKey.current !== storageKey) return;
    try {
      const progress = {};
      modules.forEach((m) => {
        progress[m.id] = { status: m.status, score: m.score, progress: m.progress, completedOn: m.completedOn };
      });
      localStorage.setItem(
        storageKey,
        JSON.stringify({ v: 1, progress, acknowledgements })
      );
    } catch {
      /* storage unavailable — ignore */
    }
  }, [modules, acknowledgements, storageKey]);

  function showToast(message, tone = "success") {
    toastId.current += 1;
    setToast({ id: toastId.current, message, tone });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3400);
  }

  const progress = useMemo(() => {
    const completed = modules.filter((m) => m.status === "completed").length;
    const total = modules.length;
    const earnedQuizPoints = modules.reduce(
      (sum, m) => sum + (m.score ? m.score.earned : 0),
      0
    );
    const totalQuizPoints = modules.reduce(
      (sum, m) => sum + (m.type === "quiz" && m.score ? m.score.total : 0),
      0
    );
    return {
      completed,
      total,
      percent: Math.round((completed / total) * 100),
      earnedQuizPoints,
      totalQuizPoints,
    };
  }, [modules]);

  // Marks a module complete and records a quiz score if provided.
  function completeModule(id, earned) {
    let message = "Module completed";
    // Permanent record in the database (per account, tamper-resistant).
    if (authEnabled && user && isSupabaseConfigured) {
      const m0 = modules.find((m) => m.id === id);
      const total = m0?.score?.total ?? null;
      supabase
        .from("module_progress")
        .upsert(
          {
            user_id: user.id,
            module_id: id,
            status: "completed",
            earned: earned ?? total,
            total,
          },
          { onConflict: "user_id,module_id" }
        )
        .then(() => {});
    }
    setModules((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const next = { ...m, status: "completed" };
        if (!next.completedOn)
          next.completedOn = new Date().toISOString().slice(0, 10);
        if (m.type === "quiz" || m.type === "capstone") {
          const total = m.score?.total ?? 8;
          const points = earned ?? total;
          next.score = { earned: points, total };
          delete next.progress;
          message = `${m.title} completed · +${points} pts`;
        } else {
          message = `${m.title} completed`;
        }
        return next;
      })
    );
    showToast(message);
  }

  // Records a read-and-agree acknowledgement (e-signature) for a document.
  function acknowledge({ id, title, name, date }) {
    if (authEnabled && user && isSupabaseConfigured) {
      supabase
        .from("acknowledgements")
        .upsert(
          { user_id: user.id, doc_id: id, doc_title: title, signed_name: name },
          { onConflict: "user_id,doc_id" }
        )
        .then(() => {});
    }
    setAcknowledgements((prev) => {
      if (prev.some((a) => a.id === id)) return prev; // already signed
      return [...prev, { id, title, name, date }];
    });
    showToast(`Acknowledged: ${title}`);
  }

  // Clears all progress back to the seed (handy for demos).
  function resetProgress() {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
    setModules(seedModules.map((m) => ({ ...m, accent: moduleAccents[m.id], image: moduleImages[m.id] })));
    setAcknowledgements([]);
    showToast("Progress reset");
  }

  const value = {
    modules,
    progress,
    acknowledgements,
    completeModule,
    acknowledge,
    resetProgress,
    toast,
    showToast,
  };
  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be used within CourseProvider");
  return ctx;
}

// DEV SWITCH: while the course content is being built and tested, every
// module is open. Set back to false before rollout to restore path-locking.
const UNLOCK_ALL = false;

// A module is unlocked if it's already started/finished, it's first in the
// path, or the module immediately before it in the path is completed.
export function isUnlocked(modules, module) {
  if (UNLOCK_ALL) return true;
  if (module.status === "completed" || module.status === "in_progress") return true;
  const i = modules.findIndex((m) => m.id === module.id);
  if (i <= 0) return true;
  return modules[i - 1].status === "completed";
}

// Shared status → { label, classes } mapping so badges are consistent.
export function statusMeta(module) {
  switch (module.status) {
    case "completed":
      return {
        label: module.score
          ? `Completed · ${module.score.earned}/${module.score.total}`
          : "Completed",
        pill: "bg-secondary-container text-on-secondary-container",
        icon: "check_circle",
        iconClass: "text-secondary",
      };
    case "in_progress":
      return {
        label: module.progress
          ? `In progress · ${module.progress.current} of ${module.progress.total}`
          : "In progress",
        pill: "bg-primary-container text-white",
        icon: "radio_button_checked",
        iconClass: "text-secondary",
      };
    default:
      return {
        label: "Not started",
        pill: "bg-surface-container-high text-on-surface-variant",
        icon: "lock",
        iconClass: "text-outline",
      };
  }
}
