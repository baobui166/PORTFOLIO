import PageShell from "../components/layout/PageShell";
import Chip from "../components/ui/Chip";
import GlassPanel from "../components/ui/GlassPanel";
import Icon from "../components/ui/Icon";
import MiniKeyboardDock from "../components/ui/MiniKeyboardDock";
import { projects } from "../data/projects";

const variantClasses = {
  featured: "md:col-span-8",
  vertical: "md:col-span-4 flex flex-col",
  horizontal: "md:col-span-6",
};

function ProjectCard({ project }) {
  if (project.variant === "featured") {
    return (
      <GlassPanel
        className={`${variantClasses[project.variant]} group overflow-hidden rounded-xl hover:scale-[1.01]`}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            alt={project.alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={project.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80" />
        </div>
        <div className="relative p-8">
          <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <h3 className="font-headline text-2xl font-bold tracking-tight text-primary">
                {project.title}
              </h3>
              <p className="mt-2 max-w-md text-on-surface-variant">
                {project.description}
              </p>
            </div>
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button className="rounded-md bg-gradient-to-r from-primary to-primary-container px-6 py-2 font-headline text-sm font-bold tracking-tighter text-on-primary transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]">
              EXEC_REMOTE
            </button>
            <button className="font-mono text-xs text-primary decoration-secondary transition-all hover:underline">
              VIEW_SOURCE_CODE
            </button>
          </div>
        </div>
      </GlassPanel>
    );
  }

  if (project.variant === "vertical") {
    return (
      <GlassPanel
        className={`${variantClasses[project.variant]} group overflow-hidden rounded-xl hover:scale-[1.01]`}
      >
        <div className="h-48 overflow-hidden">
          <img
            alt={project.alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={project.image}
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <h3 className="font-headline text-xl font-bold tracking-tight text-primary">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-on-surface-variant">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-surface-container-high py-2 font-headline text-xs font-bold tracking-widest text-on-surface transition-colors hover:bg-surface-container-highest">
            INITIALIZE
          </button>
        </div>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel
      className={`${variantClasses[project.variant]} group overflow-hidden rounded-xl hover:scale-[1.01]`}
    >
      <div className="flex h-full flex-col md:flex-row">
        <div className="h-48 w-full overflow-hidden md:h-auto md:w-2/5">
          <img
            alt={project.alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={project.image}
          />
        </div>
        <div className="flex flex-col justify-between p-6 md:w-3/5">
          <div>
            <h3 className="font-headline text-xl font-bold tracking-tight text-primary">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              {project.description}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest text-secondary">
              {project.status}
            </span>
            <button className="text-primary-container" aria-label={project.title}>
              <Icon name={project.icon} />
            </button>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

export default function ProjectsPage() {
  return (
    <PageShell className="min-h-screen bg-surface text-on-surface" command="search_repo --deep">
      <main className="mx-auto max-w-7xl px-6 pb-32 pt-24 md:px-12">
        <header className="mb-16">
          <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4">
            <h1 className="font-headline text-5xl font-bold tracking-[-0.04em] text-primary md:text-7xl">
              DEPLOYED_WORK
            </h1>
            <span className="font-mono text-sm uppercase tracking-widest text-secondary">
              [Branch: Production]
            </span>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            A high-fidelity audit of architectural systems and neural
            interfaces. Prototyping the future through tonal shifts and
            technical precision.
          </p>
        </header>
        <section className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </section>
        <div className="mx-auto mt-20 max-w-2xl">
          <div className="rounded-lg border-b border-secondary/40 bg-surface-container-lowest p-6">
            <div className="flex items-center gap-3 font-mono text-sm text-on-surface/80">
              <span className="text-primary-container">
                visitor@architect-os:
              </span>
              <span className="text-secondary">~/projects</span>
              <span className="animate-pulse">_</span>
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
              Press [CMD+K] to browse terminal history
            </p>
          </div>
        </div>
      </main>
      <MiniKeyboardDock />
    </PageShell>
  );
}
