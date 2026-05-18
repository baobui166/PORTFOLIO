export default function TerminalWindow({ title, children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-lowest shadow-2xl ${className}`}
    >
      <div className="flex items-center justify-between bg-surface-container-high px-4 py-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60">
          {title}
        </span>
        <span className="w-12" />
      </div>
      {children}
    </div>
  );
}
