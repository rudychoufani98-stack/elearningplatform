import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon.jsx";
import Logo from "../components/Logo.jsx";
import { supabase, isSupabaseConfigured, adminCreateAccount } from "../lib/supabase.js";
import { useAuth } from "../AuthContext.jsx";
import { client } from "../config/clients.js";
import { course } from "../data.js";
import { downloadCertificatePdf } from "../lib/certificate.js";

const DOC_CATEGORIES = ["Governance & Ethics", "HSE", "People & Community", "Management System", "Other"];

// Documents live in a PRIVATE bucket — access is via short-lived signed links.
async function openDoc(path) {
  const { data, error } = await supabase.storage.from("client-docs").createSignedUrl(path, 3600);
  if (!error && data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener");
}

// The Skykapital administration console — organised PER PROJECT.
// Home = project cards. Open a project = manage ITS users and ITS documents.
export default function AdminPage({ standalone = false }) {
  const { profile, user, signOut } = useAuth();
  const isStaff = ["admin", "manager"].includes(profile?.role);
  const isAdmin = profile?.role === "admin";

  const [projects, setProjects] = useState([]);
  const [people, setPeople] = useState([]);
  const [docs, setDocs] = useState([]);
  const [view, setView] = useState(null); // null | {type:"project", id} | {type:"shared"}
  const [err, setErr] = useState(null);

  async function loadAll() {
    const [p1, p2, p3] = await Promise.all([
      supabase.from("projects").select("*").order("name"),
      supabase.from("profiles").select("*").order("created_at"),
      supabase.from("client_documents").select("*").order("created_at", { ascending: false }),
    ]);
    setErr(p1.error?.message || p2.error?.message || p3.error?.message || null);
    setProjects(p1.data ?? []);
    setPeople(p2.data ?? []);
    setDocs(p3.data ?? []);
  }
  useEffect(() => {
    if (isSupabaseConfigured && isStaff) loadAll();
  }, [isStaff]);

  if (!isSupabaseConfigured)
    return (
      <Shell standalone={standalone} onSignOut={signOut}>
        <p className="text-body-md text-on-surface-variant">Administration requires the online platform.</p>
      </Shell>
    );

  if (profile && !isStaff)
    return (
      <Shell standalone={standalone} onSignOut={signOut}>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg text-center">
          <MaterialIcon name="lock" className="text-4xl text-outline" />
          <h2 className="mt-2 text-headline-md text-primary">Admins only</h2>
          <Link to="/" className="mt-4 inline-block rounded-lg bg-primary px-6 py-3 text-label-md text-on-primary">
            Back to the dashboard
          </Link>
        </div>
      </Shell>
    );

  const activeProject = view?.type === "project" ? projects.find((p) => p.id === view.id) : null;

  return (
    <Shell standalone={standalone} onSignOut={signOut}>
      {err && <p className="mb-stack-md rounded-lg bg-rose-50 p-3 text-caption text-rose-700">{err}</p>}
      {view === null ? (
        <Home
          projects={projects}
          people={people}
          docs={docs}
          email={user?.email}
          onOpen={(p) => setView({ type: "project", id: p.id })}
          onOpenShared={() => setView({ type: "shared" })}
          reload={loadAll}
        />
      ) : (
        <Workspace
          project={activeProject}
          shared={view.type === "shared"}
          projects={projects}
          people={people}
          docs={docs}
          isAdmin={isAdmin}
          onBack={() => setView(null)}
          reload={loadAll}
        />
      )}
    </Shell>
  );
}

function Shell({ children, standalone, onSignOut }) {
  return (
    <div className="min-h-screen bg-surface">
      {standalone && (
        <header className="glass-bar fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between border-b border-outline-variant/70 px-margin-mobile md:px-margin-desktop">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-container to-[#1c3a63] shadow-sm">
              <Logo className="h-6 w-6 text-white" />
            </span>
            <span className="text-headline-md font-bold text-primary">Skykapital Admin</span>
          </div>
          <button
            onClick={onSignOut}
            className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-label-md text-on-surface-variant transition-colors hover:border-error hover:text-error"
          >
            <MaterialIcon name="logout" className="text-[18px]" /> Sign out
          </button>
        </header>
      )}
      <div className={`mx-auto max-w-[1100px] px-margin-mobile py-stack-lg md:px-margin-desktop ${standalone ? "pt-28" : ""}`}>
        {children}
      </div>
    </div>
  );
}

/* -------------------------------- HOME -------------------------------- */
function Home({ projects, people, docs, email, onOpen, onOpenShared, reload }) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  async function create(e) {
    e.preventDefault();
    setErr(null);
    if (name.trim().length < 2) return setErr("Project name is too short.");
    setBusy(true);
    const { error } = await supabase.from("projects").insert({ name: name.trim() });
    setBusy(false);
    if (error) return setErr(error.message);
    setName("");
    reload();
  }

  const sharedDocs = docs.filter((d) => !d.project_id).length;
  const unassigned = people.filter((u) => !u.project_id && u.role === "learner").length;

  return (
    <>
      <div className="mb-stack-lg">
        <h1 className="text-headline-lg text-primary md:text-headline-xl">Administration</h1>
        <p className="text-body-md text-on-surface-variant">{client.clientShort} platform · {email}</p>
      </div>

      {/* Create project */}
      <form onSubmit={create} className="mb-stack-lg flex flex-col gap-stack-md rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-md sm:flex-row">
        <input
          type="text"
          placeholder="New project name (e.g. LCCH Section 3)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-container to-[#1c3a63] px-8 py-3 text-label-md font-bold text-white transition-all hover:brightness-110 disabled:opacity-60"
        >
          <MaterialIcon name="add_business" className="text-[18px]" /> Create project
        </button>
      </form>
      {err && <p className="mb-stack-md rounded-lg bg-rose-50 p-3 text-caption text-rose-700">{err}</p>}

      {/* Project cards */}
      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const nUsers = people.filter((u) => u.project_id === p.id).length;
          const nDocs = docs.filter((d) => d.project_id === p.id).length;
          return (
            <button
              key={p.id}
              onClick={() => onOpen(p)}
              className="lift soft-shadow group rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg text-left"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-container to-[#1c3a63] text-white">
                <MaterialIcon name="apartment" />
              </span>
              <h2 className="mt-3 text-headline-md text-primary group-hover:text-secondary">{p.name}</h2>
              <p className="mt-1 text-caption text-on-surface-variant">
                {nUsers} user{nUsers === 1 ? "" : "s"} · {nDocs} document{nDocs === 1 ? "" : "s"}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-label-md font-bold text-secondary">
                Open <MaterialIcon name="arrow_forward" className="text-[16px] transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          );
        })}

        {/* Shared space */}
        <button
          onClick={onOpenShared}
          className="lift soft-shadow group rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-stack-lg text-left"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-white">
            <MaterialIcon name="public" />
          </span>
          <h2 className="mt-3 text-headline-md text-primary group-hover:text-secondary">Shared — all projects</h2>
          <p className="mt-1 text-caption text-on-surface-variant">
            {sharedDocs} shared document{sharedDocs === 1 ? "" : "s"} · {unassigned} learner{unassigned === 1 ? "" : "s"} without a project
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-label-md font-bold text-secondary">
            Open <MaterialIcon name="arrow_forward" className="text-[16px]" />
          </span>
        </button>
      </div>

      {projects.length === 0 && (
        <p className="mt-stack-md text-center text-body-md text-on-surface-variant">
          Create your first project above — then open it to add its users and documents.
        </p>
      )}
    </>
  );
}

/* ------------------------------ WORKSPACE ------------------------------ */
function Workspace({ project, shared, projects, people, docs, isAdmin, onBack, reload }) {
  const [tab, setTab] = useState(shared ? "docs" : "users");
  const [confirmDel, setConfirmDel] = useState(false);
  const title = shared ? "Shared — all projects" : project?.name ?? "Project";
  const pid = shared ? null : project?.id;

  async function removeProject() {
    if (!project) return;
    const { error } = await supabase.from("projects").delete().eq("id", project.id);
    setConfirmDel(false);
    if (!error) {
      onBack();
      reload();
    }
  }

  return (
    <>
      <button onClick={onBack} className="mb-stack-md flex items-center gap-1 text-label-md font-bold text-secondary hover:underline">
        <MaterialIcon name="arrow_back" className="text-[18px]" /> All projects
      </button>
      <div className="mb-stack-md flex flex-wrap items-center justify-between gap-stack-md">
        <div className="flex items-center gap-3">
          <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${shared ? "bg-secondary" : "bg-gradient-to-br from-primary-container to-[#1c3a63]"}`}>
            <MaterialIcon name={shared ? "public" : "apartment"} />
          </span>
          <h1 className="text-headline-lg text-primary">{title}</h1>
        </div>
        {!shared && isAdmin && (
          <button onClick={() => setConfirmDel(true)} className="flex items-center gap-1 rounded-lg border border-outline-variant px-3 py-2 text-caption font-bold text-on-surface-variant hover:border-error hover:text-error">
            <MaterialIcon name="delete" className="text-[16px]" /> Delete project
          </button>
        )}
        {confirmDel && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0d1c32]/60 px-6 backdrop-blur-sm" onClick={() => setConfirmDel(false)}>
            <div className="animate-pop w-full max-w-sm rounded-2xl bg-white p-stack-lg text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50">
                <MaterialIcon name="delete_forever" className="text-3xl text-rose-500" />
              </div>
              <h2 className="text-headline-md text-primary">Delete "{project?.name}"?</h2>
              <p className="mx-auto mt-1 max-w-xs text-body-md text-on-surface-variant">
                Its documents will disappear from Resources and its users will be left without a project. This cannot be undone.
              </p>
              <div className="mt-stack-md flex gap-2">
                <button onClick={() => setConfirmDel(false)} className="flex-1 rounded-lg bg-primary py-3 text-label-md font-bold text-on-primary hover:opacity-90">
                  Keep it
                </button>
                <button onClick={removeProject} className="flex-1 rounded-lg border border-outline-variant py-3 text-label-md text-on-surface-variant transition-colors hover:border-rose-300 hover:text-rose-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-stack-md flex flex-wrap gap-2">
        {!shared && (
          <TabBtn active={tab === "users"} icon="group" onClick={() => setTab("users")}>
            Users
          </TabBtn>
        )}
        {!shared && (
          <TabBtn active={tab === "progress"} icon="insights" onClick={() => setTab("progress")}>
            Progress & certificates
          </TabBtn>
        )}
        <TabBtn active={tab === "docs"} icon="folder_open" onClick={() => setTab("docs")}>
          Resources documents
        </TabBtn>
      </div>

      {tab === "progress" && !shared ? (
        <ProjectProgress project={project} people={people} />
      ) : tab === "users" && !shared ? (
        <ProjectUsers project={project} projects={projects} people={people} isAdmin={isAdmin} reload={reload} />
      ) : (
        <ProjectDocs pid={pid} shared={shared} docs={docs.filter((d) => (shared ? !d.project_id : d.project_id === pid))} reload={reload} />
      )}
    </>
  );
}

function TabBtn({ active, icon, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-label-md font-bold transition-colors ${
        active ? "bg-primary-container text-white" : "border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:text-primary"
      }`}
    >
      <MaterialIcon name={icon} className="text-[18px]" />
      {children}
    </button>
  );
}

/* ------------------------- PROJECT · PROGRESS ------------------------- */
const TOTAL_MODULES = 6;

// Opens the print-ready certificate page (the user's approved mockup,
// rendered by CertificatePrintPage) in a new tab — it auto-prints.
function printCertificate(p) {
  const q = new URLSearchParams({ name: p.full_name || '', course: course.title, date: p.last });
  window.open('/certificate-print?' + q.toString(), '_blank', 'noopener');
}

function ProjectProgress({ project, people }) {
  const members = people.filter((u) => u.project_id === project.id && u.role !== "admin");
  const [rows, setRows] = useState(null);

  useEffect(() => {
    const ids = members.map((m) => m.id);
    if (ids.length === 0) {
      setRows([]);
      return;
    }
    supabase
      .from("module_progress")
      .select("*")
      .in("user_id", ids)
      .then(({ data }) => setRows(data ?? []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id, people.length]);

  const per = members.map((m) => {
    const mine = (rows ?? []).filter((r) => r.user_id === m.id && r.status === "completed");
    const last = mine.map((r) => r.updated_at).sort().slice(-1)[0];
    const pts = mine.reduce((s, r) => s + (r.earned ?? 0), 0);
    return {
      ...m,
      done: mine.length,
      certified: mine.length >= TOTAL_MODULES,
      last: last ? last.slice(0, 10) : "—",
      pts,
      certNo: "SKA-" + m.id.replace(/-/g, "").slice(0, 10).toUpperCase(),
    };
  });
  const certified = per.filter((p) => p.certified).length;

  return (
    <div className="space-y-gutter">
      <div className="flex flex-wrap gap-gutter">
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest px-stack-lg py-stack-md">
          <p className="text-caption uppercase tracking-wider text-on-surface-variant">Learners</p>
          <p className="text-headline-lg text-primary">{members.length}</p>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest px-stack-lg py-stack-md">
          <p className="text-caption uppercase tracking-wider text-on-surface-variant">Certified</p>
          <p className="text-headline-lg text-primary">
            {certified}
            <span className="text-headline-md text-outline">/{members.length}</span>
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-outline-variant bg-surface-container-lowest">
        <table className="w-full min-w-[680px] text-left">
          <thead>
            <tr className="border-b border-outline-variant text-caption uppercase tracking-wider text-on-surface-variant">
              <th className="px-stack-md py-stack-sm font-semibold">Name</th>
              <th className="px-stack-md py-stack-sm font-semibold">Modules completed</th>
              <th className="px-stack-md py-stack-sm font-semibold">Certificate</th>
              <th className="px-stack-md py-stack-sm font-semibold">Last activity</th>
            </tr>
          </thead>
          <tbody>
            {rows === null ? (
              <tr><td colSpan={4} className="px-stack-md py-stack-lg text-center text-on-surface-variant">Loading…</td></tr>
            ) : per.length === 0 ? (
              <tr><td colSpan={4} className="px-stack-md py-stack-lg text-center text-on-surface-variant">No learners in this project yet.</td></tr>
            ) : (
              per.map((p) => (
                <tr key={p.id} className="border-b border-surface-container last:border-0">
                  <td className="px-stack-md py-stack-md text-body-md text-primary">{p.full_name || "—"}</td>
                  <td className="px-stack-md py-stack-md">
                    <span className="mr-2 text-body-md font-bold text-primary">{p.done}/{TOTAL_MODULES}</span>
                    <span className="inline-block h-1.5 w-28 overflow-hidden rounded-full bg-surface-container-high align-middle">
                      <span className="block h-full rounded-full bg-secondary" style={{ width: (p.done / TOTAL_MODULES) * 100 + "%" }} />
                    </span>
                  </td>
                  <td className="px-stack-md py-stack-md">
                    {p.certified ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-caption font-bold text-emerald-700">
                          <MaterialIcon name="workspace_premium" className="text-[14px]" /> {p.certNo}
                        </span>
                        <button
                          onClick={() =>
                            downloadCertificatePdf({
                              name: p.full_name,
                              certNo: p.certNo,
                              date: p.last,
                              courseTitle: course.title,
                              clientShort: client.clientShort,
                              totalModules: TOTAL_MODULES,
                            })
                          }
                          title="Download the certificate as PDF"
                          className="inline-flex items-center gap-1 rounded-lg border border-outline-variant px-2.5 py-1 text-caption font-bold text-primary transition-colors hover:border-secondary hover:text-secondary"
                        >
                          <MaterialIcon name="download" className="text-[14px]" /> PDF
                        </button>
                        <button
                          onClick={() => printCertificate(p)}
                          title="Print the certificate"
                          className="inline-flex items-center gap-1 rounded-lg border border-outline-variant px-2.5 py-1 text-caption font-bold text-primary transition-colors hover:border-secondary hover:text-secondary"
                        >
                          <MaterialIcon name="print" className="text-[14px]" /> Print
                        </button>
                      </span>
                    ) : (
                      <span className="text-caption text-outline">In progress</span>
                    )}
                  </td>
                  <td className="px-stack-md py-stack-md text-body-md text-on-surface-variant">{p.last}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="text-caption text-on-surface-variant">
        These records come from the central database — the foundation for externally verifiable certification.
      </p>
    </div>
  );
}

/* --------------------------- PROJECT · USERS --------------------------- */
function ProjectUsers({ project, people, isAdmin, reload }) {
  // Only learners are managed here — the admin (you) is not a project member.
  const members = people.filter((u) => u.project_id === project.id && u.role !== "admin");
  const others = people.filter((u) => u.project_id !== project.id && u.role !== "admin");
  const [addId, setAddId] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  async function assign(id, proj) {
    setErr(null);
    const { error } = await supabase.rpc("set_user_project", { target: id, proj });
    if (error) return setErr(error.message);
    reload();
  }

  async function createUser(e) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setBusy(true);
    // Readable temporary password the admin can hand to the learner
    // (they can change it any time via "Change my password").
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    const tempPw =
      "Sky-" +
      Array.from(bytes.slice(0, 5), (b) => "acdefhjkmnpqrstuvwxyz"[b % 21]).join("") +
      "-" +
      Array.from(bytes.slice(5), (b) => "23456789"[b % 8]).join("");
    const email = form.email.trim();
    const res = await adminCreateAccount(email, tempPw, form.name.trim());
    if (res.error) {
      setBusy(false);
      return setErr(res.error + ' — check Supabase Auth settings: "Allow new users to sign up" must be ON.');
    }
    if (res.id) await supabase.rpc("set_user_project", { target: res.id, proj: project.id });
    // Also try the invitation email (requires the SMTP setup in EMAILS.md).
    const { error: mailErr } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset",
    });
    setBusy(false);
    setMsg({ name: form.name.trim(), email, pw: tempPw, mailOk: !mailErr });
    setForm({ name: "", email: "", password: "" });
    reload();
  }

  return (
    <div className="space-y-gutter">
      {/* Create user IN this project */}
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg">
        <h2 className="mb-1 flex items-center gap-2 text-headline-md text-primary">
          <MaterialIcon name="person_add" className="text-secondary" /> Add a user to {project.name}
        </h2>
        <p className="mb-3 text-caption text-on-surface-variant">
          You get the sign-in details (email + temporary password) to share with the person — an invitation email is also attempted.
        </p>
        <form onSubmit={createUser} className="grid grid-cols-1 gap-stack-md sm:grid-cols-2">
          <input type="text" required placeholder="Full name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none" />
          <input type="email" required placeholder="Work email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none" />
          <button type="submit" disabled={busy}
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-container to-[#1c3a63] px-6 py-3 text-label-md font-bold text-white transition-all hover:brightness-110 disabled:opacity-60 sm:col-span-2 sm:w-auto">
            <MaterialIcon name="person_add" className="text-[18px]" />
            {busy ? "Creating & sending invite…" : "Create account & send invitation"}
          </button>
        </form>

        {/* Or move an existing user into this project */}
        {others.length > 0 && (
          <div className="mt-stack-md flex flex-col gap-2 border-t border-outline-variant pt-stack-md sm:flex-row">
            <select value={addId} onChange={(e) => setAddId(e.target.value)}
              className="flex-1 rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none">
              <option value="">Move an existing user into this project…</option>
              {others.map((u) => (
                <option key={u.id} value={u.id}>{u.full_name || u.id.slice(0, 8)}</option>
              ))}
            </select>
            <button
              onClick={() => addId && assign(addId, project.id).then(() => setAddId(""))}
              disabled={!addId}
              className="rounded-lg border border-primary px-6 py-3 text-label-md font-bold text-primary transition-colors hover:bg-surface-container-low disabled:opacity-50"
            >
              Add to project
            </button>
          </div>
        )}
        {msg && (
          <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-stack-md">
            <p className="mb-2 flex items-center gap-1.5 text-label-md font-bold text-emerald-800">
              <MaterialIcon name="check_circle" fill className="text-[18px]" />
              Account created for {msg.name} — share these sign-in details:
            </p>
            <div className="rounded-lg border border-emerald-200 bg-white p-3 font-mono text-body-md text-primary">
              <p>Website: &nbsp;{window.location.origin}</p>
              <p>Username: {msg.email}</p>
              <p>Password: {msg.pw}</p>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `Your ${client.clientShort} ESG training access:\nWebsite: ${window.location.origin}\nUsername: ${msg.email}\nPassword: ${msg.pw}\n\nYou can change your password after signing in (account menu → Change my password).`
                  );
                }}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-caption font-bold text-white transition-opacity hover:opacity-90"
              >
                <MaterialIcon name="content_copy" className="text-[16px]" /> Copy the message to send
              </button>
              <span className="text-caption text-emerald-800">
                {msg.mailOk
                  ? "An invitation email was also sent."
                  : "Invitation email not sent (SMTP not configured — see EMAILS.md). Share the details above yourself."}
              </span>
            </div>
            <p className="mt-2 text-caption text-emerald-800">
              This password is shown only once — {msg.name} can change it after signing in.
            </p>
          </div>
        )}
        {err && <p className="mt-3 rounded-lg bg-rose-50 p-3 text-caption text-rose-700">{err}</p>}
      </div>

      {/* Member list */}
      <div className="overflow-x-auto rounded-xl border border-outline-variant bg-surface-container-lowest">
        <table className="w-full min-w-[560px] text-left">
          <thead>
            <tr className="border-b border-outline-variant text-caption uppercase tracking-wider text-on-surface-variant">
              <th className="px-stack-md py-stack-sm font-semibold">Name</th>
              <th className="px-stack-md py-stack-sm font-semibold">Role</th>
              <th className="px-stack-md py-stack-sm font-semibold">Joined</th>
              <th className="px-stack-md py-stack-sm font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr><td colSpan={4} className="px-stack-md py-stack-lg text-center text-on-surface-variant">No users in this project yet.</td></tr>
            ) : (
              members.map((r) => (
                <tr key={r.id} className="border-b border-surface-container last:border-0">
                  <td className="px-stack-md py-stack-md text-body-md text-primary">{r.full_name || "—"}</td>
                  <td className="px-stack-md py-stack-md">
                    <span className="rounded-full bg-surface-container-low px-2.5 py-0.5 text-caption font-semibold text-on-surface-variant">
                      Learner
                    </span>
                  </td>
                  <td className="px-stack-md py-stack-md text-body-md text-on-surface-variant">{(r.created_at || "").slice(0, 10)}</td>
                  <td className="px-stack-md py-stack-md text-right">
                    <button onClick={() => assign(r.id, null)} title="Remove from project"
                      className="rounded-full p-2 text-outline hover:text-error">
                      <MaterialIcon name="person_remove" className="text-[20px]" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------- PROJECT · DOCS ---------------------------- */
function ProjectDocs({ pid, shared, docs, reload }) {
  const [form, setForm] = useState({ title: "", note: "", category: DOC_CATEGORIES[0] });
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);

  async function upload(e) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    if (!file) return setErr("Choose a PDF file first.");
    if (file.type !== "application/pdf") return setErr("Only PDF files are accepted.");
    if (file.size > 20 * 1024 * 1024) return setErr("Maximum size: 20 MB.");
    setBusy(true);
    const path = `${Date.now()}-${file.name.replace(/[^\w.-]+/g, "_")}`;
    const { error: upErr } = await supabase.storage.from("client-docs").upload(path, file, { contentType: "application/pdf" });
    if (upErr) {
      setBusy(false);
      return setErr(upErr.message + " — has the storage bucket 'client-docs' been created? (see setup SQL)");
    }
    const { error: insErr } = await supabase.from("client_documents").insert({
      title: form.title.trim(),
      note: form.note.trim(),
      category: form.category,
      project_id: pid,
      path,
      url: "",
    });
    setBusy(false);
    if (insErr) return setErr(insErr.message);
    setMsg(`"${form.title}" is live in the Resources tab ${shared ? "for every learner" : "for this project's users"}.`);
    setForm({ title: "", note: "", category: DOC_CATEGORIES[0] });
    setFile(null);
    reload();
  }

  async function remove(row) {
    setErr(null);
    await supabase.storage.from("client-docs").remove([row.path]);
    const { error } = await supabase.from("client_documents").delete().eq("id", row.id);
    if (error) return setErr(error.message);
    reload();
  }

  return (
    <div className="space-y-gutter">
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg">
        <h2 className="mb-1 flex items-center gap-2 text-headline-md text-primary">
          <MaterialIcon name="upload_file" className="text-secondary" /> Publish a document
        </h2>
        <p className="mb-stack-md text-caption text-on-surface-variant">
          {shared
            ? "Visible in Resources for EVERY learner, whatever their project."
            : "Visible in Resources only for this project's users."}
        </p>
        <form onSubmit={upload} className="grid grid-cols-1 gap-stack-md sm:grid-cols-2">
          <input type="text" required placeholder="Document title (e.g. HSE Policy)" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none">
            {DOC_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input type="text" placeholder="One-line description (optional)" value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none sm:col-span-2" />
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-body-md file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2.5 file:text-label-md file:text-on-primary" />
          <button type="submit" disabled={busy}
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-container to-[#1c3a63] px-6 py-3 text-label-md font-bold text-white transition-all hover:brightness-110 disabled:opacity-60">
            <MaterialIcon name="cloud_upload" className="text-[18px]" />
            {busy ? "Uploading…" : "Publish to Resources"}
          </button>
        </form>
        {msg && <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-caption text-emerald-800">{msg}</p>}
        {err && <p className="mt-3 rounded-lg bg-rose-50 p-3 text-caption text-rose-700">{err}</p>}
      </div>

      <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
        {docs.length === 0 ? (
          <p className="p-stack-lg text-center text-on-surface-variant">No documents here yet — publish the first one above.</p>
        ) : (
          docs.map((r) => (
            <div key={r.id} className="flex items-center gap-3 border-b border-surface-container px-stack-md py-3 last:border-0">
              <MaterialIcon name="picture_as_pdf" className="shrink-0 text-rose-500" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-label-md font-semibold text-primary">{r.title}</span>
                <span className="text-caption text-on-surface-variant">{r.category}{r.note ? ` · ${r.note}` : ""}</span>
              </span>
              <button onClick={() => openDoc(r.path)} className="text-label-md font-bold text-secondary hover:underline">Open</button>
              <button onClick={() => remove(r)} title="Remove" className="rounded-full p-2 text-outline hover:text-error">
                <MaterialIcon name="delete" className="text-[20px]" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
