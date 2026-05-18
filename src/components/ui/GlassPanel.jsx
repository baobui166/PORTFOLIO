export default function GlassPanel({ children, className = "" }) {
  return (
    <div
      className={`glass-module ring-1 ring-outline-variant/15 transition-all duration-500 ${className}`}
    >
      {children}
    </div>
  );
}
