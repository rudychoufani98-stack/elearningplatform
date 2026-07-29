import Logo from "../Logo.jsx";
import { platform } from "../../data.js";

const LINKS = ["Privacy Policy", "Terms of Service", "Support", "Institutional Login"];

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-stack-md bg-primary-container px-margin-mobile py-stack-lg text-on-primary-container md:flex-row md:px-margin-desktop">
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center gap-2.5 md:justify-start">
          <Logo className="h-7 w-7 text-white" />
          <span className="text-headline-md font-bold text-white">
            {platform.brand}
          </span>
        </div>
        <p className="mt-1 text-caption text-on-primary-fixed-variant">
          © 2026 {platform.brand}. All rights reserved.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
        {LINKS.map((l) => (
          <a
            key={l}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-caption text-on-primary-fixed-variant transition-colors hover:text-white"
          >
            {l}
          </a>
        ))}
      </div>
    </footer>
  );
}
