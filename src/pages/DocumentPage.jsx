import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { markDocRead } from "../lib/readingProgress.js";
import MaterialIcon from "../components/MaterialIcon.jsx";
import { useAuth } from "../AuthContext.jsx";
import { useCourse, isUnlocked } from "../CourseContext.jsx";
import { documents, course, libraryByModule } from "../data.js";
import RegFrameworkChart from "../components/charts/RegFrameworkChart.jsx";
import EquatorCategories from "../components/charts/EquatorCategories.jsx";
import PSCards from "../components/charts/PSCards.jsx";
import MatchActivity from "../components/activities/MatchActivity.jsx";

// Embeddable interactive/chart blocks a reading can drop in via `component`.
const SECTION_COMPONENTS = {
  "reg-framework": RegFrameworkChart,
  "equator-categories": EquatorCategories,
  "ps-cards": PSCards,
  "ps-match": MatchActivity,
};

// Renders a reference document as an in-app reading: a structured summary
// for study, plus the full signed source PDF embedded to view/download.
export default function DocumentPage() {
  const { docId } = useParams();
  const location = useLocation();
  const parent = location.pathname.startsWith("/resources")
    ? { label: "Documents", to: "/resources" }
    : { label: "The Library", to: "/library" };
  const { modules, acknowledgements, acknowledge } = useCourse();
  const { profile, user } = useAuth();
  const [name, setName] = useState(
    profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || course.learner
  );
  const [checked, setChecked] = useState(false);
  const doc = documents[docId];
  const signed = acknowledgements.find((a) => a.id === docId);

  // Opening a reading counts it as read — this is what unlocks the games
  // back on the module page.
  useEffect(() => {
    if (doc) markDocRead(docId);
  }, [docId, doc]);

  if (!doc) {
    return (
      <div className="mx-auto max-w-[1000px] p-stack-lg text-center">
        <p className="text-body-lg text-on-surface-variant">
          This document isn't available yet.
        </p>
        <Link to={parent.to} className="text-secondary hover:underline">
          Back to {parent.label}
        </Link>
      </div>
    );
  }

  const related = (doc.relatedModules || [])
    .map((id) => modules.find((m) => m.id === id))
    .filter(Boolean);

  // Gate library documents behind module completion.
  const ownerModule = modules.find((m) =>
    (libraryByModule[m.id] || []).some((d) => d.doc === docId)
  );
  if (
    parent.to === "/library" &&
    ownerModule &&
    !isUnlocked(modules, ownerModule)
  ) {
    const prev = modules[modules.findIndex((m) => m.id === ownerModule.id) - 1];
    return (
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 p-margin-desktop text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-high text-outline">
          <MaterialIcon name="lock" className="text-3xl" />
        </div>
        <h1 className="text-headline-md text-primary">This library is locked</h1>
        <p className="text-body-md text-on-surface-variant">
          Complete <strong>{prev ? prev.title : "the previous module"}</strong>{" "}
          to unlock the {ownerModule.code} library.
        </p>
        <Link to="/course" className="bg-primary px-6 py-3 text-label-md text-on-primary">
          Go to the course
        </Link>
      </div>
    );
  }

  // Reading sequence WITHIN this document's own module — after the last
  // reading the learner is sent back to the module to continue (games, quiz),
  // never silently pushed into another module's readings.
  const moduleSeq = ownerModule
    ? (libraryByModule[ownerModule.id] || [])
        .filter((d) => d.doc && documents[d.doc])
        .map((d) => ({ slug: d.doc, title: d.title }))
    : [];
  const seqIdx = moduleSeq.findIndex((x) => x.slug === docId);
  const nextInSeq =
    parent.to === "/library" && seqIdx >= 0 ? moduleSeq[seqIdx + 1] : null;

  return (
    <div className="mx-auto max-w-[1000px] px-margin-mobile py-stack-lg md:px-margin-desktop">
      {/* Breadcrumb */}
      <nav className="mb-stack-md flex items-center gap-2 text-caption text-outline">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <MaterialIcon name="chevron_right" className="text-[14px]" />
        <Link to={parent.to} className="hover:text-primary">
          {parent.label}
        </Link>
        <MaterialIcon name="chevron_right" className="text-[14px]" />
        <span className="text-on-surface">{doc.title}</span>
      </nav>

      {/* Header picture */}
      {doc.image && (
        <div className="relative mb-gutter h-40 overflow-hidden rounded-xl md:h-56">
          <img
            src={doc.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(120deg, ${doc.accent}dd, ${doc.accent}44 60%, transparent)`,
            }}
          />
          <div className="absolute bottom-0 left-0 p-stack-lg">
            <span className="text-label-md font-bold uppercase tracking-widest text-white/90">
              {doc.org}
            </span>
            <h2 className="mt-1 text-headline-md font-bold text-white md:text-headline-lg">
              {doc.title}
            </h2>
          </div>
        </div>
      )}

      {/* Header */}
      <div
        className="relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg shadow-sm"
        style={{ borderLeft: `6px solid ${doc.accent}` }}
      >
        <div className="flex flex-col gap-stack-md md:flex-row md:items-start md:justify-between">
          <div>
            <span
              className="text-label-md font-bold uppercase tracking-widest"
              style={{ color: doc.accent }}
            >
              Reference document
            </span>
            <h1 className="mt-1 text-headline-lg text-primary">{doc.title}</h1>
            {doc.org && (
              <p className="mt-1 text-body-md text-on-surface-variant">{doc.org}</p>
            )}
            {(doc.ref || doc.owner) && (
              <p className="mt-2 text-caption text-outline">
                {[doc.ref, doc.owner].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
          {doc.pdf && (
            <div className="flex shrink-0 gap-stack-sm">
              <a
                href={doc.pdf}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-primary px-5 py-2.5 text-label-md text-on-primary transition-opacity hover:opacity-90"
              >
                <MaterialIcon name="open_in_new" className="text-[18px]" /> Open PDF
              </a>
              <a
                href={doc.pdf}
                download
                className="flex items-center gap-2 border border-primary px-5 py-2.5 text-label-md text-primary transition-colors hover:bg-surface-container-low"
              >
                <MaterialIcon name="download" className="text-[18px]" /> Download
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Reading */}
      <div className="mt-gutter grid grid-cols-1 gap-gutter lg:grid-cols-12">
        <div
          className={`space-y-gutter ${doc.pdf ? "lg:col-span-7" : "lg:col-span-12"}`}
        >
          <div className="rounded-xl border border-outline-variant bg-white p-stack-lg">
            <h2 className="mb-stack-md text-headline-md text-primary">Overview</h2>
            <p className="text-body-lg text-on-surface-variant">{doc.intro}</p>
          </div>

          {doc.sections.map((s, si) => {
            if (s.component && SECTION_COMPONENTS[s.component]) {
              const Comp = SECTION_COMPONENTS[s.component];
              return <Comp key={`c-${si}`} />;
            }
            return (
            <div
              key={s.title}
              className="rounded-xl border border-outline-variant bg-white p-stack-lg"
            >
              <h2 className="mb-stack-md flex items-center gap-2 text-headline-md text-primary">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ background: doc.accent }}
                />
                {s.title}
              </h2>

              {s.body &&
                (Array.isArray(s.body) ? s.body : [s.body]).map((para, i) => (
                  <p
                    key={i}
                    className="mb-3 text-body-lg leading-relaxed text-on-surface-variant"
                  >
                    {para}
                  </p>
                ))}

              {s.image && (
                <div className="my-stack-md h-56 w-full overflow-hidden rounded-lg border border-outline-variant bg-surface-container">
                  <img
                    src={s.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {s.points && (
                <ul className="mt-2 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <MaterialIcon
                        name="check"
                        className="mt-0.5 text-[16px]"
                        style={{ color: doc.accent }}
                      />
                      <span className="text-body-md text-on-surface-variant">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {s.example && (
                <div
                  className="mt-stack-md rounded-lg border-l-4 p-stack-md"
                  style={{ borderColor: doc.accent, background: `${doc.accent}0f` }}
                >
                  <p
                    className="mb-1 flex items-center gap-1 text-label-md font-bold"
                    style={{ color: doc.accent }}
                  >
                    <MaterialIcon name="lightbulb" fill className="text-[16px]" />{" "}
                    Example
                  </p>
                  <p className="text-body-md text-on-surface">{s.example}</p>
                </div>
              )}
            </div>
            );
          })}

          {related.length > 0 && (
            <div className="rounded-xl border border-outline-variant bg-white p-stack-lg">
              <h2 className="mb-stack-md text-headline-md text-primary">
                Related modules
              </h2>
              <div className="flex flex-wrap gap-stack-sm">
                {related.map((m) => (
                  <Link
                    key={m.id}
                    to={`/module/${m.id}`}
                    className="flex items-center gap-2 rounded-full border border-outline-variant px-4 py-2 text-label-md text-primary transition-colors hover:border-secondary"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: m.accent }}
                    />
                    {m.code} · {m.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Read & agree — acknowledgement / e-signature (policies only) */}
          {doc.acknowledge && (
          <div className="rounded-xl border border-outline-variant bg-white p-stack-lg">
            <h2 className="mb-stack-md flex items-center gap-2 text-headline-md text-primary">
              <MaterialIcon name="draw" style={{ color: doc.accent }} />
              Acknowledgement
            </h2>
            {signed ? (
              <div className="flex items-start gap-3 rounded-lg bg-emerald-50 p-stack-md text-emerald-900">
                <MaterialIcon name="verified" fill className="text-emerald-600" />
                <div>
                  <p className="text-label-md">Signed by {signed.name}</p>
                  <p className="text-caption">
                    Recorded on {signed.date} · logged to the training-evidence
                    register.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p className="mb-stack-md text-body-md text-on-surface-variant">
                  This document requires a signed declaration. Confirm that you
                  have read and understood it — your acknowledgement is logged as
                  training evidence.
                </p>
                <label className="mb-stack-md flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    className="mt-1 h-5 w-5 accent-[var(--color-secondary)]"
                    style={{ accentColor: doc.accent }}
                  />
                  <span className="text-body-md text-on-surface">
                    I have read and understood the {doc.title}, and I commit to
                    complying with it.
                  </span>
                </label>
                <div className="flex flex-col gap-stack-md sm:flex-row sm:items-center">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-outline-variant bg-surface-container-low px-4 py-2.5 text-body-md focus:border-primary focus:outline-none sm:w-64"
                  />
                  <button
                    disabled={!checked || !name.trim()}
                    onClick={() =>
                      acknowledge({
                        id: docId,
                        title: doc.title,
                        name: name.trim(),
                        date: new Date().toISOString().slice(0, 10),
                      })
                    }
                    className="flex items-center justify-center gap-2 bg-primary px-6 py-2.5 text-label-md text-on-primary transition-transform hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <MaterialIcon name="draw" className="text-[18px]" /> Confirm &amp; sign
                  </button>
                </div>
              </>
            )}
          </div>
          )}
        </div>

        {/* Embedded source PDF */}
        {doc.pdf && (
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-xl border border-outline-variant bg-white p-stack-md">
              <div className="mb-2 flex items-center gap-2 text-label-md text-primary">
                <MaterialIcon name="picture_as_pdf" style={{ color: doc.accent }} />
                Signed source document
              </div>
              <iframe
                src={doc.pdf}
                title={doc.title}
                className="h-[70vh] w-full rounded-lg border border-outline-variant"
              />
            </div>
          </div>
        )}
      </div>

      {/* Continue through the readings, then back into the module */}
      {parent.to === "/library" && (
        <div className="mt-gutter flex flex-col items-center justify-between gap-stack-md border-t border-outline-variant pt-stack-md sm:flex-row">
          <Link
            to={ownerModule ? `/module/${ownerModule.id}` : "/library"}
            className="flex items-center gap-1 text-label-md text-on-surface-variant hover:text-primary"
          >
            <MaterialIcon name="arrow_back" className="text-[18px]" />
            {ownerModule ? `Back to ${ownerModule.code}: ${ownerModule.title}` : "All modules"}
          </Link>
          {nextInSeq ? (
            <Link
              to={`/library/${nextInSeq.slug}`}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-label-md text-on-primary transition-opacity hover:opacity-90"
            >
              Next reading ({seqIdx + 2}/{moduleSeq.length}): {nextInSeq.title.length > 28 ? nextInSeq.title.slice(0, 28) + "…" : nextInSeq.title}
              <MaterialIcon name="arrow_forward" className="text-[18px]" />
            </Link>
          ) : ownerModule ? (
            <Link
              to={`/module/${ownerModule.id}#practice`}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-container to-[#1c3a63] px-6 py-3 text-label-md font-bold text-white transition-all hover:brightness-110"
            >
              <MaterialIcon name="extension" className="text-[18px]" />
              Readings done — continue {ownerModule.code}: practice games
              <MaterialIcon name="arrow_forward" className="text-[18px]" />
            </Link>
          ) : (
            <Link
              to="/course"
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-label-md text-on-primary transition-opacity hover:opacity-90"
            >
              Back to the course <MaterialIcon name="arrow_forward" className="text-[18px]" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
