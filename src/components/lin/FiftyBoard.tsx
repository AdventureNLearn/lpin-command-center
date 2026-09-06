import { useState, type FormEvent } from "react";
import { flash } from "@/lib/intel/store";
import { FIFTY_JURIS, FIFTY_KERNEL, FIFTY_PROCESS, fiftyCellId } from "@/lib/lin/fifty";
import { noteKey, useLin } from "@/lib/lin/session";

export function FiftyBoard() {
  const topic = useLin((s) => s.topic);
  const notes = useLin((s) => s.notes);
  const sources = useLin((s) => s.sources);
  const deskId = "fifty";
  const mine = sources.filter((s) => s.deskId === deskId);
  const sourced = mine.length;
  const [url, setUrl] = useState("");
  const [quote, setQuote] = useState("");

  function attach(e: FormEvent) {
    e.preventDefault();
    if (!topic) {
      flash("Name a topic first");
      return;
    }
    const err = useLin.getState().addSource("fifty", url, quote);
    if (err) {
      flash(err);
      return;
    }
    setUrl("");
    setQuote("");
    flash("Source attached · delayed");
  }

  return (
    <div className="space-y-3 text-sm">
      <div>
        <h2 className="font-display text-xl font-semibold tracking-wide">Level and process</h2>
        <p className="mt-1 text-xs text-muted">
          Which level of government, and which kind of action. A city deal is not a state law. Empty
          means not found here.
        </p>
        {topic ? <p className="mt-1 text-xs">Topic: {topic}</p> : <p className="mt-1 text-xs text-subtle">Name a topic first.</p>}
      </div>
      <ol className="list-decimal space-y-1 pl-4 text-xs text-muted">
        {FIFTY_KERNEL.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ol>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-xs">
          <thead>
            <tr>
              <th className="border border-line p-1 text-left"> </th>
              {FIFTY_PROCESS.map((p) => (
                <th key={p.id} className="border border-line p-1 font-medium">
                  {p.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FIFTY_JURIS.map((j) => (
              <tr key={j.id}>
                <th className="border border-line p-1 text-left font-medium">{j.label}</th>
                {FIFTY_PROCESS.map((p) => {
                  const id = fiftyCellId(j.id, p.id);
                  const key = noteKey(deskId, id);
                  const filled = Boolean(notes[key]);
                  return (
                    <td key={id} className="border border-line p-1 align-top">
                      <label className="block text-[10px] text-subtle">{filled ? "noted" : "open"}</label>
                      <textarea
                        className="mt-0.5 min-h-14 w-full resize-y bg-void p-1 text-xs"
                        value={notes[key] ?? ""}
                        onChange={(e) => useLin.getState().setNote(deskId, id, e.target.value)}
                        placeholder="empty"
                        aria-label={`${j.label} ${p.label}`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form className="space-y-2" onSubmit={attach}>
        <p className="kicker">Attach source</p>
        <input
          className="min-h-11 w-full rounded-sm border border-line bg-panel-2 px-2 text-sm"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https:// official page"
          aria-label="Source URL"
        />
        <textarea
          className="min-h-14 w-full resize-y rounded-sm border border-line bg-panel-2 px-2 py-1 text-xs"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Smallest operative quote"
          aria-label="Source quote"
        />
        <button type="submit" className="min-h-11 w-full rounded-sm bg-accent px-3 text-accent-fg">
          Attach
        </button>
      </form>
      <p className="text-xs text-subtle">
        {sourced} sourced URL{sourced === 1 ? "" : "s"} on this desk. User types locality. No pin dump.
      </p>
    </div>
  );
}
