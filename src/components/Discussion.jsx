import { useEffect, useState } from "react";
import MaterialIcon from "./MaterialIcon.jsx";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";
import { useAuth } from "../AuthContext.jsx";

// Per-module discussion board (Supabase-backed). In local demo mode it
// explains that discussion needs an account/server.
export default function Discussion({ moduleId, accent = "#c99a2e" }) {
  const { user, profile } = useAuth();
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    if (!isSupabaseConfigured) return;
    const { data } = await supabase
      .from("comments")
      .select("id, user_id, author_name, body, created_at")
      .eq("module_id", moduleId)
      .order("created_at", { ascending: true });
    setComments(data ?? []);
  }
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId]);

  async function post(e) {
    e.preventDefault();
    const text = body.trim();
    if (!text || !user) return;
    setBusy(true);
    setError(null);
    const authorName =
      profile?.full_name || user.user_metadata?.full_name || user.email;
    const { error: err } = await supabase.from("comments").insert({
      user_id: user.id,
      module_id: moduleId,
      author_name: authorName,
      body: text,
    });
    setBusy(false);
    if (err) return setError(err.message);
    setBody("");
    load();
  }

  async function remove(id) {
    await supabase.from("comments").delete().eq("id", id);
    load();
  }

  return (
    <div id="discussion" className="mt-stack-lg rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg">
      <h2 className="mb-1 flex items-center gap-2 text-headline-md text-primary">
        <MaterialIcon name="forum" style={{ color: accent }} />
        Discussion
        <span className="ml-1 rounded-full bg-surface-container-high px-2.5 py-0.5 text-caption font-bold text-on-surface-variant">
          {comments.length}
        </span>
      </h2>
      <p className="mb-stack-md text-body-md text-on-surface-variant">
        Questions and insights for your workshop group — visible to every
        learner on this module.
      </p>

      {!isSupabaseConfigured ? (
        <p className="rounded-lg bg-surface-container-low p-stack-md text-caption text-on-surface-variant">
          Discussion is available on the online platform once you're signed in.
        </p>
      ) : (
        <>
          <div className="space-y-3">
            {comments.length === 0 && (
              <p className="text-caption text-outline">
                No comments yet — be the first to ask a question.
              </p>
            )}
            {comments.map((c) => (
              <div key={c.id} className="rounded-lg border border-outline-variant bg-white p-stack-md">
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-caption font-bold text-white"
                    style={{ background: accent }}
                  >
                    {(c.author_name?.[0] || "?").toUpperCase()}
                  </span>
                  <span className="text-label-md font-semibold text-primary">
                    {c.author_name}
                  </span>
                  <span className="text-caption text-outline">
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                  {c.user_id === user?.id && (
                    <button
                      onClick={() => remove(c.id)}
                      title="Delete your comment"
                      className="ml-auto text-outline transition-colors hover:text-error"
                    >
                      <MaterialIcon name="delete" className="text-[18px]" />
                    </button>
                  )}
                </div>
                <p className="whitespace-pre-wrap text-body-md text-on-surface">
                  {c.body}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={post} className="mt-stack-md">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={2}
              maxLength={2000}
              placeholder="Ask a question or share an insight…"
              className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
            />
            {error && <p className="mt-1 text-caption text-rose-600">{error}</p>}
            <button
              type="submit"
              disabled={busy || !body.trim()}
              className="mt-2 flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-label-md text-on-primary transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <MaterialIcon name="send" className="text-[18px]" /> Post
            </button>
          </form>
        </>
      )}
    </div>
  );
}
