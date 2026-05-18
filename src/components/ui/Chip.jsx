export default function Chip({ children, className = "" }) {
  return (
    <span
      className={`rounded-full bg-surface-container-highest px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-primary-fixed-dim ${className}`}
    >
      {children}
    </span>
  );
}
