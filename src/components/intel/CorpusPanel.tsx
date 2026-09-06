import { useEffect, useState } from "react";
import { Library, X } from "lucide-react";
import { load501Summary, loadCorpusSummary, type Five01Summary } from "@/lib/intel/corpus";
import { useIntel } from "@/lib/intel/store";

export function CorpusPanel() {
  const open = useIntel((s) => s.corpusOpen);
  const summary = loadCorpusSummary();
  const [five01, setFive01] = useState<Five01Summary | { error: string } | null>(null);
  const [loading501, setLoading501] = useState(false);

  useEffect(() => {
    if (!open || five01 || loading501) return;
    setLoading501(true);
    void load501Summary()
      .then((r) => setFive01(r))
      .finally(() => setLoading501(false));
  }, [open, five01, loading501]);

  if (!open) return null;

  return (
    <aside
      className="panel corpus-panel absolute inset-x-3 top-28 bottom-28 z-20 flex min-h-0 flex-col overflow-hidden p-3 sm:top-16 md:inset-x-auto md:top-20 md:right-4 md:bottom-28 md:w-[22rem]"
      role="dialog"
      aria-label="Corpus"
    >
      <header className="mb-2 flex shrink-0 items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="kicker flex items-center gap-2">
            <Library className="size-3" strokeWidth={1.75} />
            Corpus
          </p>
          <p className="truncate text-xs text-subtle">Delayed archive · not live hosts</p>
        </div>
        <button
          type="button"
          className="grid size-9 place-items-center text-muted"
          onClick={() => useIntel.getState().setCorpusOpen(false)}
          aria-label="Close corpus"
        >
          <X className="size-4" />
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
        {summary.error ? (
          <p className="text-sm text-muted">Archive did not load. Globe stays up. {summary.error}</p>
        ) : (
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
            <dt className="text-subtle">Kits</dt>
            <dd className="hud-num">
              {summary.kitsOnDisk} / {summary.atlasRows}
            </dd>
            <dt className="text-subtle">Capitals</dt>
            <dd className="hud-num">{summary.capitals} delayed points</dd>
            <dt className="text-subtle">Permits</dt>
            <dd className="hud-num">
              {summary.permit.core} / {summary.permit.extra} / {summary.permit.more} /{" "}
              {summary.permit.rest}
            </dd>
            <dt className="text-subtle">Lock</dt>
            <dd>{summary.permit.lockDate}</dd>
            <dt className="text-subtle">Fills</dt>
            <dd>
              {summary.fillIsos.length} records · {summary.missingFillNote}
            </dd>
          </dl>
        )}

        <p className="kicker mt-3">US public filings</p>
        {loading501 && !five01 ? (
          <p className="text-xs text-muted">Loading counts…</p>
        ) : five01 && "error" in five01 ? (
          <p className="text-xs text-muted">Filings not loaded. {five01.error}</p>
        ) : five01 ? (
          <>
            <p className="hud-num text-sm">
              {five01.nodes} nodes · {five01.edges} edges ({five01.fec} fec / {five01.usaspending}{" "}
              spending) · {five01.holes} holes
            </p>
            <p className="mt-1 text-xs text-subtle">Public filings. Not an influence score.</p>
            <details className="mt-2 text-xs text-muted">
              <summary className="cursor-pointer select-none">Honest holes ({five01.holes})</summary>
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                {five01.holeWhat.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </details>
          </>
        ) : (
          <button
            type="button"
            className="mt-1 min-h-11 rounded-sm bg-panel-2 px-2 text-left text-xs"
            onClick={() => {
              setLoading501(true);
              void load501Summary()
                .then((r) => setFive01(r))
                .finally(() => setLoading501(false));
            }}
          >
            Load 501 counts
          </button>
        )}

        <p className="kicker mt-3">Honesty</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-muted">
          {(summary.holes.length ? summary.holes : ["Archive incomplete."]).map((h) => (
            <li key={h}>{h}</li>
          ))}
          <li>Legislature and permit layers start off. Nothing from this panel is plotted.</li>
        </ul>
      </div>
    </aside>
  );
}
