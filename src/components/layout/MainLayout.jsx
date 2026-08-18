import { Outlet, NavLink, useLocation } from "react-router-dom";
import TopNav from "./TopNav.jsx";
import SideNav from "./SideNav.jsx";
import Footer from "./Footer.jsx";
import MaterialIcon from "../MaterialIcon.jsx";

// Compact bottom navigation for phones (the side rail is desktop-only).
const MOBILE_ITEMS = [
  { to: "/", label: "Home", icon: "home", end: true },
  { to: "/course", label: "Course", icon: "school" },
  { to: "/resources", label: "Documents", icon: "folder_open" },
  { to: "/evidence", label: "Progress", icon: "verified" },
];

// App chrome for the dashboard / course / lesson / library screens.
export default function MainLayout() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-surface">
      <TopNav />
      <SideNav />
      <div className="flex min-h-screen flex-col pt-20 pb-16 md:pl-64 md:pb-0">
        {/* Re-keying by path gives each page a soft fade-in. */}
        <main key={pathname} className="animate-fade-up flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* Mobile bottom nav */}
      <nav className="glass-bar fixed bottom-0 left-0 right-0 z-40 flex border-t border-outline-variant/70 md:hidden">
        {MOBILE_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-semibold transition-colors ${
                isActive ? "text-primary" : "text-on-surface-variant"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <MaterialIcon
                  name={item.icon}
                  fill={isActive}
                  className={`text-[22px] ${isActive ? "text-secondary" : ""}`}
                />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
