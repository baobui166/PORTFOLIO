import Icon from "./Icon";

const toastStyles = {
  error: {
    accent: "from-error/80 to-error-container/80",
    icon: "error",
    label: "Transmission Failed",
    ring: "ring-error/30",
    text: "text-error",
  },
  info: {
    accent: "from-primary-container/80 to-secondary-container/70",
    icon: "info",
    label: "System Notice",
    ring: "ring-primary-container/25",
    text: "text-primary-container",
  },
  success: {
    accent: "from-primary-container/90 to-primary-fixed-dim/70",
    icon: "check_circle",
    label: "Transmission Complete",
    ring: "ring-primary-container/35",
    text: "text-primary-container",
  },
};

export default function ToastStack({ onDismiss, toasts }) {
  return (
    <div className="pointer-events-none fixed right-4 top-24 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 md:right-8 md:top-28">
      {toasts.map((toast) => {
        const style = toastStyles[toast.type] ?? toastStyles.info;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto group relative overflow-hidden rounded-xl bg-surface-container-lowest/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] ring-1 ${style.ring} backdrop-blur-2xl`}
            role="status"
          >
            <div
              className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${style.accent}`}
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-container/40 to-transparent" />
            <div className="flex items-start gap-3 pl-2">
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container-high ${style.text} shadow-[0_0_22px_rgba(0,245,255,0.16)]`}
              >
                <Icon name={style.icon} className="text-xl" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-headline text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">
                    {style.label}
                  </span>
                  <button
                    aria-label="Dismiss notification"
                    className="rounded-md text-on-surface-variant/60 transition-colors hover:text-primary"
                    onClick={() => onDismiss(toast.id)}
                    type="button"
                  >
                    <Icon name="close" className="text-base" />
                  </button>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-on-surface">
                  {toast.message}
                </p>
                {toast.detail ? (
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/70">
                    {toast.detail}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
