import MaterialIcon from "./MaterialIcon.jsx";
import { useCourse } from "../CourseContext.jsx";

// Floating confirmation shown when a module is completed.
export default function Toast() {
  const { toast } = useCourse();
  if (!toast) return null;

  return (
    <div className="pointer-events-none fixed left-1/2 top-24 z-[100] -translate-x-1/2 px-4">
      <div
        key={toast.id}
        className="animate-toast flex items-center gap-3 rounded-xl border border-outline-variant bg-primary-container px-5 py-3 text-white shadow-xl"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
          <MaterialIcon name="check" className="text-[20px]" fill />
        </span>
        <span className="text-label-md">{toast.message}</span>
      </div>
    </div>
  );
}
