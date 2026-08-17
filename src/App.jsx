import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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

// Jump back to the top on every route change (SPAs otherwise keep the old
// scroll position, which feels broken when "changing page").
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Cover every scroll container the browser might use.
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
}

// Everything behind the sign-in wall when auth is enabled.
function Gate({ children }) {
  const { enabled, loading, session, profile } = useAuth();
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
  // Admins have a dedicated console — no access to the learning side.
  if (profile?.role === "admin") return <AdminPage standalone />;
  return children;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
      <CourseProvider>
        <Toast />
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
        </Routes>
        </Gate>
        </BrowserRouter>
      </CourseProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
