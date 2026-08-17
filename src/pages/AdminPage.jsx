import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon.jsx";
import Logo from "../components/Logo.jsx";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";
import { useAuth } from "../AuthContext.jsx";
import { client } from "../config/clients.js";

// The Skykapital administration console. Admins live HERE only (no access to
// the learning side): manage projects, users per project, and the documents
// published to each project's Resources tab.
export default function AdminPage({ standalone = false }) {
  const { profile, user, signOut } = useAuth();
  const [tab, setTab] = useState("users");
  const [projects, setProjects] = useState([]);
  const isStaff = ["admin", "manager"].includes(profile?.role);

  async function loadProjects() {
    const { data } = await supabase.from("projects").select("*").order("name");
    setProjects(data ?? []);
  }
  useEffect(() => {
    if (isSupabaseConfigured && isStaff) loadProjects();
  }, [isStaff]);

  if (!isSupabaseConfigured)
    return (
      <Shell standalone={standalone} onSignOut={signOut}>
        <p className="text-body-md text-on-surface-variant">
          Administration requires the online platform.
        </p>
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

  return (
    <Shell standalone={standalone} onSignOut={signOut}>
      <div className="mb-stack-md">
        <h1 className="text-headline-lg text-primary md:text-headline-xl">Administration</h1>
        <p className="text-body-md text-on-surface-variant">
          {client.clientShort} platform · {user?.email}
        </p>
      </div>

      <div className="mb-stack-md flex flex-wrap gap-2">
        {[
          ["users", "group", "Users"],
          ["docs", "folder_open", "Project documents"],
          ["projects", "apartment", "Projects"],
        ].map(([k, ic, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-label-md font-bold transition-colors ${
              tab === k
                ? "bg-primary-container text-white"
                : "border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:text-primary"
            }`}
          >
            <MaterialIcon name={ic} className="text-[18px]" />
            {label}
          </button>
        ))}
      </div>

      {tab === "projects" ? (
        <ProjectsTab projects={projects} reload={loadProjects} />
      ) : tab === "users" ? (
        <UsersTab isAdmin={profile?.role === "admin"} projects={projects} />
      ) : (
        <DocsTab projects={projects} />
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

/* ----------------------------- PROJECTS TAB ----------------------------- */
function ProjectsTab({ projects, reload }) {
  const [name, setName] = useState("");
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

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

  async function remove(p) {
    setErr(null);
    const { error } = await supabase.from("projects").delete().eq("id", p.id);
    if (error) return setErr("Cannot delete: " + error.message);
    reload();
  }

  return (
    <div className="space-y-gutter">
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg">
        <h2 className="mb-1 flex items-center gap-2 text-headline-md text-primary">
          <MaterialIcon name="add_business" className="text-secondary" /> Create a project
        </h2>
        <p className="mb-stack-md text-caption text-on-surface-variant">
          A project groups users and documents (e.g. "LCCH Section 3", "SBS Kebbi").
        </p>
        <form onSubmit={create} className="flex flex-col gap-stack-md sm:flex-row">
          <input
            type="text"
            required
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy}
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-container to-[#1c3a63] px-8 py-3 text-label-md font-bold text-white transition-all hover:brightness-110 disabled:opacity-60"
          >
            <MaterialIcon name="add" className="text-[18px]" /> Create
          </button>
        </form>
        {err && <p className="mt-3 rounded-lg bg-rose-50 p-3 text-caption text-rose-700">{err}</p>}
      </div>

      <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
        {projects.length === 0 ? (
          <p className="p-stack-lg text-center text-on-surface-variant">No projects yet — create the first one above.</p>
        ) : (
          projects.map((p) => (
            <div key={p.id} className="flex items-center gap-3 border-b border-surface-container px-stack-md py-3 last:border-0">
              <MaterialIcon name="apartment" className="text-secondary" />
              <span className="flex-1 text-label-md font-semibold text-primary">{p.name}</span>
              <button onClick={() => remove(p)} title="Delete project" className="rounded-full p-2 text-outline hover:text-error">
                <MaterialIcon name="delete" className="text-[20px]" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ------------------------------ USERS TAB ------------------------------ */
function UsersTab({ isAdmin, projects }) {
  const [rows, setRows] = useState(null);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ name: "", email: "", password: "", project: "" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  async function load() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) setErr(error.message);
    setRows(data ?? []);
  }
  useEffect(() => {
    load();
  }, []);

  async function createUser(e) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    if (form.password.length < 10 || !/[a-zA-Z]/.test(form.password) || !/[0-9]/.test(form.password))
      return setErr("Temporary password: at least 10 characters with letters and numbers.");
    setBusy(true);
    const { data, error } = await supabase.functions.invoke("create-user", {
      body: { email: form.email.trim(), password: form.password, full_name: form.name.trim() },
    });
    if (error || data?.error) {
      setBusy(false);
      return setErr(
        (data?.error || error.message) +
          " — if the function isn't deployed yet, create the account from the Supabase dashboard (Authentication → Add user)."
      );
    }
    // assign project right away if chosen
    if (form.project && data?.id) {
      await supabase.rpc("set_user_project", { target: data.id, proj: form.project });
    }
    setBusy(false);
    setMsg(`Account created for ${form.email}. Share the temporary password — they can change it themselves.`);
    setForm({ name: "", email: "", password: "", project: "" });
    load();
  }

  async function setRole(id, role) {
    setErr(null);
    const { error } = await supabase.rpc("set_user_role", { target: id, new_role: role });
    if (error) return setErr(error.message);
    load();
  }
  async function setProject(id, proj) {
    setErr(null);
    const { error } = await supabase.rpc("set_user_project", { target: id, proj: proj || null });
    if (error) return setErr(error.message);
    load();
  }

  const shown = (rows ?? []).filter((r) => filter === "all" || r.project_id === filter || (filter === "none" && !r.project_id));
  const pName = (id) => projects.find((p) => p.id === id)?.name ?? "—";

  return (
    <div className="space-y-gutter">
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg">
        <h2 className="mb-1 flex items-center gap-2 text-headline-md text-primary">
          <MaterialIcon name="person_add" className="text-secondary" /> Create an account
        </h2>
        <form onSubmit={createUser} className="grid grid-cols-1 gap-stack-md sm:grid-cols-2">
          <input type="text" required placeholder="Full name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none" />
          <input type="email" required placeholder="Work email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none" />
          <input type="text" required placeholder="Temporary password (10+ chars, letters+numbers)" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none" />
          <select value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })}
            className="rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none">
            <option value="">No project (sees shared documents only)</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <button type="submit" disabled={busy}
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-container to-[#1c3a63] px-6 py-3 text-label-md font-bold text-white transition-all hover:brightness-110 disabled:opacity-60 sm:col-span-2 sm:w-auto">
            <MaterialIcon name="person_add" className="text-[18px]" />
            {busy ? "Creating…" : "Create the account"}
          </button>
        </form>
        {msg && <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-caption text-emerald-800">{msg}</p>}
        {err && <p className="mt-3 rounded-lg bg-rose-50 p-3 text-caption text-rose-700">{err}</p>}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-caption font-bold uppercase tracking-wider text-on-surface-variant">Filter by project</span>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-outline-variant bg-white px-3 py-2 text-body-md">
          <option value="all">All users</option>
          <option value="none">No project</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-outline-variant bg-surface-container-lowest">
        <table className="w-full min-w-[680px] text-left">
          <thead>
            <tr className="border-b border-outline-variant text-caption uppercase tracking-wider text-on-surface-variant">
              <th className="px-stack-md py-stack-sm font-semibold">Name</th>
              <th className="px-stack-md py-stack-sm font-semibold">Project</th>
              <th className="px-stack-md py-stack-sm font-semibold">Role</th>
              <th className="px-stack-md py-stack-sm font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {rows === null ? (
              <tr><td colSpan={4} className="px-stack-md py-stack-lg text-center text-on-surface-variant">Loading…</td></tr>
            ) : shown.length === 0 ? (
              <tr><td colSpan={4} className="px-stack-md py-stack-lg text-center text-on-surface-variant">No users.</td></tr>
            ) : (
              shown.map((r) => (
                <tr key={r.id} className="border-b border-surface-container last:border-0">
                  <td className="px-stack-md py-stack-md text-body-md text-primary">{r.full_name || "—"}</td>
                  <td className="px-stack-md py-stack-md">
                    {isAdmin ? (
                      <select value={r.project_id ?? ""} onChange={(e) => setProject(r.id, e.target.value)}
                        className="rounded-lg border border-outline-variant bg-white px-2 py-1.5 text-body-md">
                        <option value="">—</option>
                        {projects.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-body-md text-on-surface-variant">{pName(r.project_id)}</span>
                    )}
                  </td>
                  <td className="px-stack-md py-stack-md">
                    {isAdmin ? (
                      <select value={r.role} onChange={(e) => setRole(r.id, e.target.value)}
                        className="rounded-lg border border-outline-variant bg-white px-2 py-1.5 text-body-md">
                        <option value="learner">learner</option>
                        <option value="manager">manager</option>
                        <option value="admin">admin</option>
                      </select>
                    ) : (
                      <span className="text-body-md text-on-surface-variant">{r.role}</span>
                    )}
                  </td>
                  <td className="px-stack-md py-stack-md text-body-md text-on-surface-variant">{(r.created_at || "").slice(0, 10)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------- DOCUMENTS TAB ---------------------------- */
const DOC_CATEGORIES = ["Governance & Ethics", "HSE", "People & Community", "Management System", "Other"];

function DocsTab({ projects }) {
  const [rows, setRows] = useState(null);
  const [form, setForm] = useState({ title: "", note: "", category: DOC_CATEGORIES[0], project: "" });
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);

  async function load() {
    const { data, error } = await supabase.from("client_documents").select("*").order("created_at", { ascending: false });
    if (error) setErr(error.message);
    setRows(data ?? []);
  }
  useEffect(() => {
    load();
  }, []);

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
    const { data: pub } = supabase.storage.from("client-docs").getPublicUrl(path);
    const { error: insErr } = await supabase.from("client_documents").insert({
      title: form.title.trim(),
      note: form.note.trim(),
      category: form.category,
      project_id: form.project || null,
      path,
      url: pub.publicUrl,
    });
    setBusy(false);
    if (insErr) return setErr(insErr.message);
    setMsg(`"${form.title}" is now live in Resources${form.project ? " for its project" : " for everyone"}.`);
    setForm({ title: "", note: "", category: DOC_CATEGORIES[0], project: "" });
    setFile(null);
    load();
  }

  async function remove(row) {
    setErr(null);
    await supabase.storage.from("client-docs").remove([row.path]);
    const { error } = await supabase.from("client_documents").delete().eq("id", row.id);
    if (error) return setErr(error.message);
    load();
  }

  const pName = (id) => projects.find((p) => p.id === id)?.name ?? "All projects";

  return (
    <div className="space-y-gutter">
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg">
        <h2 className="mb-1 flex items-center gap-2 text-headline-md text-primary">
          <MaterialIcon name="upload_file" className="text-secondary" /> Publish a document
        </h2>
        <p className="mb-stack-md text-caption text-on-surface-variant">
          The PDF appears in the Resources tab — for one project's users, or for everyone.
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
          <select value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })}
            className="rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none">
            <option value="">All projects (shared)</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <input type="text" placeholder="One-line description (optional)" value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none" />
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
        {rows === null ? (
          <p className="p-stack-lg text-center text-on-surface-variant">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="p-stack-lg text-center text-on-surface-variant">No documents yet — publish the first one above.</p>
        ) : (
          rows.map((r) => (
            <div key={r.id} className="flex items-center gap-3 border-b border-surface-container px-stack-md py-3 last:border-0">
              <MaterialIcon name="picture_as_pdf" className="shrink-0 text-rose-500" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-label-md font-semibold text-primary">{r.title}</span>
                <span className="text-caption text-on-surface-variant">
                  {pName(r.project_id)} · {r.category}{r.note ? ` · ${r.note}` : ""}
                </span>
              </span>
              <a href={r.url} target="_blank" rel="noreferrer" className="text-label-md font-bold text-secondary hover:underline">Open</a>
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
