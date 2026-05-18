import { useEffect, useState } from "react";
import Icon from "./Icon";

const STORAGE_KEY = "architect-os:onboarding-seen:v1";
const OPEN_EVENT = "architect-os:open-onboarding";

const tourSteps = [
  {
    detail: "FIRST_RUN_PROTOCOL",
    icon: "rocket_launch",
    title: "Welcome to Architect OS",
    body: "This portfolio works like a small developer console. Use the dock, header controls, and keyboard shortcuts to move through the system faster.",
  },
  {
    detail: "P/A/C/S + ESC",
    icon: "keyboard",
    title: "Shortcut Map",
    body: "On the home screen, press P for Profile, A for Projects, C for Contact, and S for Feeds. Press ESC anywhere on the website to return home.",
  },
  {
    detail: "HEADER_ACTIONS",
    icon: "terminal",
    title: "Terminal and Settings",
    body: "The terminal icon opens quick actions like opening pages or downloading the CV. The settings icon controls scanlines, glow, and motion.",
  },
  {
    detail: "BOTTOM_DOCK",
    icon: "apps",
    title: "Dock Navigation",
    body: "The bottom dock is your route map: INIT, CODE, FEEDS, SHELL, and PING. It stays available so you can jump between sections quickly.",
  },
];

function readTourSeen() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function writeTourSeen() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // Ignore storage failures; the tour can still be dismissed for this session.
  }
}

export default function OnboardingTour() {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const step = tourSteps[activeStep];
  const lastStep = activeStep === tourSteps.length - 1;

  useEffect(() => {
    if (!readTourSeen()) {
      setOpen(true);
    }

    function handleOpenTour() {
      setActiveStep(0);
      setOpen(true);
    }

    window.addEventListener(OPEN_EVENT, handleOpenTour);

    return () => window.removeEventListener(OPEN_EVENT, handleOpenTour);
  }, []);

  function closeTour() {
    writeTourSeen();
    setOpen(false);
  }

  function nextStep() {
    if (lastStep) {
      closeTour();
      return;
    }

    setActiveStep((current) => current + 1);
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-background/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-surface-container-lowest/95 shadow-[0_24px_90px_rgba(0,0,0,0.45)] ring-1 ring-primary-container/25">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-container to-transparent" />
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary-container/10 blur-3xl" />
        <div className="p-6 md:p-7">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-container-high text-primary-container shadow-[0_0_24px_rgba(0,245,255,0.16)]">
                <Icon name={step.icon} className="text-2xl" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-secondary">
                  {step.detail}
                </span>
                <h2 className="mt-1 font-headline text-2xl font-bold tracking-tight text-primary">
                  {step.title}
                </h2>
              </div>
            </div>
            <button
              aria-label="Skip onboarding"
              className="rounded-lg text-on-surface-variant/60 transition-colors hover:text-primary"
              onClick={closeTour}
              type="button"
            >
              <Icon name="close" />
            </button>
          </div>
          <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">
            {step.body}
          </p>
          <div className="mt-7 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {tourSteps.map((item, index) => (
                <span
                  key={item.title}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeStep
                      ? "w-8 bg-primary-container shadow-[0_0_10px_rgba(0,245,255,0.55)]"
                      : "w-2 bg-surface-container-highest"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              {activeStep > 0 ? (
                <button
                  className="font-mono text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary"
                  onClick={() => setActiveStep((current) => current - 1)}
                  type="button"
                >
                  Back
                </button>
              ) : null}
              <button
                className="rounded-lg bg-gradient-to-r from-primary to-primary-container px-5 py-2 font-headline text-xs font-bold uppercase tracking-widest text-on-primary transition-transform active:scale-95"
                onClick={nextStep}
                type="button"
              >
                {lastStep ? "Enter Site" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { OPEN_EVENT as ONBOARDING_OPEN_EVENT };
