import PageShell from "../components/layout/PageShell";
import Icon from "../components/ui/Icon";
import TerminalWindow from "../components/ui/TerminalWindow";

const feedItems = [
  {
    label: "LOG_001",
    title: "Design system consolidated",
    body: "Tailwind tokens, navigation shells, and terminal modules are now managed from React components.",
  },
  {
    label: "LOG_002",
    title: "Static pages migrated",
    body: "INIT, CODE, SHELL, and PING are preserved as routed application views.",
  },
  {
    label: "LOG_003",
    title: "Awaiting content stream",
    body: "This FEEDS channel is ready for writing, case studies, status notes, or release logs.",
  },
];

export default function FeedsPage() {
  return (
    <PageShell className="min-h-screen bg-background text-on-background">
      <div className="pointer-events-none fixed inset-0 grid-background opacity-70" />
      <main className="relative z-10 mx-auto min-h-screen max-w-6xl px-6 pb-40 pt-32 md:px-12">
        <header className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-surface-container-highest/40 px-3 py-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary-container" />
            <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-secondary">
              Stream Placeholder
            </span>
          </div>
          <h1 className="font-headline text-6xl font-bold leading-none tracking-[-0.04em] text-primary md:text-8xl">
            FEEDS<span className="text-primary-container">.RSS</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-on-surface-variant">
            A reserved broadcast channel for future logs, notes, case studies,
            and build updates. It keeps the dock complete while the content
            stream is being defined.
          </p>
        </header>
        <TerminalWindow title="ARCHITECT_FEED: SUBSCRIBED">
          <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
            {feedItems.map((item) => (
              <article
                key={item.label}
                className="rounded-xl bg-surface-container-low/80 p-5 transition-colors hover:bg-surface-container"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
                    {item.label}
                  </span>
                  <Icon name="rss_feed" className="text-primary-container" />
                </div>
                <h2 className="font-headline text-xl font-bold text-primary">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </TerminalWindow>
      </main>
    </PageShell>
  );
}
