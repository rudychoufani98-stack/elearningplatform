import { Link } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon.jsx";
import { resourceCategories } from "../data.js";

// "Resources" — company policies & official documents, grouped by category.
// Items with real content link to their in-app reading; others are placeholders.
export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-margin-mobile py-stack-lg md:px-margin-desktop">
      <nav className="mb-stack-md flex items-center gap-2 text-caption text-outline">
        <Link to="/" className="hover:text-primary">
          Dashboard
        </Link>
        <MaterialIcon name="chevron_right" className="text-[14px]" />
        <span className="text-on-surface">Resources</span>
      </nav>

      <h1 className="mb-2 text-headline-lg text-primary md:text-headline-xl">
        Resources
      </h1>
      <p className="mb-stack-lg max-w-2xl text-body-lg text-on-surface-variant">
        Company policies and official documents — read them in-app or download
        the signed source. Your acknowledgements are logged as training evidence.
      </p>

      <div className="space-y-stack-lg">
        {resourceCategories.map((cat) => (
          <section key={cat.title}>
            <h2 className="mb-stack-md flex items-center gap-2 text-label-md font-bold uppercase tracking-widest text-outline">
              {cat.title}
              <span className="h-px flex-1 bg-outline-variant" />
            </h2>
            <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((item) => {
                const available = Boolean(item.doc);
                const Wrapper = available ? Link : "div";
                const wrapperProps = available
                  ? { to: `/resources/${item.doc}` }
                  : {};
                return (
                  <Wrapper
                    key={item.title}
                    {...wrapperProps}
                    className={`group flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg shadow-sm ${
                      available ? "lift" : "opacity-80"
                    }`}
                  >
                    <div className="mb-stack-md flex items-center justify-between">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-lg text-white transition-transform group-hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${item.accent}, #0d1c32)`,
                        }}
                      >
                        <MaterialIcon name={item.icon} />
                      </div>
                      {available ? (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-caption font-semibold text-emerald-800">
                          <MaterialIcon
                            name="check_circle"
                            fill
                            className="text-[14px]"
                          />
                          Available
                        </span>
                      ) : (
                        <span className="rounded-full bg-surface-container-high px-2.5 py-1 text-caption font-semibold text-on-surface-variant">
                          Coming soon
                        </span>
                      )}
                    </div>
                    <h3 className="text-headline-md text-primary">{item.title}</h3>
                    <p className="mt-2 flex-1 text-body-md text-on-surface-variant">
                      {item.note}
                    </p>
                    <span
                      className={`mt-stack-md flex items-center gap-1 self-start text-label-md ${
                        available
                          ? "text-secondary group-hover:underline"
                          : "text-outline"
                      }`}
                    >
                      {available ? "Read document" : "Not yet uploaded"}
                      {available && (
                        <MaterialIcon
                          name="arrow_forward"
                          className="text-sm transition-transform group-hover:translate-x-1"
                        />
                      )}
                    </span>
                  </Wrapper>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
