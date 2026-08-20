import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CourseProvider } from "./CourseContext.jsx";
import { AuthProvider, useAuth } from "./AuthContext.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ResetPage from "./pages/ResetPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Toast from "./components/Toast.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import LessonPage from "./pages/LessonPage.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import DocumentPage from "./pages/DocumentPage.jsx";
import ResourcesPage from "./pages/ResourcesPage.jsx";
import EvidencePage from "./pages/EvidencePage.jsx";
import CapstonePage from "./pages/CapstonePage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import CertificatePrintPage from "./pages/CertificatePrintPage.jsx";

// Jump back to the top on every route change (SPAs otherwise keep the old
// scroll position, which feels broken when "changing page").
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Links like /module/m1#practice land on their section, not the top.
      // The global smooth-scroll CSS freezes programmatic scrolling, so it
      // is switched off for the jump.
      const t = setTimeout(() => {
        const el = document.querySelector(hash);
        if (!el) return;
        const prev = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        el.scrollIntoView({ block: "start", behavior: "auto" });
        document.documentElement.style.scrollBehavior = prev;
      }, 250);
      return () => clearTimeout(t);
    }
    // Cover every scroll container the browser might use.
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash]);
  return null;
}

// Everything behind the sign-in wall when auth is enabled.
function Gate({ children }) {
  const { enabled, loading, session, profile } = useAuth();
  const { pathname } = useLocation();
  if (!enabled) return children; // local demo mode — no auth configured
  if (loading)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-surface">
        <span className="animate-pop flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-container to-[#1c3a63] shadow-lg">
          <svg viewBox="0 0 24 24" className="h-8 w-8 animate-pulse text-white" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
          </svg>
        </span>
        <p className="text-caption font-bold uppercase tracking-widest text-on-surface-variant">
          Skykapital Academy
        </p>
      </div>
    );
  if (!session) return <LoginPage />;
  // Print-ready certificate view (opened by the admin console's Print button)
  if (pathname === "/certificate-print") return <CertificatePrintPage />;
  // Admins have a dedicated console — no access to the learning side.
  if (profile?.role === "admin") return <AdminPage standalone />;
  return children;
}

// Detects when a newer version of the platform has been deployed and offers a
// one-click refresh — so nobody keeps working on stale code without knowing.
function UpdateBanner() {
  const [stale, setStale] = useState(false);
  useEffect(() => {
    const current = document
      .querySelector('script[type="module"][src*="/assets/"]')
      ?.getAttribute("src");
    if (!current) return; // local dev — no hashed bundle
    let stopped = false;
    async function check() {
      try {
        const res = await fetch("/?v=" + Date.now(), { cache: "no-store" });
        const html = await res.text();
        const m = html.match(/assets\/index-[^"]+\.js/);
        if (!stopped && m && !current.includes(m[0])) setStale(true);
      } catch {
        /* offline — try again later */
      }
    }
    const t = setInterval(check, 120000);
    const onVis = () => {
      if (document.visibilityState === "visible") check();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stopped = true;
      clearInterval(t);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  if (!stale) return null;
  return (
    <div className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#0d1c32] py-2.5 pl-5 pr-2.5 text-white shadow-2xl">
      <span className="text-label-md">A new version of the platform is available</span>
      <button
        onClick={() => window.location.reload()}
        className="rounded-full bg-secondary-container px-4 py-1.5 text-label-md font-bold text-on-secondary-container transition-transform hover:opacity-90 active:scale-95"
      >
        Refresh
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
      <CourseProvider>
        <Toast />
        <UpdateBanner />
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
        <ScrollToTop />
        <Gate>
        <Routes>
          {/* Password reset (from the email link) */}
          <Route path="/reset" element={<ResetPage />} />

          {/* Focused assessment — no side/top app chrome */}
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/:moduleId" element={<QuizPage />} />

          {/* Everything else uses the app shell */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/module/:id" element={<LessonPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/library/:docId" element={<DocumentPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:docId" element={<DocumentPage />} />
            <Route path="/evidence" element={<EvidencePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/capstone" element={<CapstonePage />} />
          </Route>

          {/* Any unknown address goes home instead of a blank page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Gate>
        </BrowserRouter>
      </CourseProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
