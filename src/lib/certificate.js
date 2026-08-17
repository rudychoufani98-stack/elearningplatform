// Generates the official Skykapital certificate as a downloadable PDF.
// jsPDF is loaded on demand so it never weighs down the app bundle.

const NAVY = [13, 28, 50];
const GOLD = [201, 154, 46];
const GREY = [85, 96, 110];

export async function downloadCertificatePdf({
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
  const CX = W / 2;

  // Borders — navy frame with a gold inner keyline
  doc.setDrawColor(...NAVY).setLineWidth(1.4).rect(8, 8, 281, 194);
  doc.setDrawColor(...GOLD).setLineWidth(0.4).rect(12, 12, 273, 186);

  // Seal
  doc.setDrawColor(...GOLD).setLineWidth(0.8).circle(252, 44, 15);
  doc.setFont("helvetica", "bold").setFontSize(6.5).setTextColor(...GOLD);
  doc.text("SKYKAPITAL", 252, 42.5, { align: "center", charSpace: 0.6 });
  doc.text("VERIFIED", 252, 47.5, { align: "center", charSpace: 0.8 });

  // Brand
  doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(...GOLD);
  doc.text("SKYKAPITAL EUROPE", CX, 36, { align: "center", charSpace: 1.6 });

  // Title
  doc.setFont("times", "bold").setFontSize(30).setTextColor(...NAVY);
  doc.text("Certificate of Completion", CX, 52, { align: "center" });
  doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(...GREY);
  doc.text("ESG FOUNDATION SERIES", CX, 60, { align: "center", charSpace: 1.2 });

  // Learner name
  doc.setFont("times", "bold").setFontSize(26).setTextColor(...NAVY);
  doc.text(name || "—", CX, 84, { align: "center" });
  doc.setDrawColor(...GOLD).setLineWidth(0.5).line(CX - 42, 90, CX + 42, 90);

  // Body
  const body =
    `has successfully completed all ${totalModules} modules of ` +
    `“${courseTitle}” — including every assessment (80% pass mark) ` +
    `and the capstone simulation — delivered on the ${clientShort} platform.`;
  doc.setFont("times", "normal").setFontSize(12).setTextColor(60, 66, 76);
  const lines = doc.splitTextToSize(body, 170);
  doc.text(lines, CX, 102, { align: "center", lineHeightFactor: 1.5 });

  // Meta row
  const meta = [
    ["CERTIFICATE NO.", certNo, 60],
    ["DATE OF COMPLETION", date || "—", CX],
    ["ISSUED BY", "Skykapital Europe", 237],
  ];
  for (const [label, value, x] of meta) {
    doc.setFont("helvetica", "normal").setFontSize(7.5).setTextColor(...GREY);
    doc.text(label, x, 168, { align: "center", charSpace: 0.6 });
    doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(...NAVY);
    doc.text(String(value), x, 175, { align: "center" });
  }

  doc.save(`Skykapital-Certificate-${certNo}.pdf`);
}
