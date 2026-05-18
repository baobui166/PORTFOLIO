const miniKeys = ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "P"];

export default function MiniKeyboardDock() {
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 z-40 w-full px-4">
      <div className="glass-module pointer-events-auto mx-auto max-w-4xl translate-y-8 rounded-t-2xl border-x border-t border-outline-variant/20 p-2 shadow-2xl transition-transform duration-500 hover:translate-y-2">
        <div className="mb-4 flex justify-center gap-2 py-2">
          <div className="h-1 w-12 rounded-full bg-surface-container-highest" />
        </div>
        <div className="grid grid-cols-12 gap-1 px-4 opacity-40">
          {miniKeys.map((key, index) => (
            <div
              key={`${key}-${index}`}
              className={`col-span-1 flex h-8 items-center justify-center rounded font-mono text-[10px] ${
                index === miniKeys.length - 1
                  ? "bg-primary-container/20 font-bold text-primary-container ring-1 ring-primary-container"
                  : "bg-surface-container-highest"
              }`}
            >
              {key}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
