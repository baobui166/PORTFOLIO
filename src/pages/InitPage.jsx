import PageShell from "../components/layout/PageShell";
import Keyboard from "../components/ui/Keyboard";

function StatusIndicators() {
  return (
    <aside className="fixed right-8 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-8 opacity-40 transition-opacity hover:opacity-100 lg:flex">
      <div className="flex flex-col items-end">
        <span className="font-headline text-[10px] uppercase tracking-widest text-primary/50">
          Latency
        </span>
        <span className="font-headline text-lg text-primary">12ms</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-headline text-[10px] uppercase tracking-widest text-secondary/50">
          Uptime
        </span>
        <span className="font-headline text-lg text-secondary">99.99%</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">
          Stack
        </span>
        <span className="font-headline text-xs text-on-surface">
          RUST_GRPC_WASM
        </span>
      </div>
    </aside>
  );
}

export default function InitPage() {
  return (
    <PageShell className="min-h-screen overflow-hidden bg-background text-on-background">
      <div className="pointer-events-none fixed inset-0 grid-background" />
      <div className="fixed left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-[#00f5ff]/5 blur-[120px]" />
      <div className="fixed bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-[#fface8]/5 blur-[120px]" />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 pb-40 pt-32">
        <section className="mx-auto max-w-4xl space-y-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-outline-variant/20 bg-surface-container-highest/40 px-3 py-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary-container shadow-[0_0_8px_#00f5ff]" />
            <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-primary">
              System Online
            </span>
          </div>
          <h1 className="font-headline text-5xl font-bold tracking-[-0.04em] text-on-surface md:text-7xl">
            Bao Bui //{" "}
            <span className="text-primary-container">Full Stack Architect</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            Crafting high-performance digital ecosystems where code meets
            brutalist aesthetics. Focused on structural integrity, scalable
            infrastructure, and the terminal sublime.
          </p>
          <div className="pt-8 opacity-40">
            <p className="font-headline text-xs uppercase tracking-[0.3em] text-on-surface-variant">
              Press a key to explore
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <span className="explore-signal-bar h-6 w-1 bg-primary-container" />
              <span
                className="explore-signal-bar h-6 w-1 bg-primary-container"
                style={{ animationDelay: "0.18s" }}
              />
              <span
                className="explore-signal-bar h-6 w-1 bg-primary-container"
                style={{ animationDelay: "0.36s" }}
              />
            </div>
          </div>
        </section>
        <Keyboard />
      </main>
      <StatusIndicators />
    </PageShell>
  );
}
