const keyboardRows = [
  ["ESC", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "DEL"],
  ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["CAPS", "A", "S", "D", "F", "G", "H", "J", "K", "L", "ENTER"],
  ["SHIFT", "Z", "X", "C", "V", "B", "N", "M", "SHIFT"],
  ["CTRL", "ALT", "", "ALT", "CTRL", "FN"],
];

const highlightedKeys = new Set(["P", "A", "S", "C"]);

function spanForKey(key) {
  if (key === "") return "col-span-7";
  if (key === "CAPS" || key === "SHIFT") return "col-span-2";
  return "col-span-1";
}

export default function Keyboard({ activeKey, onKeyTrigger }) {
  return (
    <div className="keyboard-perspective mt-auto w-full max-w-5xl">
      <div className="keyboard-chassis relative overflow-hidden rounded-[32px] border-t border-outline-variant/30 bg-surface-container-low p-8 pb-12">
        <div className="absolute -bottom-10 left-1/2 h-10 w-4/5 -translate-x-1/2 bg-primary-container/20 blur-[40px]" />
        <div className="grid grid-cols-12 gap-2 md:gap-3">
          {keyboardRows.flat().map((key, index) => {
            const highlighted = highlightedKeys.has(key);
            const active = activeKey === key;
            const keyClass = `${spanForKey(key)} key-cap relative flex h-12 items-center justify-center rounded-lg border md:h-16 ${
              active
                ? "neon-glow border-primary-container bg-primary-container/20 shadow-[0_0_28px_rgba(0,245,255,0.45)]"
                : highlighted
                  ? "neon-glow border-primary-container/50 bg-primary-container/10"
                  : "border-outline-variant/10"
            }`;

            if (!key) {
              return (
                <div
                  key={`${key || "space"}-${index}`}
                  className={keyClass}
                  aria-hidden="true"
                >
                  <span className="absolute inset-x-4 top-1/2 h-px -translate-y-1/2 bg-primary-container/20" />
                </div>
              );
            }

            return (
              <button
                key={`${key || "space"}-${index}`}
                aria-label={`Trigger ${key} key`}
                className={`${keyClass} active:scale-[0.98]`}
                onClick={() => onKeyTrigger?.(key)}
                type="button"
              >
                <span
                  className={`font-headline text-[10px] ${
                    active || highlighted
                      ? "text-sm font-bold text-primary-container"
                      : "text-on-surface-variant"
                  }`}
                >
                  {key}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
