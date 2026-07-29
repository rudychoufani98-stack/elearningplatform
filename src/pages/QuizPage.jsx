import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon.jsx";
import Logo from "../components/Logo.jsx";
import Confetti from "../components/Confetti.jsx";
import { useCourse } from "../CourseContext.jsx";
import { AnimatedNumber } from "../useCountUp.jsx";
import { quizzes, platform } from "../data.js";

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec < 10 ? "0" : ""}${sec}`;
}

const PASS_MARK = 80; // % needed to pass a quiz

// Difficulty tiers — a small, informative label on each question (no scoring).
const DIFF_META = {
  easy: { label: "Easy", cls: "bg-emerald-100 text-emerald-700", dot: "#10b981" },
  medium: { label: "Medium", cls: "bg-amber-100 text-amber-700", dot: "#f59e0b" },
  hard: { label: "Hard", cls: "bg-rose-100 text-rose-700", dot: "#f43f5e" },
};

// Difficulty: use an explicit q.difficulty when set, otherwise infer it.
// Puzzles are hard; "select all" and trick/negation prompts are medium;
// straight recall is easy.
function classifyDifficulty(q) {
  if (q.difficulty) return q.difficulty;
  if (q.type === "order" || q.type === "categorize" || q.type === "hotspot")
    return "hard";
  if (
    q.type === "multi" ||
    q.type === "fillblank" ||
    q.type === "diagramtap" ||
    q.type === "connect"
  )
    return "medium";
  const p = (q.prompt || "").toLowerCase();
  if (
    p.includes("except") ||
    p.includes("conflict") ||
    p.includes("cheaper") ||
    p.includes("safer") ||
    p.includes("differ")
  )
    return "medium";
  return "easy";
}

function shuffle(a) {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

// Prepare each question for play. Choice questions get their options shuffled
// (so the answer isn't always in the same spot); puzzles get a shuffled start.
// Every card also carries its difficulty tier (_diff), and the deck is dealt
// easy → medium → hard so the quiz warms up before it challenges.
const DIFF_RANK = { easy: 0, medium: 1, hard: 2 };
function buildDeck(questions) {
  const deck = questions.map((q) => {
    const _diff = classifyDifficulty(q);
    let out;
    if (q.type === "order") {
      // start = a scrambled arrangement of item indices (not the correct one)
      let start = shuffle(q.items.map((_, i) => i));
      let tries = 0;
      while (start.every((v, i) => v === i) && tries < 6) {
        start = shuffle(q.items.map((_, i) => i));
        tries++;
      }
      out = { ...q, start };
    } else if (q.type === "categorize") {
      out = { ...q, itemOrder: shuffle(q.items.map((_, i) => i)) };
    } else if (q.type === "connect") {
      // Right column is dealt shuffled.
      out = { ...q, rightOrder: shuffle(q.pairs.map((_, i) => i)) };
    } else if (
      q.type === "fillblank" ||
      q.type === "hotspot" ||
      q.type === "diagramtap"
    ) {
      // Interactive types keep their authored structure as-is.
      out = { ...q };
    } else if (q.options && q.options.length === 2 && q.options[0] === "True") {
      // Keep True/False questions in their natural order.
      out = { ...q };
    } else {
      const order = shuffle(q.options.map((_, i) => i));
      const options = order.map((i) => q.options[i]);
      const correct = Array.isArray(q.correct)
        ? q.correct.map((c) => order.indexOf(c))
        : order.indexOf(q.correct);
      out = { ...q, options, correct };
    }
    return { ...out, _diff };
  });
  // Stable sort: easy first, hard last — the learning curve.
  return deck.sort((a, b) => (DIFF_RANK[a._diff] ?? 0) - (DIFF_RANK[b._diff] ?? 0));
}

// Indices of the "blank" segments in a fill-in-the-blank question.
function blankSegs(q) {
  return q.segments
    .map((s, i) => (typeof s === "object" ? i : null))
    .filter((i) => i !== null);
}

// The starting answer value for each question type.
function blankAnswer(q) {
  if (q.type === "order") return [...q.start]; // item indices in current order
  if (q.type === "categorize") return {}; // itemIndex -> categoryId
  if (q.type === "fillblank") return {}; // segmentIndex -> chosen option index
  if (q.type === "connect") return {}; // leftIndex -> linked pair index
  if (q.type === "multi") return [];
  return null; // single / true-false / hotspot / diagramtap -> single index
}

// Has the learner answered?
function isAnswered(ans, q) {
  if (q.type === "order") return true; // there is always an arrangement
  if (q.type === "categorize")
    return q.items.every((_, i) => ans && ans[i] != null);
  if (q.type === "fillblank")
    return blankSegs(q).every((i) => ans && ans[i] != null);
  if (q.type === "connect")
    return q.pairs.every((_, i) => ans && ans[i] != null);
  if (q.type === "multi") return Array.isArray(ans) && ans.length > 0;
  return ans !== null && ans !== undefined;
}

// Is the answer correct?
function isRight(ans, q) {
  if (q.type === "order")
    return Array.isArray(ans) && ans.every((v, i) => v === i);
  if (q.type === "categorize")
    return q.items.every((it, i) => ans && ans[i] === it.cat);
  if (q.type === "fillblank")
    return blankSegs(q).every((i) => ans && ans[i] === q.segments[i].correct);
  if (q.type === "connect")
    return q.pairs.every((_, i) => ans && ans[i] === i);
  if (q.type === "hotspot")
    return ans != null && !!q.zones[ans]?.correct;
  if (q.type === "multi") {
    if (!Array.isArray(ans)) return false;
    return [...ans].sort().join(",") === [...q.correct].sort().join(",");
  }
  return ans === q.correct;
}

// Human-readable answer text for the results review.
function answerText(val, q) {
  if (q.type === "order") {
    if (!Array.isArray(val)) return "—";
    return val.map((i) => q.items[i]).join(" → ");
  }
  if (q.type === "categorize") return "see the puzzle";
  if (q.type === "fillblank") {
    if (!val) return "—";
    return blankSegs(q)
      .map((i) => (val[i] != null ? q.segments[i].options[val[i]] : "—"))
      .join(" · ");
  }
  if (q.type === "hotspot")
    return val != null ? q.zones[val]?.label ?? "a spot" : "—";
  if (q.type === "diagramtap")
    return val != null ? q.boxes[val] : "—";
  if (q.type === "connect") return "see the pairs";
  if (q.type === "multi") {
    if (!Array.isArray(val) || val.length === 0) return "—";
    return val.map((i) => q.options[i]).join("; ");
  }
  return val !== null && val !== undefined ? q.options[val] : "—";
}

// The "correct answer" text for the review.
function correctText(q) {
  if (q.type === "order") return q.items.join(" → ");
  if (q.type === "categorize")
    return q.items.map((it) => `${it.text} → ${catLabel(q, it.cat)}`).join("; ");
  if (q.type === "fillblank")
    return blankSegs(q)
      .map((i) => q.segments[i].options[q.segments[i].correct])
      .join(" · ");
  if (q.type === "hotspot")
    return (q.zones.find((z) => z.correct) || {}).label ?? "the correct spot";
  if (q.type === "diagramtap") return q.boxes[q.correct];
  if (q.type === "connect")
    return q.pairs.map((p) => `${p.l} → ${p.r}`).join("; ");
  if (q.type === "multi") return q.correct.map((i) => q.options[i]).join("; ");
  return q.options[q.correct];
}

function catLabel(q, id) {
  return (q.categories.find((c) => c.id === id) || {}).label || id;
}

export default function QuizPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { modules, completeModule } = useCourse();

  // The module this assessment belongs to: the URL's module, else the module
  // currently in progress, else the next unfinished quiz module.
  const target =
    (moduleId && modules.find((m) => m.id === moduleId && m.type === "quiz")) ||
    modules.find((m) => m.status === "in_progress" && m.type === "quiz") ||
    modules.find((m) => m.status !== "completed" && m.type === "quiz");

  const activeQuiz = target ? quizzes[target.id] : null;
  const questions = activeQuiz?.questions ?? [];

  const [index, setIndex] = useState(0);
  const [deck, setDeck] = useState(() => buildDeck(questions));
  const [answers, setAnswers] = useState(() => deck.map(blankAnswer));
  const [selChip, setSelChip] = useState(null); // categorize: selected item index
  const [selLeft, setSelLeft] = useState(null); // connect: selected left item
  const [showHint, setShowHint] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [phase, setPhase] = useState("intro"); // "intro" | "quiz" | "results"
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [confirmExit, setConfirmExit] = useState(null); // route to leave to, or null

  useEffect(() => {
    if (timeLeft <= 0 || phase !== "quiz") return;
    const t = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [timeLeft, phase]);

  // No quiz available (e.g. a read-only module or bad URL).
  if (!target || questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-6 text-center">
        <MaterialIcon name="quiz" className="text-5xl text-outline" />
        <p className="text-body-lg text-on-surface-variant">
          No assessment is available for this module.
        </p>
        <Link
          to="/course"
          className="bg-primary px-6 py-3 text-label-md text-on-primary"
        >
          Back to the course
        </Link>
      </div>
    );
  }

  const question = deck[index];
  const total = deck.length;
  const selected = answers[index];
  const percent = Math.round(((index + 1) / total) * 100);
  const isLast = index === total - 1;
  const isCorrect = isRight(selected, question);
  const answered = isAnswered(selected, question);
  const isMulti = question.type === "multi";

  const correctCount = deck.reduce(
    (n, q, i) => n + (isRight(answers[i], q) ? 1 : 0),
    0
  );

  function choose(i) {
    if (revealed) return;
    setAnswers((prev) => {
      const copy = [...prev];
      if (isMulti) {
        const cur = Array.isArray(copy[index]) ? copy[index] : [];
        copy[index] = cur.includes(i)
          ? cur.filter((x) => x !== i)
          : [...cur, i];
      } else {
        copy[index] = i;
      }
      return copy;
    });
  }

  // Ordering puzzle: move an item up (-1) or down (+1).
  function moveOrderItem(pos, dir) {
    if (revealed) return;
    const t = pos + dir;
    setAnswers((prev) => {
      const copy = [...prev];
      const arr = [...copy[index]];
      if (t < 0 || t >= arr.length) return prev;
      [arr[pos], arr[t]] = [arr[t], arr[pos]];
      copy[index] = arr;
      return copy;
    });
  }

  // Categorize puzzle: place the selected chip into a category (or back to pool).
  function placeChip(catId) {
    if (revealed || selChip == null) return;
    setAnswers((prev) => {
      const copy = [...prev];
      const m = { ...copy[index] };
      if (catId == null) delete m[selChip];
      else m[selChip] = catId;
      copy[index] = m;
      return copy;
    });
    setSelChip(null);
  }

  // Categorize puzzle: click a placed chip to send it back to the pool.
  function returnChip(i) {
    if (revealed) return;
    setAnswers((prev) => {
      const copy = [...prev];
      const m = { ...copy[index] };
      delete m[i];
      copy[index] = m;
      return copy;
    });
  }

  // Connect: link the selected left item to a right item (pair index).
  function linkPair(rightPairIdx) {
    if (revealed || selLeft == null) return;
    setAnswers((prev) => {
      const copy = [...prev];
      const m = { ...(copy[index] || {}) };
      // a right item can only be linked once — steal it if already used
      for (const k of Object.keys(m)) if (m[k] === rightPairIdx) delete m[k];
      m[selLeft] = rightPairIdx;
      copy[index] = m;
      return copy;
    });
    setSelLeft(null);
  }

  // Fill-in-the-blank: pick an option for a given blank (segment index).
  function setBlank(segIdx, optIdx) {
    if (revealed) return;
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = { ...(copy[index] || {}), [segIdx]: optIdx };
      return copy;
    });
  }

  // Hotspot: click a zone on the image.
  function clickZone(zoneIdx) {
    if (revealed) return;
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = zoneIdx;
      return copy;
    });
  }

  function primaryAction() {
    if (!revealed) {
      setRevealed(true);
      return;
    }
    setSelChip(null);
    setSelLeft(null);
    setShowHint(false);
    if (!isLast) {
      setIndex((i) => i + 1);
      setRevealed(false);
      return;
    }
    finish();
  }

  function finish() {
    const pct = Math.round((correctCount / total) * 100);
    // Must score at least 80% to pass — only then is the module completed.
    if (target && pct >= PASS_MARK) {
      const max = target.score?.total ?? 8;
      const earned = Math.round((correctCount / total) * max);
      completeModule(target.id, earned);
    }
    setPhase("results");
  }

  function retake() {
    const fresh = buildDeck(questions);
    setDeck(fresh);
    setAnswers(fresh.map(blankAnswer));
    setSelChip(null);
    setIndex(0);
    setRevealed(false);
    setPhase("quiz");
    setTimeLeft(15 * 60);
  }

  const scorePct = Math.round((correctCount / total) * 100);
  const passed = scorePct >= PASS_MARK;

  return (
    <div className="min-h-screen bg-surface">
      {/* Focused top bar */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-margin-mobile shadow-sm md:px-margin-desktop">
        <div className="flex items-center gap-stack-md">
          <button
            onClick={() =>
              phase === "results" ? navigate("/") : setConfirmExit("/")
            }
            title="Back to the dashboard"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <Logo className="h-8 w-8 text-primary-container" />
            <span className="text-headline-md font-bold text-primary">
              {platform.brand}
            </span>
          </button>
          <div className="mx-unit hidden h-6 w-px bg-outline-variant md:block" />
          <span className="hidden text-label-md uppercase tracking-wider text-on-surface-variant md:block">
            Final Assessment
          </span>
        </div>
        <div className="flex items-center gap-stack-md">
          {phase === "quiz" && (
            <div className="mr-4 hidden flex-col items-end sm:flex">
              <span className="text-caption text-on-surface-variant">Time Remaining</span>
              <span
                className={`text-headline-md font-bold tabular-nums ${
                  timeLeft <= 0 ? "text-error" : "text-primary"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
          <button
            onClick={() =>
              phase === "results" ? navigate("/course") : setConfirmExit("/course")
            }
            className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low"
            title="Exit assessment"
          >
            <MaterialIcon name="close" />
          </button>
        </div>
      </nav>

      {confirmExit && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0d1c32]/60 px-6 backdrop-blur-sm"
          onClick={() => setConfirmExit(null)}
        >
          <div
            className="animate-pop w-full max-w-sm rounded-2xl bg-white p-stack-lg text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
              <MaterialIcon name="logout" className="text-3xl text-amber-500" />
            </div>
            <h2 className="text-headline-md text-primary">Leave the quiz?</h2>
            <p className="mx-auto mt-1 max-w-xs text-body-md text-on-surface-variant">
              Your answers in this attempt will not be saved — you can retake
              the quiz anytime.
            </p>
            <div className="mt-stack-md flex gap-2">
              <button
                onClick={() => setConfirmExit(null)}
                className="flex-1 rounded-lg bg-primary py-3 text-label-md font-bold text-on-primary transition-opacity hover:opacity-90"
              >
                Keep going
              </button>
              <button
                onClick={() => navigate(confirmExit)}
                className="flex-1 rounded-lg border border-outline-variant py-3 text-label-md text-on-surface-variant transition-colors hover:border-rose-300 hover:text-rose-600"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex min-h-screen flex-col items-center px-margin-mobile pb-margin-desktop pt-32 md:px-margin-desktop">
        {phase === "intro" ? (
          <div className="animate-pop w-full max-w-[560px] rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg text-center shadow-xl md:p-12">
            <span
              className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl text-white"
              style={{ background: target.accent ?? "#0d1c32" }}
            >
              <MaterialIcon name={target.icon} className="text-3xl" />
            </span>
            <p className="text-caption font-bold uppercase tracking-widest text-secondary">
              {target.code} · Quiz
            </p>
            <h1 className="mt-1 text-headline-md text-primary">{target.title}</h1>
            <div className="mx-auto mt-stack-md grid max-w-sm grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-surface-container-low py-3">
                <p className="text-headline-md font-bold text-primary">{total}</p>
                <p className="text-caption text-on-surface-variant">questions</p>
              </div>
              <div className="rounded-lg bg-surface-container-low py-3">
                <p className="text-headline-md font-bold text-primary">80%</p>
                <p className="text-caption text-on-surface-variant">to pass</p>
              </div>
              <div className="rounded-lg bg-surface-container-low py-3">
                <p className="text-headline-md font-bold text-primary">15</p>
                <p className="text-caption text-on-surface-variant">minutes</p>
              </div>
            </div>
            <ul className="mx-auto mt-stack-md max-w-sm space-y-1.5 text-left">
              <li className="flex items-center gap-2 text-caption text-on-surface-variant"><MaterialIcon name="extension" className="text-[16px] text-secondary" /> A mix of games: puzzles, diagrams, photos and cards</li>
              <li className="flex items-center gap-2 text-caption text-on-surface-variant"><MaterialIcon name="lightbulb" className="text-[16px] text-secondary" /> Hints available on the tricky ones</li>
              <li className="flex items-center gap-2 text-caption text-on-surface-variant"><MaterialIcon name="refresh" className="text-[16px] text-secondary" /> Not 80%? You can retake it as many times as you like</li>
            </ul>
            <button
              onClick={() => { setPhase("quiz"); setTimeLeft(15 * 60); }}
              className="mt-stack-lg inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-container to-[#1c3a63] py-3.5 text-label-md font-bold text-white transition-all hover:brightness-110 active:scale-[0.98] sm:w-auto sm:px-14"
            >
              I'm ready — start <MaterialIcon name="arrow_forward" />
            </button>
          </div>
        ) : phase === "results" ? (
          <ResultsCard
            correct={correctCount}
            total={total}
            scorePct={scorePct}
            passed={passed}
            questions={deck}
            answers={answers}
            nextModule={modules[modules.findIndex((m) => m.id === target.id) + 1]}
            onNext={(m) => navigate(m.type === "capstone" ? "/capstone" : `/module/${m.id}`)}
            onReview={() => navigate("/course")}
            onRetake={retake}
          />
        ) : (
          <div className="w-full max-w-[800px]">
            {/* Header + progress */}
            <div className="mb-stack-lg">
              <div className="mb-stack-sm flex items-end justify-between">
                <div>
                  <h1 className="mb-1 text-headline-lg text-primary">
                    {target.code} · {target.title}
                  </h1>
                  <p className="text-body-md text-on-surface-variant">
                    Question {index + 1} of {total} · ESG Assessment
                  </p>
                </div>
                <span className="text-label-md font-bold text-secondary">
                  {percent}% COMPLETE
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-highest">
                <div
                  className="h-full bg-secondary transition-all duration-500 ease-out"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {/* Question card */}
            <div className="ambient-shadow relative overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest p-stack-lg md:p-12">
              <div className="mb-stack-lg">
                <div className="mb-stack-md flex flex-wrap items-center gap-2">
                  <span className="inline-block rounded-sm bg-primary px-3 py-1 text-label-md uppercase tracking-widest text-on-primary">
                    {question.tag}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-caption font-bold uppercase tracking-wide ${
                      DIFF_META[question._diff]?.cls
                    }`}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: DIFF_META[question._diff]?.dot }}
                    />
                    {DIFF_META[question._diff]?.label}
                  </span>
                </div>
                <h2 className="text-headline-md leading-snug text-primary">
                  {question.prompt}
                </h2>
                {isMulti && (
                  <p className="mt-2 text-caption font-semibold text-secondary">
                    Select all that apply
                  </p>
                )}
                {question.type === "order" && (
                  <p className="mt-2 text-caption font-semibold text-secondary">
                    Use the arrows to put these in the correct order
                  </p>
                )}
                {question.type === "categorize" && (
                  <p className="mt-2 text-caption font-semibold text-secondary">
                    Tap an item, then tap the group it belongs to
                  </p>
                )}
                {question.type === "fillblank" && (
                  <p className="mt-2 text-caption font-semibold text-secondary">
                    Tap each blank, then choose the word that fits
                  </p>
                )}
                {question.type === "hotspot" && (
                  <p className="mt-2 text-caption font-semibold text-secondary">
                    Tap the right spot on the image
                  </p>
                )}
                {question.type === "diagramtap" && (
                  <p className="mt-2 text-caption font-semibold text-secondary">
                    Tap the right box on the diagram
                  </p>
                )}
                {question.type === "connect" && (
                  <p className="mt-2 text-caption font-semibold text-secondary">
                    Tap an item on the left, then tap its match on the right
                  </p>
                )}
              </div>

              {question.hint && !revealed && (
                <div className="mb-stack-md">
                  {!showHint ? (
                    <button
                      onClick={() => setShowHint(true)}
                      className="flex items-center gap-1 text-label-md font-semibold text-secondary hover:underline"
                    >
                      <MaterialIcon name="lightbulb" className="text-[18px]" /> Need a hint?
                    </button>
                  ) : (
                    <div className="animate-fade-up flex items-start gap-2 rounded-lg bg-amber-50 p-stack-md text-amber-900">
                      <MaterialIcon name="lightbulb" fill className="text-amber-500" />
                      <p className="text-caption">{question.hint}</p>
                    </div>
                  )}
                </div>
              )}

              {question.image && question.type !== "hotspot" && (
                <div className="mb-stack-md h-52 w-full overflow-hidden rounded-lg border border-outline-variant bg-surface-container">
                  <img
                    src={question.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {question.type === "order" ? (
                <div className="space-y-2">
                  {selected.map((itemIdx, pos) => {
                    const posCorrect = itemIdx === pos;
                    return (
                      <div
                        key={itemIdx}
                        className={`flex items-center gap-3 rounded-lg border p-stack-md ${
                          revealed
                            ? posCorrect
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-rose-400 bg-rose-50"
                            : "border-outline-variant bg-white"
                        }`}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-label-md font-bold text-on-primary">
                          {pos + 1}
                        </span>
                        <span className="flex-1 text-body-md text-on-surface">
                          {question.items[itemIdx]}
                        </span>
                        {revealed ? (
                          <MaterialIcon
                            name={posCorrect ? "check_circle" : "cancel"}
                            fill
                            className={posCorrect ? "text-emerald-600" : "text-rose-500"}
                          />
                        ) : (
                          <span className="flex flex-col">
                            <button
                              disabled={pos === 0}
                              onClick={() => moveOrderItem(pos, -1)}
                              className="text-on-surface-variant hover:text-primary disabled:opacity-30"
                              aria-label="Move up"
                            >
                              <MaterialIcon name="keyboard_arrow_up" />
                            </button>
                            <button
                              disabled={pos === selected.length - 1}
                              onClick={() => moveOrderItem(pos, 1)}
                              className="text-on-surface-variant hover:text-primary disabled:opacity-30"
                              aria-label="Move down"
                            >
                              <MaterialIcon name="keyboard_arrow_down" />
                            </button>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : question.type === "categorize" ? (
                <div>
                  <div className="mb-stack-md flex min-h-[52px] flex-wrap gap-2 rounded-lg border border-dashed border-outline-variant bg-surface-container-low p-3">
                    {question.itemOrder.filter((i) => selected[i] == null).length === 0 && (
                      <span className="text-caption text-outline">All items placed.</span>
                    )}
                    {question.itemOrder
                      .filter((i) => selected[i] == null)
                      .map((i) => (
                        <button
                          key={i}
                          disabled={revealed}
                          onClick={() => setSelChip(selChip === i ? null : i)}
                          className={`rounded-lg border px-3 py-1.5 text-body-md ${
                            selChip === i
                              ? "border-secondary bg-[#fcf9ee]"
                              : "border-outline-variant bg-white hover:border-secondary"
                          }`}
                        >
                          {question.items[i].text}
                        </button>
                      ))}
                  </div>
                  <div className="grid grid-cols-1 gap-stack-md sm:grid-cols-2">
                    {question.categories.map((cat) => (
                      <div
                        key={cat.id}
                        onClick={() => selChip != null && placeChip(cat.id)}
                        className={`rounded-lg border p-3 ${
                          selChip != null && !revealed
                            ? "cursor-pointer border-secondary"
                            : "border-outline-variant"
                        }`}
                      >
                        <p className="mb-2 text-label-md font-bold text-primary">
                          {cat.label}
                        </p>
                        <div className="flex min-h-[40px] flex-wrap gap-2">
                          {question.items.map((it, i) =>
                            selected[i] === cat.id ? (
                              <button
                                key={i}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  returnChip(i);
                                }}
                                disabled={revealed}
                                className={`flex items-center gap-1 rounded-lg border px-3 py-1.5 text-body-md ${
                                  revealed
                                    ? it.cat === cat.id
                                      ? "border-emerald-500 bg-emerald-50"
                                      : "border-rose-400 bg-rose-50"
                                    : "border-outline-variant bg-surface-container-low"
                                }`}
                              >
                                {it.text}
                                {revealed && (
                                  <MaterialIcon
                                    name={it.cat === cat.id ? "check" : "close"}
                                    className={`text-[14px] ${
                                      it.cat === cat.id ? "text-emerald-600" : "text-rose-500"
                                    }`}
                                  />
                                )}
                              </button>
                            ) : null
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : question.type === "fillblank" ? (
                <div>
                  {/* The sentence with tappable blanks */}
                  <div className="flex flex-wrap items-center gap-x-1 gap-y-2 rounded-lg border border-outline-variant bg-white p-stack-md text-body-lg leading-loose text-on-surface">
                    {question.segments.map((seg, si) => {
                      if (typeof seg === "string")
                        return <span key={si}>{seg}</span>;
                      const chosen = selected?.[si];
                      const ok = chosen === seg.correct;
                      return (
                        <span
                          key={si}
                          className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-body-md font-semibold ${
                            revealed
                              ? ok
                                ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                                : "border-rose-400 bg-rose-50 text-rose-800"
                              : chosen != null
                              ? "border-secondary bg-[#fcf9ee] text-primary"
                              : "border-dashed border-outline-variant bg-surface-container-low text-on-surface-variant"
                          }`}
                        >
                          {chosen != null ? seg.options[chosen] : "——"}
                          {revealed && (
                            <MaterialIcon
                              name={ok ? "check" : "close"}
                              className={`text-[16px] ${ok ? "text-emerald-600" : "text-rose-500"}`}
                            />
                          )}
                        </span>
                      );
                    })}
                  </div>
                  {/* Word choices for each blank */}
                  {!revealed && (
                    <div className="mt-stack-md space-y-stack-md">
                      {blankSegs(question).map((si, bi) => (
                        <div key={si}>
                          <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-on-surface-variant">
                            Blank {bi + 1}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {question.segments[si].options.map((opt, oi) => {
                              const active = selected?.[si] === oi;
                              return (
                                <button
                                  key={oi}
                                  onClick={() => setBlank(si, oi)}
                                  className={`rounded-lg border px-3 py-1.5 text-body-md transition-colors ${
                                    active
                                      ? "border-secondary bg-[#fcf9ee] text-primary"
                                      : "border-outline-variant bg-white hover:border-secondary"
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : question.type === "hotspot" ? (
                <div>
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-outline-variant bg-surface-container">
                    <img
                      src={question.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    {question.zones.map((z, zi) => {
                      const active = selected === zi;
                      let ring = "border-white bg-white/25 hover:bg-white/40";
                      if (active && !revealed)
                        ring = "border-secondary bg-secondary/50";
                      if (revealed)
                        ring = z.correct
                          ? "border-emerald-400 bg-emerald-400/50"
                          : active
                          ? "border-rose-400 bg-rose-400/50"
                          : "border-white/50 bg-white/10";
                      return (
                        <button
                          key={zi}
                          disabled={revealed}
                          onClick={() => clickZone(zi)}
                          title={revealed ? z.label : undefined}
                          className={`absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-md backdrop-blur-sm transition-all ${ring}`}
                          style={{ left: `${z.x}%`, top: `${z.y}%` }}
                        >
                          {revealed && (z.correct || active) && (
                            <MaterialIcon
                              name={z.correct ? "check" : "close"}
                              fill
                              className={`text-[20px] ${z.correct ? "text-emerald-800" : "text-rose-700"}`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {revealed && selected != null && (
                    <p className="mt-2 text-caption text-on-surface-variant">
                      You tapped: <strong>{question.zones[selected]?.label}</strong>
                    </p>
                  )}
                </div>
              ) : question.type === "connect" ? (
                /* Link each item (left) to its description (right) */
                (() => {
                  const COLORS = ["#0ea5e9", "#f59e0b", "#10b981", "#8b5cf6", "#f43f5e"];
                  const linkedLeftOf = (r) =>
                    Object.keys(selected || {}).find((k) => selected[k] === r);
                  return (
                    <div className="grid grid-cols-2 gap-stack-md">
                      <div className="space-y-2">
                        {question.pairs.map((p, i) => {
                          const linked = selected?.[i] != null;
                          const ok = selected?.[i] === i;
                          let cls = "border-outline-variant bg-white hover:border-secondary";
                          if (selLeft === i && !revealed) cls = "border-secondary bg-[#fcf9ee]";
                          if (revealed) cls = ok ? "border-emerald-500 bg-emerald-50" : "border-rose-400 bg-rose-50";
                          return (
                            <button
                              key={i}
                              disabled={revealed}
                              onClick={() => setSelLeft(selLeft === i ? null : i)}
                              className={`flex w-full items-center gap-2 rounded-lg border-2 px-3 py-3 text-left text-body-md font-semibold text-on-surface transition-all disabled:cursor-default ${cls}`}
                            >
                              <span
                                className="h-3 w-3 shrink-0 rounded-full border"
                                style={{ background: linked ? COLORS[i % COLORS.length] : "transparent", borderColor: COLORS[i % COLORS.length] }}
                              />
                              {p.l}
                            </button>
                          );
                        })}
                      </div>
                      <div className="space-y-2">
                        {question.rightOrder.map((r) => {
                          const leftK = linkedLeftOf(r);
                          const linked = leftK != null;
                          const ok = linked && Number(leftK) === r;
                          let cls = "border-outline-variant bg-surface-container-low";
                          if (selLeft != null && !revealed) cls = "cursor-pointer border-secondary bg-white";
                          if (revealed && linked) cls = ok ? "border-emerald-500 bg-emerald-50" : "border-rose-400 bg-rose-50";
                          return (
                            <button
                              key={r}
                              disabled={revealed || selLeft == null}
                              onClick={() => linkPair(r)}
                              className={`flex w-full items-center gap-2 rounded-lg border-2 px-3 py-3 text-left text-body-md text-on-surface transition-all disabled:cursor-default ${cls}`}
                            >
                              <span
                                className="h-3 w-3 shrink-0 rounded-full border"
                                style={linked ? { background: COLORS[Number(leftK) % COLORS.length], borderColor: COLORS[Number(leftK) % COLORS.length] } : { borderColor: "#c5c6cd" }}
                              />
                              {question.pairs[r].r}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()
              ) : question.type === "diagramtap" ? (
                /* Tap the right part of a drawn scheme */
                <div className="flex flex-col items-stretch gap-1 rounded-xl border border-outline-variant bg-surface-container-low p-stack-md sm:flex-row sm:items-center sm:gap-0">
                  {question.boxes.map((box, i) => {
                    const active = selected === i;
                    const isCorrectBox = question.correct === i;
                    let cls =
                      "border-outline-variant bg-white hover:border-secondary hover:shadow-md";
                    if (!revealed && active)
                      cls = "border-secondary bg-[#fcf9ee] shadow-md";
                    if (revealed) {
                      if (isCorrectBox) cls = "border-emerald-500 bg-emerald-50";
                      else if (active) cls = "border-rose-400 bg-rose-50";
                      else cls = "border-outline-variant bg-white opacity-60";
                    }
                    return (
                      <div key={i} className="flex flex-1 flex-col items-center sm:flex-row">
                        {i > 0 && (
                          <MaterialIcon
                            name="arrow_downward"
                            className="my-0.5 shrink-0 text-outline sm:my-0 sm:mx-1 sm:rotate-[-90deg]"
                          />
                        )}
                        <button
                          onClick={() => choose(i)}
                          disabled={revealed}
                          className={`w-full flex-1 rounded-lg border-2 px-3 py-4 text-center text-body-md font-semibold text-on-surface transition-all active:scale-95 disabled:cursor-default ${cls}`}
                        >
                          {box}
                          {revealed && isCorrectBox && (
                            <MaterialIcon name="check_circle" fill className="ml-1 align-middle text-[18px] text-emerald-600" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : question.options?.length === 2 && question.options[0] === "True" ? (
                /* True/False rendered as a myth-or-fact card */
                <div
                  className={`rounded-xl border-2 p-stack-lg text-center transition-colors ${
                    revealed
                      ? isCorrect
                        ? "border-emerald-400 bg-emerald-50"
                        : "border-rose-300 bg-rose-50"
                      : "border-outline-variant bg-surface-container-lowest"
                  }`}
                >
                  <p className="mx-auto max-w-md text-body-lg font-semibold leading-snug text-on-surface">
                    “{question.prompt.replace(/^True or false:\s*/i, "").trim()}”
                  </p>
                  <div className="mt-stack-md flex justify-center gap-stack-md">
                    {[1, 0].map((i) => {
                      const isFact = i === 0; // options[0] === "True"
                      const active = selected === i;
                      let cls = isFact
                        ? "border-emerald-400 text-emerald-700 hover:bg-emerald-50"
                        : "border-rose-300 text-rose-600 hover:bg-rose-50";
                      if (revealed) {
                        if (question.correct === i)
                          cls = "border-emerald-500 bg-emerald-100 text-emerald-800";
                        else if (active)
                          cls = "border-rose-400 bg-rose-100 text-rose-700";
                        else cls = "border-outline-variant text-outline opacity-60";
                      } else if (active) {
                        cls = isFact
                          ? "border-emerald-500 bg-emerald-100 text-emerald-800"
                          : "border-rose-400 bg-rose-100 text-rose-700";
                      }
                      return (
                        <button
                          key={i}
                          onClick={() => choose(i)}
                          disabled={revealed}
                          className={`flex items-center gap-2 rounded-xl border-2 bg-white px-8 py-3 text-label-md font-bold transition-all active:scale-95 disabled:cursor-default ${cls}`}
                        >
                          <MaterialIcon name={isFact ? "check" : "close"} />
                          {isFact ? "Fact" : "Myth"}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
              <div className="space-y-stack-md">
                {question.options.map((opt, i) => {
                  const active = isMulti
                    ? Array.isArray(selected) && selected.includes(i)
                    : selected === i;
                  const isCorrectOpt = isMulti
                    ? question.correct.includes(i)
                    : question.correct === i;
                  let cls =
                    "border-outline-variant bg-surface-container-lowest hover:border-secondary";
                  let mark = null;
                  if (!revealed && active) {
                    cls = "border-secondary bg-[#fcf9ee]";
                  }
                  if (revealed) {
                    if (isCorrectOpt) {
                      cls = "border-emerald-500 bg-emerald-50";
                      mark = (
                        <MaterialIcon
                          name="check_circle"
                          fill
                          className="ml-auto text-emerald-600"
                        />
                      );
                    } else if (active) {
                      cls = "border-rose-400 bg-rose-50";
                      mark = (
                        <MaterialIcon name="cancel" fill className="ml-auto text-rose-500" />
                      );
                    } else {
                      cls = "border-outline-variant opacity-60";
                    }
                  }
                  return (
                    <button
                      key={opt}
                      onClick={() => choose(i)}
                      disabled={revealed}
                      className={`flex w-full items-center rounded-lg border p-stack-md text-left transition-all ${cls} disabled:cursor-default`}
                    >
                      <span
                        className={`mr-4 flex h-6 w-6 shrink-0 items-center justify-center border-2 transition-colors ${
                          isMulti ? "rounded-md" : "rounded-full"
                        } ${active ? "border-secondary" : "border-outline-variant"}`}
                      >
                        {isMulti ? (
                          active && (
                            <MaterialIcon name="check" className="text-[16px] text-secondary" />
                          )
                        ) : (
                          <span
                            className={`h-2.5 w-2.5 rounded-full bg-secondary transition-transform ${
                              active ? "scale-100" : "scale-0"
                            }`}
                          />
                        )}
                      </span>
                      <span className="text-body-md text-on-surface">{opt}</span>
                      {mark}
                    </button>
                  );
                })}
              </div>
              )}

              {/* Explanation after reveal */}
              {revealed && (
                <div
                  className={`animate-fade-up mt-stack-md flex items-start gap-3 rounded-lg p-stack-md ${
                    isCorrect
                      ? "bg-emerald-50 text-emerald-900"
                      : "bg-rose-50 text-rose-900"
                  }`}
                >
                  <MaterialIcon
                    name={isCorrect ? "verified" : "info"}
                    fill
                    className={isCorrect ? "text-emerald-600" : "text-rose-500"}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-label-md">
                      {isCorrect ? "Correct!" : "Not quite."}
                    </p>
                    <p className="text-caption">{question.tip}</p>
                  </div>
                </div>
              )}

              {/* Footer actions */}
              <div className="mt-stack-lg flex flex-col items-center justify-between gap-stack-md border-t border-outline-variant pt-stack-lg md:flex-row">
                <button
                  disabled={index === 0 || revealed}
                  onClick={() => {
                    setIndex((i) => Math.max(0, i - 1));
                    setRevealed(false);
                    setShowHint(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 border border-primary px-margin-mobile py-3 text-label-md text-primary transition-colors hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-40 md:w-auto"
                >
                  <MaterialIcon name="arrow_back" /> Previous
                </button>
                <button
                  disabled={!answered}
                  onClick={primaryAction}
                  className="flex w-full items-center justify-center gap-2 bg-primary px-12 py-3 text-label-md text-on-primary transition-transform hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 md:w-auto"
                >
                  {!revealed
                    ? "Check answer"
                    : isLast
                    ? "See results"
                    : "Next question"}
                  <MaterialIcon name="arrow_forward" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Animated results / score screen.
function ResultsCard({
  correct,
  total,
  scorePct,
  passed,
  questions = [],
  answers = [],
  nextModule,
  onNext,
  onReview,
  onRetake,
}) {
  const [mounted, setMounted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const r = 58;
  const circumference = 2 * Math.PI * r;
  const dashoffset = mounted ? circumference * (1 - scorePct / 100) : circumference;
  const ringColor = passed ? "#10b981" : "#f59e0b";

  return (
    <div className="animate-pop relative w-full max-w-[560px] overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg text-center shadow-xl md:p-12">
      {passed && <Confetti />}
      <span
        className="mb-stack-md inline-block rounded-full px-4 py-1 text-label-md uppercase tracking-widest text-white"
        style={{ background: ringColor }}
      >
        {passed ? "Assessment passed" : `Not passed · ${PASS_MARK}% needed`}
      </span>

      <div className="relative mx-auto mb-stack-md h-40 w-40">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r={r}
            fill="transparent"
            stroke="#e0e3e5"
            strokeWidth="10"
          />
          <circle
            cx="64"
            cy="64"
            r={r}
            fill="transparent"
            stroke={ringColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            style={{ transition: "stroke-dashoffset 1.1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatedNumber
            value={scorePct}
            suffix="%"
            className="text-headline-lg font-bold text-primary"
          />
          <span className="text-caption text-on-surface-variant">
            {correct}/{total} correct
          </span>
        </div>
      </div>

      <h1 className="mb-2 text-headline-md text-primary">
        {passed ? "Great work!" : "Not passed yet"}
      </h1>
      <p className="mx-auto mb-stack-md max-w-sm text-body-md text-on-surface-variant">
        {passed
          ? "Passed — your result is logged to the training-evidence register. Review your answers, or head back to the course."
          : `You scored ${scorePct}%, but you need ${PASS_MARK}% to pass. This module is not complete yet — review your answers and restart the test to pass.`}
      </p>

      {/* Answer review */}
      <button
        onClick={() => setShowReview((s) => !s)}
        className="mx-auto mb-stack-md flex items-center gap-1 text-label-md font-bold text-secondary hover:underline"
      >
        {showReview ? "Hide" : "Review"} answers
        <MaterialIcon
          name={showReview ? "expand_less" : "expand_more"}
          className="text-[18px]"
        />
      </button>
      {showReview && (
        <div className="mb-stack-lg space-y-2 text-left">
          {questions.map((q, i) => {
            const ok = isRight(answers[i], q);
            return (
              <div
                key={i}
                className={`rounded-lg border p-stack-md ${
                  ok ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
                }`}
              >
                <div className="flex items-start gap-2">
                  <MaterialIcon
                    name={ok ? "check_circle" : "cancel"}
                    fill
                    className={ok ? "text-emerald-600" : "text-rose-500"}
                  />
                  <div className="min-w-0">
                    <p className="text-label-md text-primary">
                      {i + 1}. {q.prompt}
                    </p>
                    {!ok && (
                      <p className="mt-1 text-caption text-rose-700">
                        Your answer: {answerText(answers[i], q)}
                      </p>
                    )}
                    <p className="mt-1 text-caption text-emerald-800">
                      Correct: {correctText(q)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-col justify-center gap-stack-md sm:flex-row">
        {passed ? (
          <>
            {nextModule && (
              <button
                onClick={() => onNext(nextModule)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary-container to-[#1c3a63] px-8 py-3 text-label-md font-bold text-white transition-all hover:brightness-110 active:scale-95"
              >
                <MaterialIcon name="lock_open" /> Start {nextModule.code}: {nextModule.title.length > 22 ? nextModule.title.slice(0, 22) + "…" : nextModule.title}
              </button>
            )}
            <button
              onClick={onReview}
              className="flex items-center justify-center gap-2 border border-primary px-8 py-3 text-label-md text-primary transition-colors hover:bg-surface-container-low"
            >
              <MaterialIcon name="menu_book" /> Back to course
            </button>
            <button
              onClick={onRetake}
              className="flex items-center justify-center gap-2 border border-primary px-8 py-3 text-label-md text-primary transition-colors hover:bg-surface-container-low"
            >
              <MaterialIcon name="refresh" /> Retake
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onRetake}
              className="flex items-center justify-center gap-2 bg-primary px-8 py-3 text-label-md text-on-primary transition-transform hover:opacity-90 active:scale-95"
            >
              <MaterialIcon name="refresh" /> Restart the test
            </button>
            <button
              onClick={onReview}
              className="flex items-center justify-center gap-2 border border-primary px-8 py-3 text-label-md text-primary transition-colors hover:bg-surface-container-low"
            >
              Exit without passing
            </button>
          </>
        )}
      </div>
    </div>
  );
}
