import BottomDock from "./BottomDock";
import TopNav from "./TopNav";

export default function PageShell({
  children,
  className = "min-h-screen bg-background text-on-background",
  command,
  footer,
}) {
  return (
    <div className={className}>
      <TopNav command={command} />
      {children}
      <BottomDock />
      {footer}
    </div>
  );
}
