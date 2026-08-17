// The user's approved certificate mockup, reproduced verbatim as an app page
// (the popup CSP blocks CDN scripts, so the mockup's Tailwind classes are
// compiled here by the project build instead). Opened by the admin console's
// "Print" button with ?name=&course=&date= query params.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SKYKAPITAL_LOGO } from "../assets/skykapitalLogoB64.js";

const SS4 = { fontFamily: "'Source Serif 4', Georgia, serif" };
const MANROPE = { fontFamily: "Manrope, Arial, sans-serif" };

export default function CertificatePrintPage() {
  const params = new URLSearchParams(useLocation().search);
  const name = params.get("name") || "—";
  const course = params.get("course") || "";
  const date = params.get("date") || "";

  useEffect(() => {
    document.title = "Skykapital Certificate";
    // Load the mockup's fonts, then print once they are ready.
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Manrope:ital,wght@0,400;0,500;0,700&family=Source+Serif+4:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap";
    document.head.appendChild(link);
    const t = setTimeout(() => {
      document.fonts.ready.then(() => window.print());
    }, 600);
    return () => {
      clearTimeout(t);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edeeef] p-8 md:p-16 text-[#191c1d] print:bg-white print:p-0" style={MANROPE}>
      <style>{`@page { size: A4 landscape; margin: 0; }`}</style>

      {/* Certificate Container */}
      <div className="relative w-full max-w-[1100px] aspect-[1.414] bg-white shadow-[0_20px_60px_rgba(0,27,61,0.08)] flex flex-col items-center p-12 overflow-hidden print:shadow-none print:max-w-none print:w-[297mm] print:h-[210mm] print:aspect-auto print:m-0 print:p-8">
        {/* Elegant Borders */}
        <div className="absolute inset-8 border-[3px] border-[#775a19] pointer-events-none"></div>
        <div className="absolute inset-[40px] border border-[#775a19] opacity-40 pointer-events-none"></div>
        {/* Corner Ornaments */}
        <div className="absolute top-6 left-6 w-8 h-8 border-t-[3px] border-l-[3px] border-[#775a19] pointer-events-none"></div>
        <div className="absolute top-6 right-6 w-8 h-8 border-t-[3px] border-r-[3px] border-[#775a19] pointer-events-none"></div>
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b-[3px] border-l-[3px] border-[#775a19] pointer-events-none"></div>
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-[3px] border-r-[3px] border-[#775a19] pointer-events-none"></div>

        {/* Content Inner */}
        <div className="relative z-10 flex flex-col items-center justify-between h-full w-full pt-8 pb-4 text-center">
          {/* Header Section */}
          <div className="flex flex-col items-center space-y-6">
            <img alt="Skykapital Logo" className="h-16 md:h-20 object-contain mix-blend-multiply" src={SKYKAPITAL_LOGO} />
            <div className="space-y-4 pt-6">
              <h1 className="text-[48px] leading-[1.1] font-semibold uppercase tracking-[0.1em] text-[#001b3d]" style={SS4}>
                Certificate of Achievement
              </h1>
              <p className="text-[18px] leading-[1.6] text-[#775a19] italic tracking-wide">This is to certify that</p>
            </div>
          </div>

          {/* Recipient Section */}
          <div className="flex flex-col items-center justify-center flex-grow py-12 w-full max-w-3xl">
            <div className="w-full border-b border-[#c4c6cf] pb-2 mb-6">
              <h2 className="text-[48px] leading-[1.1] text-[#001b3d] italic font-medium" style={SS4}>
                {name}
              </h2>
            </div>
            <p className="text-[24px] leading-relaxed text-[#44474e] mt-4 max-w-2xl" style={SS4}>
              Has successfully completed the
              <br />
              <span className="font-bold text-[#001b3d]">{course}</span>
            </p>
          </div>

          {/* Footer Section */}
          <div className="w-full flex justify-between items-end px-12 md:px-24 pb-8 relative">
            {/* Date Block */}
            <div className="flex flex-col items-center w-48 text-center">
              <div className="w-full border-b border-[#001b3d] mb-3 h-8 flex items-end justify-center">
                <span className="text-[14px] font-bold text-[#001b3d]">{date}</span>
              </div>
              <span className="text-[12px] text-[#001b3d] uppercase tracking-widest font-bold">Date</span>
            </div>
            {/* Signature Block */}
            <div className="flex flex-col items-center w-64 text-center">
              <div className="w-full border-b border-[#001b3d] mb-3 h-8"></div>
              <span className="text-[12px] text-[#001b3d] uppercase tracking-widest font-bold">Authorized Signatory</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
