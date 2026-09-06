import { flash } from "@/lib/intel/store";
import { collisionsFromSources, SENSE_LANES } from "@/lib/lin/protocol";
import { linDeskById } from "@/lib/lin/network";
import { useLin } from "@/lib/lin/session";
import { COLLISION_HINT, LANE_PLAIN } from "@/lib/lin/plain";
import { openLinDesk } from "./openDesk";

export function LanesPanel() {
  const topic = useLin((s) => s.topic);
  const sources = useLin((s) => s.sources);
  const armed = useLin((s) => s.armed);
  const hits = collisionsFromSources(sources);

  function run() {
    if (!topic) {
      flash("Name your question first");
      return;
    }
    const ids = armed.length ? armed : SENSE_LANES.map((l) => l.id);
    if (!armed.length) useLin.getState().armAll(ids);
    const first = SENSE_LANES.find((l) => ids.includes(l.id));
    const d = first ? linDeskById(first.deskId) : undefined;
    if (d) openLinDesk(d);
    flash(`Lanes · ${ids.length} on ${topic}`);
  }

  return (
    <div className="space-y-2 text-sm">
      <p className="kicker">Several angles</p>
      <p className="text-xs text-muted">
        Look at the same question more than one way. If the same fact shows up twice, that is a lead
        — not a verdict.
      </p>
      <div className="flex gap-1">
        <button type="button" className="min-h-11 flex-1 rounded-sm bg-accent px-2 text-xs text-accent-fg" onClick={run}>
          Look from every angle
        </button>
        <button
          type="button"
          className="min-h-11 rounded-sm bg-panel-2 px-2 text-xs"
          onClick={() => useLin.getState().armAll(SENSE_LANES.map((l) => l.id))}
        >
          Turn all on
        </button>
        <button type="button" className="min-h-11 rounded-sm bg-panel-2 px-2 text-xs" onClick={() => useLin.getState().clearArms()}>
          Turn off
        </button>
      </div>
      <ul className="grid grid-cols-2 gap-1">
        {SENSE_LANES.map((lane) => {
          const n = sources.filter((s) => s.deskId === lane.deskId).length;
          const on = armed.includes(lane.id);
          const state = n > 0 ? "has a link" : on ? "on" : "off";
          const plain = LANE_PLAIN[lane.id];
          return (
            <li key={lane.id}>
              <button
                type="button"
                data-on={on ? "true" : "false"}
                className="min-h-11 w-full rounded-sm bg-panel-2 px-2 text-left text-xs"
                onClick={() => {
                  useLin.getState().toggleArm(lane.id);
                  const d = linDeskById(lane.deskId);
                  if (d && topic) openLinDesk(d);
                }}
              >
                {plain?.label ?? lane.label}
                <span className="mt-0.5 block text-subtle">
                  {state}
                  {plain ? ` · ${plain.ask}` : ""}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {hits.length > 0 ? (
        <div>
          <p className="kicker">Same fact, two places</p>
          <ul className="mt-1 space-y-1 text-xs text-muted">
            {hits.map((h) => (
              <li key={h.kind + h.key}>{COLLISION_HINT}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-xs text-subtle">Nothing has shown up in two places yet.</p>
      )}
    </div>
  );
}
