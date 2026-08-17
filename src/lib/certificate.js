// The official Skykapital certificate — exact match of the approved mockup:
// Source Serif 4 typography (embedded), mockup colors (#001b3d navy,
// #775a19 bronze, #44474e grey), bronze double border with corner
// ornaments, small centred logo, DATE and AUTHORIZED SIGNATORY blocks.
// jsPDF + fonts are loaded on demand so they never weigh down the app bundle.

const BRONZE = [119, 90, 25]; // #775a19  (mockup "secondary")
const BRONZE_LIGHT = [201, 189, 163]; // bronze at 40% on white (inner border)
const NAVY = [0, 27, 61]; // #001b3d  (mockup "primary-container")
const GREY = [68, 71, 78]; // #44474e  (mockup "on-surface-variant")
const LINE_GREY = [196, 198, 207]; // #c4c6cf (mockup "outline-variant")

// jsPDF's align:"center" ignores charSpace, so letterspaced text must be
// centred by hand.
function centered(doc, str, cx, y, cs) {
  const w = doc.getTextWidth(str) + (str.length - 1) * cs;
  doc.text(str, cx - w / 2, y, { charSpace: cs });
}

export async function buildCertificatePdf({
  name,
  certNo,
  date,
  courseTitle,
  clientShort,
  totalModules = 6,
}) {
  const [{ jsPDF }, logo, fonts] = await Promise.all([
    import("jspdf"),
    import("../assets/skykapitalLogoB64.js"),
    import("../assets/certFonts.js"),
  ]);
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = 297;
  const H = 210;
  const CX = W / 2;

  // Real mockup typography: Source Serif 4
  doc.addFileToVFS("SS4-Semibold.ttf", fonts.SS4_SEMIBOLD);
  doc.addFont("SS4-Semibold.ttf", "SS4", "semibold");
  doc.addFileToVFS("SS4-It.ttf", fonts.SS4_ITALIC);
  doc.addFont("SS4-It.ttf", "SS4", "italic");
  doc.addFileToVFS("SS4-Regular.ttf", fonts.SS4_REGULAR);
  doc.addFont("SS4-Regular.ttf", "SS4", "normal");
  doc.addFileToVFS("SS4-Bold.ttf", fonts.SS4_BOLD);
  doc.addFont("SS4-Bold.ttf", "SS4", "bold");

  // Verification data lives in the PDF metadata (not on the visual design)
  doc.setProperties({
    title: `Skykapital Certificate ${certNo}`,
    subject: `Certificate of Achievement — ${courseTitle} (${clientShort}, ${totalModules} modules, issued ${date})`,
    author: "Skykapital Europe",
    keywords: certNo,
  });

  // Paper
  doc.setFillColor(255, 255, 255).rect(0, 0, W, H, "F");

  // Corner ornaments at the very corners
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

  // Small centred logo (512x256 → 2:1)
  const lw = 44;
  doc.addImage(logo.SKYKAPITAL_LOGO, "PNG", CX - lw / 2, 20, lw, lw / 2);

  // Title — 48px semibold, 0.1em tracking (mockup display-lg)
  doc.setFont("SS4", "semibold").setFontSize(36).setTextColor(...NAVY);
  centered(doc, "CERTIFICATE OF ACHIEVEMENT", CX, 67, 1.27);
  doc.setFont("SS4", "italic").setFontSize(13.5).setTextColor(...BRONZE);
  doc.text("This is to certify that", CX, 79, { align: "center" });

  // Recipient name over a thin rule
  doc.setFont("SS4", "italic").setFontSize(36).setTextColor(...NAVY);
  doc.text(name || "—", CX, 112, { align: "center" });
  doc.setDrawColor(...LINE_GREY).setLineWidth(0.3);
  doc.line(CX - 105, 118.5, CX + 105, 118.5);

  // Program
  doc.setFont("SS4", "normal").setFontSize(18).setTextColor(...GREY);
  doc.text("Has successfully completed the", CX, 136, { align: "center" });
  doc.setFont("SS4", "bold").setFontSize(18).setTextColor(...NAVY);
  doc.text(doc.splitTextToSize(courseTitle, 220), CX, 147, { align: "center" });

  // Footer — date (left, narrower) and signature (right, wider) like the mockup
  const lineY = 179;
  doc.setDrawColor(...NAVY).setLineWidth(0.35);
  doc.line(38, lineY, 91, lineY);
  doc.line(W - 109, lineY, W - 38, lineY);
  doc.setFont("helvetica", "bold").setFontSize(10).setTextColor(...NAVY);
  doc.text(date || "", 64.5, lineY - 2.5, { align: "center" });
  doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(...NAVY);
  centered(doc, "DATE", 64.5, lineY + 6.5, 0.35);
  centered(doc, "AUTHORIZED SIGNATORY", W - 73.5, lineY + 6.5, 0.35);

  return doc;
}

export async function downloadCertificatePdf(opts) {
  const doc = await buildCertificatePdf(opts);
  doc.save(`Skykapital-Certificate-${opts.certNo}.pdf`);
}
