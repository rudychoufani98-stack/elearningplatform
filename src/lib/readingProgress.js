// Tracks which Library readings (the course documents) have been opened,
// per browser. The module page uses this to enforce the order:
// read the course → play the games → pass the quiz.
const KEY = "skykapital-docs-read";

export function docsRead() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function markDocRead(docId) {
  try {
    const cur = docsRead();
    if (!cur.includes(docId)) {
      localStorage.setItem(KEY, JSON.stringify([...cur, docId]));
    }
  } catch {
    /* private mode — reading just isn't remembered */
  }
}
