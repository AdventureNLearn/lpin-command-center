import { flash, useIntel } from "@/lib/intel/store";
import { useComms } from "@/lib/intel/comms";
import { applyAction } from "@/lib/intel/runCommand";
import type { Insight } from "@/lib/intel/insight";
import { formatHonesty } from "@/lib/intel/honesty";
import { LAYER_META } from "@/lib/intel/types";
import { linDeskById } from "@/lib/lin/network";
import { NOT_PROVEN, YOU_DECIDE } from "@/lib/lin/plain";

function kicker(ins: Insight) {
  if (ins.system === "kept") return "Legislature";
  if (ins.system === "permit") return "Building desk";
  if (ins.system === "jobsite") return ins.desk?.id === "claims" ? "Claims" : "Jobsite";
  if (ins.system === "insind") return "Inspection Index";
  if (ins.system === "lin") return linDeskById(ins.desk?.id ?? "network")?.kicker ?? "Network";
  return "Live map";
}

export function InsightCard() {
  const insight = useIntel((s) => s.insight);
  const cockpit = useIntel((s) => s.cockpit);
  const desk = useIntel((s) => s.desk);
  const chatOpen = useComms((s) => s.open);
  if (!insight || cockpit) return null;

  async function fly(ins: Insight) {
    const q = ins.q?.trim() ?? "";
    // ISS is a live contact. lookupPlace("ISS") hits the 0,0 orbit preset.
    if (/^(iss|the iss|international space station)(?:\s*\([^)]*\))?$/i.test(q)) {
      await applyAction({ type: "trackNearest", kind: "iss" }, q);
      flash("Looking at the ISS");
      return;
    }
    const engine = useIntel.getState().engine;
    if (ins.lat != null && ins.lon != null) {
      engine?.flyTo(ins.lon, ins.lat, ins.height ?? 80_000);
      flash(`Looking at ${ins.title}`);
      return;
    }
    if (!q) return;
    await applyAction({ type: "flyTo", q }, q);
    flash(`Looking at ${q}`);
  }

  async function openDesk(ins: Insight) {
    if (!ins.desk) return;
    if (ins.layer) useIntel.getState().setLayer(ins.layer, { on: true });
    await applyAction({ type: "desk", on: true, system: ins.desk.system, id: ins.desk.id });
  }

  function showLayer(ins: Insight) {
    if (!ins.layer) return;
    useIntel.getState().setLayer(ins.layer, { on: true });
    flash(`${LAYER_META[ins.layer].label} on the map`);
  }

  const claim =
    insight.system === "lin"
      ? `${NOT_PROVEN} ${YOU_DECIDE}`
      : insight.score != null && insight.basis
        ? formatHonesty({ score: insight.score, basis: insight.basis, label: insight.source })
        : insight.source;

  return (
    <article
      className="holo-card holo-insight"
      data-presence-surface="insight"
      aria-label={insight.title}
      data-score={insight.score != null ? String(insight.score) : undefined}
      data-rail={desk && chatOpen ? "both" : desk ? "desk" : "comms"}
    >
      <p className="kicker holo-kicker">{kicker(insight)}</p>
      <h2 className="holo-title">{insight.title}</h2>
      {insight.body ? <p className="holo-meta">{insight.body}</p> : null}
      <p className="holo-hint">{claim}</p>
      <div className="holo-actions">
        {insight.q || (insight.lat != null && insight.lon != null) ? (
          <button type="button" className="holo-grab" onClick={() => void fly(insight)}>
            Look here
          </button>
        ) : null}
        {insight.desk?.id ? (
          <button type="button" className="holo-grab" onClick={() => void openDesk(insight)}>
            Open the file
          </button>
        ) : null}
        {insight.layer && !insight.desk ? (
          <button type="button" className="holo-grab" onClick={() => showLayer(insight)}>
            Show on the map
          </button>
        ) : null}
        <button
          type="button"
          className="holo-grab"
          onClick={() => useIntel.getState().setInsight(null)}
        >
          Close
        </button>
      </div>
    </article>
  );
}
