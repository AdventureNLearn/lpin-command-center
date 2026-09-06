import { X } from "lucide-react";
import { CREDIT, HOW_TO, PILLARS, PRODUCT_NAME } from "@/lib/lin/plain";
import { METHODS } from "@/lib/lin/methods";

const DESK_ORDER = [
  "legal",
  "regulatory",
  "jurisdictional",
  "governance",
  "fifty",
  "opencells",
  "technical",
  "operational",
  "engineering",
  "commerce",
] as const;

export function InstallCard({ onClose }: { onClose: () => void }) {
  return (
    <aside
      className="panel pointer-events-auto absolute top-1/2 left-1/2 z-30 flex max-h-[min(88svh,40rem)] w-[min(94vw,28rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden p-4"
      role="dialog"
      aria-labelledby="guide-title"
    >
      <header className="mb-2 flex shrink-0 items-start justify-between gap-2">
        <div>
          <p className="kicker">Instruction guide</p>
          <h2 id="guide-title" className="font-display text-lg font-semibold tracking-wide">
            {PRODUCT_NAME}
          </h2>
        </div>
        <button
          type="button"
          className="grid size-9 place-items-center text-muted"
          onClick={onClose}
          aria-label="Close guide"
        >
          <X className="size-4" />
        </button>
      </header>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain pr-1 text-sm leading-snug">
        <p className="text-muted">
          A board for honest questions. It does not decide for you.
        </p>
        <div>
          <p className="kicker">How to use this</p>
          <ol className="mt-2 list-decimal space-y-1 pl-4">
            {HOW_TO.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
        <div>
          <p className="kicker">Three doors</p>
          <ul className="mt-2 space-y-2">
            {PILLARS.map((p) => (
              <li key={p.id}>
                <strong>{p.label}.</strong> {p.ask}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker">Each desk</p>
          <ul className="mt-2 space-y-3">
            {DESK_ORDER.map((id) => {
              const m = METHODS[id];
              if (!m) return null;
              return (
                <li key={id}>
                  <strong>{m.for}</strong>
                  <ol className="mt-1 list-decimal pl-4 text-xs text-muted">
                    {m.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                  <p className="mt-1 text-xs text-subtle">Done when: {m.done}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className="kicker">Copy this framework</p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-muted">
            <li>One globe. One file. One card. No second homepage.</li>
            <li>Every answer names which desk it came from.</li>
            <li>A quote without a link is not proven.</li>
            <li>Empty is honest. A finished-looking blank is not.</li>
            <li>The same fact in two places is a lead. A person still makes the call.</li>
          </ul>
        </div>
        <p className="text-xs text-muted">
          To run a copy on your machine: <code className="hud-num">npm install</code> then{" "}
          <code className="hud-num">npm run dev</code>
        </p>
        <p className="text-xs text-subtle">{CREDIT}</p>
      </div>
    </aside>
  );
}
