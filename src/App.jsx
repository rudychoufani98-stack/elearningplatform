import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CourseProvider } from "./CourseContext.jsx";
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

export default function App() {
  return (
    <ErrorBoundary>
      <CourseProvider>
        <Toast />
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
        <ScrollToTop />
        <Routes>
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
            <Route path="/capstone" element={<CapstonePage />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </CourseProvider>
    </ErrorBoundary>
  );
}
