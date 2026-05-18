import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "../ui/Icon";

const terminalCommands = [
  {
    command: "open /profile",
    detail: "load profile shell",
    icon: "person",
    path: "/profile",
    type: "route",
  },
  {
    command: "open /projects",
    detail: "inspect deployed work",
    icon: "code",
    path: "/projects",
    type: "route",
  },
  {
    command: "open /contact",
    detail: "establish connection",
    icon: "sensors",
    path: "/contact",
    type: "route",
  },
  {
    command: "download cv",
    detail: "fetch resume packet",
    icon: "download",
    path: "/BuiChiBao-Fullstack-Developer.pdf",
    type: "download",
  },
];

function ToggleRow({ checked, label, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-surface-container-low/70 px-3 py-2 transition-colors hover:bg-surface-container">
      <span className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant">
        {label}
      </span>
      <input
        checked={checked}
        className="peer sr-only"
        onChange={onChange}
        type="checkbox"
      />
      <span
        className={`relative h-5 w-9 rounded-full ring-1 transition-colors ${
          checked
            ? "bg-primary-container/25 ring-primary-container/40"
            : "bg-surface-container-highest ring-outline-variant/20"
        }`}
      >
        <span
          className={`absolute left-1 top-1 h-3 w-3 rounded-full transition-transform ${
            checked
              ? "translate-x-4 bg-primary-container"
              : "bg-on-surface-variant"
          }`}
        />
      </span>
    </label>
  );
}

export default function TopNav({ command }) {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState(null);
  const [settings, setSettings] = useState({
    neonGlow: true,
    reduceMotion: false,
    scanlines: true,
  });

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.scanlines = settings.scanlines ? "on" : "off";
    root.dataset.neonGlow = settings.neonGlow ? "on" : "off";
    root.dataset.reduceMotion = settings.reduceMotion ? "on" : "off";
  }, [settings]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setActivePanel(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function toggleSetting(key) {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function runCommand(item) {
    setActivePanel(null);

    if (item.type === "download") {
      const link = document.createElement("a");
      link.href = item.path;
      link.download = "BuiChiBao-Fullstack-Developer.pdf";
      link.click();
      return;
    }

    navigate(item.path);
  }

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
          aria-expanded={activePanel === "terminal"}
          onClick={() =>
            setActivePanel((current) =>
              current === "terminal" ? null : "terminal",
            )
          }
        >
          <Icon name="terminal" />
        </button>
        <button
          className="text-[#dfe2eb]/60 transition-colors hover:text-[#00f5ff] active:scale-95"
          type="button"
          aria-label="Open settings"
          aria-expanded={activePanel === "settings"}
          onClick={() =>
            setActivePanel((current) =>
              current === "settings" ? null : "settings",
            )
          }
        >
          <Icon name="settings" />
        </button>
      </div>
      {activePanel === "terminal" ? (
        <div className="absolute right-4 top-full mt-3 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-xl bg-surface-container-lowest/95 shadow-[0_24px_80px_rgba(0,0,0,0.35)] ring-1 ring-primary-container/20 backdrop-blur-2xl md:right-8">
          <div className="flex items-center justify-between border-b border-outline-variant/10 bg-surface-container-low px-4 py-3">
            <div>
              <p className="font-headline text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">
                Terminal
              </p>
              <p className="mt-1 font-mono text-[10px] text-on-surface-variant/70">
                root@architect:~ /quick-actions
              </p>
            </div>
            <button
              aria-label="Close terminal"
              className="rounded-md text-on-surface-variant/60 transition-colors hover:text-primary"
              onClick={() => setActivePanel(null)}
              type="button"
            >
              <Icon name="close" className="text-base" />
            </button>
          </div>
          <div className="space-y-1 p-2">
            {terminalCommands.map((item) => (
              <button
                key={item.command}
                className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-surface-container-high"
                onClick={() => runCommand(item)}
                type="button"
              >
                <Icon
                  name={item.icon}
                  className="text-lg text-primary-container/70 group-hover:text-primary-container"
                />
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-xs text-primary">
                    $ {item.command}
                  </span>
                  <span className="block truncate font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/60">
                    {item.detail}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {activePanel === "settings" ? (
        <div className="absolute right-4 top-full mt-3 w-[calc(100vw-2rem)] max-w-xs overflow-hidden rounded-xl bg-surface-container-lowest/95 shadow-[0_24px_80px_rgba(0,0,0,0.35)] ring-1 ring-secondary/20 backdrop-blur-2xl md:right-8">
          <div className="flex items-center justify-between border-b border-outline-variant/10 bg-surface-container-low px-4 py-3">
            <div>
              <p className="font-headline text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">
                Settings
              </p>
              <p className="mt-1 font-mono text-[10px] text-on-surface-variant/70">
                visual layer controls
              </p>
            </div>
            <button
              aria-label="Close settings"
              className="rounded-md text-on-surface-variant/60 transition-colors hover:text-primary"
              onClick={() => setActivePanel(null)}
              type="button"
            >
              <Icon name="close" className="text-base" />
            </button>
          </div>
          <div className="space-y-2 p-3">
            <ToggleRow
              checked={settings.scanlines}
              label="Scanlines"
              onChange={() => toggleSetting("scanlines")}
            />
            <ToggleRow
              checked={settings.neonGlow}
              label="Neon Glow"
              onChange={() => toggleSetting("neonGlow")}
            />
            <ToggleRow
              checked={settings.reduceMotion}
              label="Reduce Motion"
              onChange={() => toggleSetting("reduceMotion")}
            />
          </div>
        </div>
      ) : null}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-b from-[#181c22] to-transparent" />
    </nav>
  );
}
