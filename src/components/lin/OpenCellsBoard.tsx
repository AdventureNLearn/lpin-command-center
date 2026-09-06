import { useState, type FormEvent } from "react";
import { flash } from "@/lib/intel/store";
import { OPENCELLS_KERNEL } from "@/lib/lin/opencells";
import { useLin } from "@/lib/lin/session";

export function OpenCellsBoard() {
  const topic = useLin((s) => s.topic);
  const sources = useLin((s) => s.sources.filter((x) => x.deskId === "opencells"));
  const [url, setUrl] = useState("");
  const [quote, setQuote] = useState("");
  const [instrument, setInstrument] = useState("");

  function attach(e: FormEvent) {
    e.preventDefault();
    if (!topic) {
      flash("Name a topic first");
      return;
    }
    const err = useLin.getState().addSource("opencells", url, `${instrument ? instrument + " — " : ""}${quote}`);
    if (err) {
      flash(err);
      return;
    }
    setUrl("");
    setQuote("");
    setInstrument("");
    flash("Cell quoted · delayed");
  }

  return (
    <div className="space-y-3 text-sm">
      <div>
        <h2 className="font-display text-xl font-semibold tracking-wide">Quote it or leave it blank</h2>
        <p className="mt-1 text-xs text-muted">
          A line is here only when the official text is attached. Blank is honest. This is not a
          ranking.
        </p>
        {topic ? <p className="mt-1 text-xs">Topic: {topic}</p> : null}
      </div>
      <ol className="list-decimal space-y-1 pl-4 text-xs text-muted">
        {OPENCELLS_KERNEL.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ol>
      <form className="space-y-2" onSubmit={attach}>
        <p className="kicker">Attach a cell</p>
        <input
          className="min-h-11 w-full rounded-sm border border-line bg-panel-2 px-2 text-sm"
          value={instrument}
          onChange={(e) => setInstrument(e.target.value)}
          placeholder="Instrument name (statute, order, gazette)"
          aria-label="Instrument"
        />
        <input
          className="min-h-11 w-full rounded-sm border border-line bg-panel-2 px-2 text-sm"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https:// official page"
          aria-label="Source URL"
        />
        <textarea
          className="min-h-16 w-full resize-y rounded-sm border border-line bg-panel-2 px-2 py-1 text-xs"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Smallest operative quote. Status in the same sentence."
          aria-label="Quote"
        />
        <button type="submit" className="min-h-11 w-full rounded-sm bg-accent px-3 text-accent-fg">
          Quote this cell
        </button>
      </form>
      <div>
        <p className="kicker">Quoted</p>
        {sources.length === 0 ? (
          <p className="mt-1 text-xs text-subtle">0 quoted. Open cells stay open.</p>
        ) : (
          <ul className="mt-2 space-y-1 text-xs">
            {sources.map((s) => (
              <li key={s.id} className="rounded-sm border border-line px-2 py-1.5">
                <p className="truncate">{s.url}</p>
                <p className="text-muted">{s.quote}</p>
                <p className="text-subtle">as of {s.retrieved}</p>
                <button
                  type="button"
                  className="mt-1 underline"
                  onClick={() => useLin.getState().removeSource(s.id)}
                >
                  Open this cell
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
