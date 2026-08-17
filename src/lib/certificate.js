// The official Skykapital certificate — light classic design: bronze double
// border, corner ornaments, real Skykapital logo, serif typography.
// jsPDF is loaded on demand so it never weighs down the app bundle.

const BRONZE = [119, 90, 25]; // #775a19
const BRONZE_LIGHT = [201, 189, 163]; // bronze at 40% on white
const NAVY = [0, 27, 61]; // #001b3d
const GREY = [68, 71, 78]; // #44474e
const LINE_GREY = [196, 198, 207]; // #c4c6cf

export async function buildCertificatePdf({
  name,
  certNo,
  date,
  courseTitle,
  clientShort,
  totalModules = 6,
}) {
  const [{ jsPDF }, logo] = await Promise.all([
    import("jspdf"),
    import("../assets/skykapitalLogoB64.js"),
  ]);
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = 297;
  const H = 210;
  const CX = W / 2;

  // Paper
  doc.setFillColor(255, 255, 255).rect(0, 0, W, H, "F");

  // Corner ornaments (outside the main frame)
  const arm = 9;
  doc.setDrawColor(...BRONZE).setLineWidth(1);
  doc.line(6.5, 6.5, 6.5 + arm, 6.5);
  doc.line(6.5, 6.5, 6.5, 6.5 + arm);
  doc.line(W - 6.5, 6.5, W - 6.5 - arm, 6.5);
  doc.line(W - 6.5, 6.5, W - 6.5, 6.5 + arm);
  doc.line(6.5, H - 6.5, 6.5 + arm, H - 6.5);
  doc.line(6.5, H - 6.5, 6.5, H - 6.5 - arm);
  doc.line(W - 6.5, H - 6.5, W - 6.5 - arm, H - 6.5);
  doc.line(W - 6.5, H - 6.5, W - 6.5, H - 6.5 - arm);

  // Elegant double border
  doc.setDrawColor(...BRONZE).setLineWidth(0.9).rect(9.5, 9.5, W - 19, H - 19);
  doc.setDrawColor(...BRONZE_LIGHT).setLineWidth(0.25).rect(12, 12, W - 24, H - 24);

  // Logo (512x256 → keep 2:1 ratio)
  const lw = 52;
  const lh = 26;
  doc.addImage(logo.SKYKAPITAL_LOGO, "PNG", CX - lw / 2, 20, lw, lh);

  // Title
  doc.setFont("times", "bold").setFontSize(28).setTextColor(...NAVY);
  doc.text("CERTIFICATE OF ACHIEVEMENT", CX, 66, { align: "center", charSpace: 2 });
  doc.setFont("times", "italic").setFontSize(13).setTextColor(...BRONZE);
  doc.text("This is to certify that", CX, 78, { align: "center" });

  // Recipient name over a thin rule
  doc.setFont("times", "italic").setFontSize(32).setTextColor(...NAVY);
  doc.text(name || "—", CX, 100, { align: "center" });
  doc.setDrawColor(...LINE_GREY).setLineWidth(0.3);
  doc.line(CX - 85, 106, CX + 85, 106);

  // Program
  doc.setFont("times", "normal").setFontSize(15).setTextColor(...GREY);
  doc.text("Has successfully completed the", CX, 121, { align: "center" });
  doc.setFont("times", "bold").setFontSize(16).setTextColor(...NAVY);
  doc.text(doc.splitTextToSize(courseTitle, 210), CX, 130, { align: "center" });
  doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(...GREY);
  doc.text(
    `All ${totalModules} modules completed  ·  assessments passed at 80% minimum  ·  ${clientShort} learning platform`,
    CX,
    142,
    { align: "center" }
  );

  // Footer — date (left) and signature (right)
  const lineY = 170;
  doc.setDrawColor(...NAVY).setLineWidth(0.35);
  doc.line(45, lineY, 105, lineY);
  doc.line(W - 105, lineY, W - 45, lineY);
  doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(...NAVY);
  doc.text(date || "—", 75, lineY - 3, { align: "center" });
  doc.setFont("helvetica", "bold").setFontSize(7.5).setTextColor(...NAVY);
  doc.text("DATE", 75, lineY + 6, { align: "center", charSpace: 2 });
  doc.text("AUTHORIZED SIGNATORY", W - 75, lineY + 6, { align: "center", charSpace: 2 });

  // Verification line
  doc.setFont("helvetica", "normal").setFontSize(7).setTextColor(...GREY);
  doc.text(
    `Certificate no. ${certNo}  ·  Registered in the Skykapital central training record  ·  Verification: quote this number to Skykapital Europe`,
    CX,
    193,
    { align: "center" }
  );

  return doc;
}

export async function downloadCertificatePdf(opts) {
  const doc = await buildCertificatePdf(opts);
  doc.save(`Skykapital-Certificate-${opts.certNo}.pdf`);
}
