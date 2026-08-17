// The official Skykapital certificate, drawn natively as a PDF.
// jsPDF is loaded on demand so it never weighs down the app bundle.

const NAVY = [13, 28, 50];
const NAVY2 = [28, 58, 99];
const GOLD = [201, 154, 46];
const GOLD_SOFT = [226, 203, 148];
const GREY = [90, 100, 114];
const INK = [45, 52, 64];

// The exact Skykapital mark — a four-pointed CONCAVE star (same path as the
// app logo: corners pulled toward the centre with quadratic curves), drawn
// here with cubic beziers.
function star(doc, cx, cy, r, color) {
  const pts = [
    [-r, -r],
    [r, -r],
    [r, r],
    [-r, r],
  ];
  const segs = [];
  for (let i = 0; i < 4; i++) {
    const S = pts[i];
    const E = pts[(i + 1) % 4];
    // quadratic (control = centre) converted to cubic, relative to S
    segs.push([
      (-2 * S[0]) / 3,
      (-2 * S[1]) / 3,
      E[0] / 3 - S[0],
      E[1] / 3 - S[1],
      E[0] - S[0],
      E[1] - S[1],
    ]);
  }
  doc.setFillColor(...color);
  doc.lines(segs, cx + pts[0][0], cy + pts[0][1], [1, 1], "F", true);
}

function cornerOrnament(doc, x, y, dx, dy) {
  doc.setDrawColor(...GOLD).setLineWidth(0.9);
  doc.line(x, y, x + 16 * dx, y);
  doc.line(x, y, x, y + 16 * dy);
  doc.setLineWidth(0.35);
  doc.line(x + 2.5 * dx, y + 2.5 * dy, x + 11 * dx, y + 2.5 * dy);
  doc.line(x + 2.5 * dx, y + 2.5 * dy, x + 2.5 * dx, y + 11 * dy);
}

export async function buildCertificatePdf({
  name,
  certNo,
  date,
  courseTitle,
  clientShort,
  totalModules = 6,
}) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = 297;
  const H = 210;
  const CX = W / 2;

  // Paper
  doc.setFillColor(252, 251, 248).rect(0, 0, W, H, "F");

  // Top navy band + gold rule
  doc.setFillColor(...NAVY).rect(0, 0, W, 24, "F");
  doc.setFillColor(...NAVY2).rect(0, 22, W, 2, "F");
  doc.setFillColor(...GOLD).rect(0, 25, W, 1.1, "F");
  star(doc, 18, 12, 5.2, GOLD);
  doc.setFont("helvetica", "bold").setFontSize(13).setTextColor(255, 255, 255);
  doc.text("SKYKAPITAL EUROPE", 27, 14.4, { charSpace: 1.4 });
  doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(...GOLD_SOFT);
  // right-align manually: jsPDF's align:"right" ignores charSpace width
  const label = "ESG FOUNDATION SERIES";
  const labelW = doc.getTextWidth(label) + (label.length - 1) * 1.2;
  doc.text(label, W - 16 - labelW, 14, { charSpace: 1.2 });

  // Bottom navy band + gold rule
  doc.setFillColor(...GOLD).rect(0, H - 15.6, W, 1.1, "F");
  doc.setFillColor(...NAVY).rect(0, H - 14, W, 14, "F");
  doc.setFont("helvetica", "normal").setFontSize(7.5).setTextColor(210, 216, 226);
  doc.text(
    `Certificate no. ${certNo}  •  Registered in the Skykapital central training record  •  Verification: quote this number to Skykapital Europe`,
    CX,
    H - 6,
    { align: "center", charSpace: 0.4 }
  );

  // Corner ornaments
  cornerOrnament(doc, 14, 34, 1, 1);
  cornerOrnament(doc, W - 14, 34, -1, 1);
  cornerOrnament(doc, 14, H - 22, 1, -1);
  cornerOrnament(doc, W - 14, H - 22, -1, -1);

  // Heading
  doc.setFont("times", "bold").setFontSize(46).setTextColor(...NAVY);
  doc.text("CERTIFICATE", CX, 58, { align: "center", charSpace: 1.2 });
  doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(...GOLD);
  doc.text("OF COMPLETION", CX, 66.5, { align: "center", charSpace: 4 });

  // Presented to
  doc.setFont("times", "italic").setFontSize(12.5).setTextColor(...GREY);
  doc.text("This certificate is proudly presented to", CX, 82, { align: "center" });

  // Name + underline with center diamond
  doc.setFont("times", "bolditalic").setFontSize(34).setTextColor(...NAVY);
  doc.text(name || "—", CX, 97, { align: "center" });
  doc.setDrawColor(...GOLD).setLineWidth(0.6);
  doc.line(CX - 55, 103, CX - 3, 103);
  doc.line(CX + 3, 103, CX + 55, 103);
  star(doc, CX, 103, 2.2, GOLD);

  // Body
  const body =
    `for successfully completing all ${totalModules} modules of ` +
    `“${courseTitle}” — passing every assessment with a minimum of 80% ` +
    `and the final capstone simulation — on the ${clientShort} learning platform.`;
  doc.setFont("times", "normal").setFontSize(12.5).setTextColor(...INK);
  const lines = doc.splitTextToSize(body, 165);
  doc.text(lines, CX, 114, { align: "center", lineHeightFactor: 1.55 });

  // Seal (center) — double ring + star
  const sy = 155;
  doc.setDrawColor(...GOLD).setLineWidth(1).circle(CX, sy, 15);
  doc.setLineWidth(0.35).circle(CX, sy, 12.8);
  star(doc, CX, sy, 7.5, GOLD);

  // Signature (left) and date (right)
  const colY = 162;
  doc.setDrawColor(...NAVY).setLineWidth(0.4);
  doc.line(40, colY, 105, colY);
  doc.line(W - 105, colY, W - 40, colY);
  doc.setFont("times", "italic").setFontSize(15).setTextColor(...NAVY);
  doc.text("Skykapital Europe", 72.5, colY - 3.5, { align: "center" });
  doc.setFont("helvetica", "bold").setFontSize(12).setTextColor(...NAVY);
  doc.text(date || "—", W - 72.5, colY - 3.5, { align: "center" });
  doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(...GREY);
  doc.text("MANAGING DIRECTOR • SKYKAPITAL EUROPE", 72.5, colY + 5.5, {
    align: "center",
    charSpace: 0.6,
  });
  doc.text("DATE OF COMPLETION", W - 72.5, colY + 5.5, {
    align: "center",
    charSpace: 0.6,
  });

  return doc;
}

export async function downloadCertificatePdf(opts) {
  const doc = await buildCertificatePdf(opts);
  doc.save(`Skykapital-Certificate-${opts.certNo}.pdf`);
}
