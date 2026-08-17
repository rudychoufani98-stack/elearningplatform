// The official Skykapital certificate — exact match of the approved mockup:
// white paper, bronze double border with corner ornaments, small centred
// logo, large serif title, italic name over a thin rule, DATE and
// AUTHORIZED SIGNATORY blocks. Nothing else on the page.
// jsPDF is loaded on demand so it never weighs down the app bundle.

const BRONZE = [119, 90, 25]; // #775a19
const BRONZE_LIGHT = [201, 189, 163]; // bronze at 40% on white
const NAVY = [0, 27, 61]; // #001b3d
const GREY = [68, 71, 78]; // #44474e
const LINE_GREY = [196, 198, 207]; // #c4c6cf

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
  const [{ jsPDF }, logo] = await Promise.all([
    import("jspdf"),
    import("../assets/skykapitalLogoB64.js"),
  ]);
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = 297;
  const H = 210;
  const CX = W / 2;

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
  const lw = 40;
  doc.addImage(logo.SKYKAPITAL_LOGO, "PNG", CX - lw / 2, 20, lw, lw / 2);

  // Title — large, wide letterspacing
  doc.setFont("times", "bold").setFontSize(30).setTextColor(...NAVY);
  centered(doc, "CERTIFICATE OF ACHIEVEMENT", CX, 65, 2.4);
  doc.setFont("times", "italic").setFontSize(11.5).setTextColor(...BRONZE);
  doc.text("This is to certify that", CX, 77, { align: "center" });

  // Recipient name over a thin rule
  doc.setFont("times", "italic").setFontSize(34).setTextColor(...NAVY);
  doc.text(name || "—", CX, 110, { align: "center" });
  doc.setDrawColor(...LINE_GREY).setLineWidth(0.3);
  doc.line(CX - 100, 117, CX + 100, 117);

  // Program
  doc.setFont("times", "normal").setFontSize(15).setTextColor(...GREY);
  doc.text("Has successfully completed the", CX, 134, { align: "center" });
  doc.setFont("times", "bold").setFontSize(16).setTextColor(...NAVY);
  doc.text(doc.splitTextToSize(courseTitle, 210), CX, 144, { align: "center" });

  // Footer — date (left) and signature (right), nothing else
  const lineY = 177;
  doc.setDrawColor(...NAVY).setLineWidth(0.35);
  doc.line(39, lineY, 90, lineY);
  doc.line(W - 90, lineY, W - 39, lineY);
  doc.setFont("helvetica", "bold").setFontSize(10).setTextColor(...NAVY);
  doc.text(date || "", 64.5, lineY - 2.5, { align: "center" });
  doc.setFont("helvetica", "bold").setFontSize(7.5).setTextColor(...NAVY);
  centered(doc, "DATE", 64.5, lineY + 6, 1.8);
  centered(doc, "AUTHORIZED SIGNATORY", W - 64.5, lineY + 6, 1.8);

  return doc;
}

export async function downloadCertificatePdf(opts) {
  const doc = await buildCertificatePdf(opts);
  doc.save(`Skykapital-Certificate-${opts.certNo}.pdf`);
}
