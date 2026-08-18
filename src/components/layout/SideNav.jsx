import { NavLink, useNavigate } from "react-router-dom";
import MaterialIcon from "../MaterialIcon.jsx";
import { platform, course } from "../../data.js";
import { useCourse } from "../../CourseContext.jsx";

// Four entries, plain words. The capstone is the last step of the course
// (module 6) and the library is reachable from Documents — no duplicate
// shortcuts in the menu.
const NAV_ITEMS = [
  { to: "/", label: "Home", icon: "home", end: true },
  { to: "/course", label: "My course", icon: "school" },
  { to: "/resources", label: "Documents", icon: "folder_open" },
  { to: "/evidence", label: "My progress", icon: "verified" },
];

// Fixed left rail (desktop only). Active route gets the gold right border.
export default function SideNav() {
  const navigate = useNavigate();
  const { modules } = useCourse();

  function continueLearning() {
    const next =
      modules.find((m) => m.status === "in_progress") ||
      modules.find((m) => m.status === "not_started") ||
      modules[0];
    navigate(`/module/${next.id}`);
  }

  return (
    <aside className="fixed bottom-0 left-0 top-20 z-40 hidden w-64 flex-col border-r border-outline-variant/70 bg-surface-container-lowest/80 py-stack-lg backdrop-blur-sm md:flex">
      <div className="mb-stack-lg px-6">
        <h2 className="text-headline-md font-bold text-primary">
          Sustainability Pathway
        </h2>
        <p className="text-caption text-on-surface-variant">{platform.series}</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-xl px-4 py-3 text-label-md transition-all active:scale-[0.98] ${
                isActive
                  ? "bg-primary-container font-bold text-white shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-secondary" />
                )}
                <MaterialIcon
                  name={item.icon}
                  fill={isActive}
                  className={isActive ? "text-secondary" : ""}
                />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-4">
        <button
          onClick={continueLearning}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-container to-[#1c3a63] py-4 text-label-md font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110 active:scale-[0.98]"
        >
          <span>Continue Learning</span>
          <MaterialIcon name="arrow_forward" />
        </button>
      </div>
    </aside>
  );
}
