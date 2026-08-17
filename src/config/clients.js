// ============================================================================
// WHITE-LABEL CLIENT CONFIG
// One entry per client. The active client is chosen AT BUILD TIME via the
// VITE_CLIENT env var (defaults to "hitech"). To launch the academy for a new
// client: add an entry here, then follow CLIENTS.md (new Supabase project +
// new Vercel project with VITE_CLIENT set). Same codebase, parallel platforms.
// ============================================================================

const CLIENTS = {
  hitech: {
    key: "hitech",
    // How the client is named across the platform
    clientShort: "HITECH",
    clientLegal: "HITECH Construction Company Limited — Builders & Civil Engineers",
    center: "Skykapital ESG Learning Center",
    series: "ESG Foundation Series",
    courseTitle: "Creating Our Sustainability Pathway",
    courseSubtitle: "Embrace the journey",
    // The client's signed Code of Conduct (PDF placed in public/docs/)
    codeOfConduct: {
      ref: "IMS-HSE-Pol-014 · Version 1 · April 2025",
      owner: "Approved by Dany Abboud, Managing Director",
      pdf: "/docs/hitech-code-of-conduct.pdf",
    },
  },

  // Example second client — duplicate this block to onboard a real one.
  demo: {
    key: "demo",
    clientShort: "Acme Construction",
    clientLegal: "Acme Construction Ltd.",
    center: "Skykapital ESG Learning Center",
    series: "ESG Foundation Series",
    courseTitle: "Our Sustainability Pathway",
    courseSubtitle: "Building responsibly",
    codeOfConduct: {
      ref: "Policy reference to be added",
      owner: "Approved by the Managing Director",
      pdf: null, // no PDF yet — the reading still works, download buttons hide
    },
  },
};

const requested = (import.meta.env.VITE_CLIENT || "hitech").toLowerCase();
export const client = CLIENTS[requested] ?? CLIENTS.hitech;
