import { NavLink } from "react-router-dom";
import Icon from "../ui/Icon";

export default function TopNav({ command }) {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#10141a]/40 px-5 py-3 backdrop-blur-xl md:px-8">
      <NavLink
        to="/"
        className="font-headline text-lg font-bold uppercase tracking-[-0.04em] text-[#e9feff] md:text-xl"
      >
        ARCHITECT_OS
      </NavLink>
      <div className="flex items-center gap-4">
        {command ? (
          <div className="hidden rounded-lg border-l-2 border-secondary bg-surface-container-lowest px-4 py-1.5 md:block">
            <span className="font-mono text-xs text-secondary-fixed-dim">
              {command}
            </span>
          </div>
        ) : null}
        <button
          className="text-[#dfe2eb]/60 transition-colors hover:text-[#00f5ff] active:scale-95"
          type="button"
          aria-label="Open terminal"
        >
          <Icon name="terminal" />
        </button>
        <button
          className="text-[#dfe2eb]/60 transition-colors hover:text-[#00f5ff] active:scale-95"
          type="button"
          aria-label="Open settings"
        >
          <Icon name="settings" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-b from-[#181c22] to-transparent" />
    </nav>
  );
}
