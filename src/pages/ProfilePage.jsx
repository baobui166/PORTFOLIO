import PageShell from "../components/layout/PageShell";
import Chip from "../components/ui/Chip";
import Icon from "../components/ui/Icon";
import TerminalWindow from "../components/ui/TerminalWindow";
import { profile } from "../data/profile";

function NarrativeLine({ line, active }) {
  return (
    <div className="flex gap-4">
      <span
        className={`select-none font-headline text-sm text-primary opacity-50 ${
          active ? "animate-pulse" : ""
        }`}
      >
        $
      </span>
      {line ? (
        <p className="text-lg font-light leading-relaxed text-on-surface/90 md:text-xl">
          {typeof line === "string" ? (
            line
          ) : (
            <>
              {line.intro}{" "}
              <span className="font-bold text-primary">{line.primary}</span>{" "}
              {line.middle}{" "}
              <span className="italic text-secondary">{line.secondary}</span>,{" "}
              {line.outro}
            </>
          )}
        </p>
      ) : (
        <span className="h-6 w-2 bg-primary-container/60" />
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <PageShell className="min-h-screen bg-background text-on-background">
      <main className="relative mx-auto min-h-screen max-w-7xl overflow-hidden px-6 pb-48 pt-32 md:px-12">
        <div className="scanline-overlay fixed inset-0 z-10 opacity-20" />
        <header className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-outline-variant/20 bg-surface-container-highest px-3 py-1">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary-container" />
              <span className="font-headline text-[10px] font-bold uppercase tracking-[0.2em] text-primary-fixed-dim">
                Status: Authenticated
              </span>
            </div>
            <h1 className="font-headline text-6xl font-bold leading-tight tracking-[-0.04em] text-primary md:text-8xl">
              ABOUT_ME<span className="text-secondary">.LOG</span>
            </h1>
          </div>
          <a
            className="group flex w-max items-center gap-3 rounded-xl bg-gradient-to-r from-primary to-primary-container px-6 py-3 font-headline text-xs font-bold uppercase tracking-widest text-on-primary transition-all hover:shadow-[0_0_25px_rgba(0,245,255,0.4)] active:scale-95"
            href={profile.cvPath}
            download="BuiChiBao-Fullstack-Developer.pdf"
          >
            <Icon name="download" className="text-sm" />
            DOWNLOAD_CV
          </a>
        </header>
        <div className="relative z-20 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="space-y-8 lg:col-span-4">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-container/30 to-secondary/30 opacity-25 blur transition duration-1000 group-hover:opacity-50" />
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-low">
                <img
                  alt="Close-up artistic portrait of a tech professional in a dark environment with blue and magenta rim lighting"
                  className="h-full w-full object-cover"
                  src={profile.portrait}
                />
                <div className="absolute bottom-4 left-4 rounded bg-background/80 px-2 py-1 font-headline text-[10px] text-primary-fixed-dim backdrop-blur-md">
                  {profile.identifier}
                </div>
              </div>
            </div>
            <div className="space-y-6 rounded-2xl border border-outline-variant/10 bg-surface-container-low/40 p-6 backdrop-blur-xl">
              <div>
                <span className="mb-1 block font-headline text-[10px] uppercase tracking-widest text-secondary">
                  Current_Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {profile.stack.map((item) => (
                    <Chip key={item} className="font-bold tracking-tighter">
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <span className="mb-1 block font-headline text-[10px] uppercase tracking-widest text-secondary">
                  Availability
                </span>
                <p className="flex items-center gap-2 text-sm font-medium text-on-surface-variant">
                  <Icon name="circle" className="text-sm text-primary" />
                  {profile.availability}
                </p>
              </div>
            </div>
          </aside>
          <section className="space-y-12 lg:col-span-8">
            <TerminalWindow title="USER_SESSION: NARRATIVE.MD">
              <div className="space-y-10 p-8 md:p-12">
                <div className="space-y-6">
                  {profile.narrative.map((line, index) => (
                    <NarrativeLine key={index} line={line} />
                  ))}
                  <NarrativeLine active />
                </div>
                <div className="border-t border-outline-variant/10 pt-8">
                  <h3 className="mb-12 font-headline text-2xl font-bold text-primary">
                    TIMELINE_HISTORY
                  </h3>
                  <div className="relative space-y-0">
                    <div className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-primary/50 via-outline-variant/30 to-transparent" />
                    {profile.timeline.map((entry) => (
                      <div
                        key={entry.range}
                        className="group relative pb-12 pl-10 last:pb-0"
                      >
                        <div
                          className={`absolute left-0 top-1.5 z-10 h-4 w-4 rounded-full bg-background transition-colors duration-300 ${
                            entry.current
                              ? "border-2 border-primary group-hover:scale-125"
                              : "border-2 border-outline group-hover:border-primary-container"
                          }`}
                        />
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className={`font-headline text-xs font-bold uppercase tracking-[0.2em] ${
                                entry.current
                                  ? "text-secondary"
                                  : "text-on-surface-variant"
                              }`}
                            >
                              {entry.range}
                            </span>
                            <span className="h-px w-8 bg-outline-variant/30" />
                            <span className="font-headline text-xs uppercase text-on-surface-variant">
                              {entry.company}
                            </span>
                          </div>
                          <h4 className="font-headline text-xl font-bold text-primary transition-transform duration-300 group-hover:translate-x-2">
                            {entry.role}
                          </h4>
                          <p className="max-w-2xl text-sm font-light text-on-surface-variant">
                            {entry.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TerminalWindow>
          </section>
        </div>
      </main>
    </PageShell>
  );
}
