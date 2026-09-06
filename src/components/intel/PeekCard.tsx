import { useEffect, useRef, useState } from "react";
import { flash, useIntel } from "@/lib/intel/store";
import { formatAltFt, formatKts, formatLatLon } from "@/lib/intel/geo";
import { formatHonesty, peekHonesty } from "@/lib/intel/honesty";
import { LAYER_META, type Kind, type Tracked } from "@/lib/intel/types";

const HOLD_MS = 5000;
const FADE_MS = 420;
/** PC command bar ~96px (seat 12). Peek stays above it. */
const BAR_RESERVE = 96;

function freshnessLabel(f: string) {
  if (f === "live") return "live feed";
  if (f === "delayed") return "delayed";
  if (f === "simulated") return "modeled";
  if (f === "error") return "feed error";
  return "off";
}

function kindKicker(kind: Kind): string {
  if (kind === "flight") return "Flight";
  if (kind === "military") return "Military";
  if (kind === "vessel") return "Vessel";
  if (kind === "satellite") return "Satellite";
  if (kind === "earthquake") return "Earthquake";
  if (kind === "fire") return "Fire";
  if (kind === "launch") return "Launch";
  if (kind === "legislature") return "Legislature";
  if (kind === "permit") return "Building desk";
  if (kind === "jobsite") return "Jobsite";
  return "Inspection Index";
}

function canFollow(kind: Kind) {
  return kind === "flight" || kind === "military" || kind === "vessel" || kind === "satellite";
}

function lookHeight(c: Tracked): number {
  if (c.kind === "legislature") return 1_200_000;
  if (c.kind === "permit") return c.id.startsWith("ahj-st-") ? 700_000 : 80_000;
  if (c.kind === "satellite") return Math.max(c.altM * 2.2, 1_200_000);
  if (c.kind === "flight" || c.kind === "military") return Math.max(c.altM * 3, 80_000);
  if (c.kind === "earthquake" || c.kind === "fire") return 200_000;
  if (c.kind === "launch") return 120_000;
  return 80_000;
}

function deskFor(id: string): { system: "kept" | "permit" | "jobsite" | "insind" | "lin"; id: string } | null {
  if (id.startsWith("leg-")) return { system: "kept", id: id.slice(4) };
  if (id.startsWith("ahj-core-")) return { system: "permit", id: id.slice("ahj-core-".length) };
  if (id.startsWith("ahj-st-")) return { system: "permit", id: `search:${id.slice("ahj-st-".length)}` };
  if (id.startsWith("job-")) return { system: "jobsite", id: id.slice(4) };
  if (id.startsWith("inx-")) return { system: "insind", id: id.slice(4) };
  return null;
}

export function PeekCard() {
  const peek = useIntel((s) => s.peek);
  const cockpit = useIntel((s) => s.cockpit);
  const [held, setHeld] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [remain, setRemain] = useState(HOLD_MS);
  const remainRef = useRef(HOLD_MS);

  useEffect(() => {
    if (!peek) {
      setHeld(false);
      setLeaving(false);
      remainRef.current = HOLD_MS;
      setRemain(HOLD_MS);
      return;
    }
    remainRef.current = HOLD_MS;
    setRemain(HOLD_MS);
    setLeaving(false);
    setHeld(false);
  }, [peek?.contact.id, peek?.sticky]);

  useEffect(() => {
    if (!peek || held || leaving || peek.sticky) return;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      remainRef.current = Math.max(0, remainRef.current - dt);
      setRemain(remainRef.current);
      if (remainRef.current <= 0) setLeaving(true);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [peek?.contact.id, peek?.sticky, held, leaving]);

  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => useIntel.getState().setPeek(null), FADE_MS);
    return () => window.clearTimeout(t);
  }, [leaving]);

  // Peek ≠ Insight. Do not gate on insight — both may show. No camera on mount.
  if (!peek || cockpit) return null;
  const c = peek.contact;
  const desk = deskFor(c.id);
  const follow = canFollow(c.kind);
  const sticky = Boolean(peek.sticky);
  const honesty = peekHonesty(c);

  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  const vh = typeof window !== "undefined" ? window.innerHeight : 720;
  const cardW = 300;
  const cardH = 320;
  let left = peek.x + 18;
  let top = peek.y - 12;
  if (left + cardW > vw - 12) left = peek.x - cardW - 12;
  if (top + cardH > vh - BAR_RESERVE) top = peek.y - cardH - 8;
  left = Math.max(12, Math.min(left, vw - cardW - 12));
  top = Math.max(12, Math.min(top, vh - cardH - BAR_RESERVE));
  const pct = sticky ? 100 : Math.max(0, Math.min(100, (remain / HOLD_MS) * 100));

  function lookHere() {
    if (leaving) return;
    const st = useIntel.getState();
    if (!st.engine) {
      flash("The globe isn't ready yet");
      return;
    }
    st.engine.flyTo(c.lon, c.lat, lookHeight(c));
    flash(`Looking at ${c.name}`);
  }

  function grab() {
    if (leaving) return;
    const st = useIntel.getState();
    if (!st.engine) {
      flash("The globe isn't ready yet");
      return;
    }
    st.engine.track(c.id);
    st.setPeek(null);
    flash(`Following ${c.name}`);
  }

  function openDesk() {
    if (leaving || !desk) return;
    const layer =
      desk.system === "kept"
        ? "legislatures"
        : desk.system === "permit"
          ? "permits"
          : desk.system === "jobsite" || desk.system === "insind"
            ? desk.system
            : null;
    const st = useIntel.getState();
    if (layer) st.setLayer(layer, { on: true, freshness: LAYER_META[layer].freshness });
    st.setDesk(desk);
    st.setPeek(null);
  }

  return (
    <article
      className="holo-card holo-peek"
      data-presence-surface="peek"
      data-peek="true"
      data-kind={c.kind}
      data-score={String(honesty.score)}
      data-leaving={leaving ? "true" : "false"}
      style={{ left, top }}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      aria-label={`${c.name} ${c.kind}`}
    >
      <p className="kicker holo-kicker">
        {kindKicker(c.kind)} · {freshnessLabel(c.freshness)}
      </p>
      <h2 className="holo-title">{c.name}</h2>
      <p className="holo-meta">{c.meta}</p>
      <dl className="hud-num holo-grid">
        <dt>Where</dt>
        <dd>{formatLatLon(c.lat, c.lon)}</dd>
        <dt>How high</dt>
        <dd>{formatAltFt(c.altM)}</dd>
        <dt>How fast</dt>
        <dd>{formatKts(c.speedMs)} knots</dd>
        <dt>Source</dt>
        <dd>{c.source}</dd>
        <dt>Claim</dt>
        <dd>{formatHonesty(honesty)}</dd>
      </dl>
      <div className="holo-actions">
        <button type="button" className="holo-grab" onClick={lookHere} disabled={leaving}>
          Look here
        </button>
        {follow ? (
          <button type="button" className="holo-grab" onClick={grab} disabled={leaving}>
            Follow this
          </button>
        ) : null}
        {desk ? (
          <button type="button" className="holo-grab" onClick={openDesk} disabled={leaving}>
            Open the file
          </button>
        ) : null}
        {sticky ? (
          <button
            type="button"
            className="holo-grab"
            onClick={() => useIntel.getState().setPeek(null)}
            disabled={leaving}
          >
            Close
          </button>
        ) : null}
      </div>
      {!sticky ? (
        <div className="holo-meter" aria-hidden>
          <span style={{ width: `${pct}%` }} />
        </div>
      ) : null}
      <p className="holo-hint">
        {sticky
          ? "Camera stays until Look here or Follow"
          : held
            ? "Stay here to keep this open"
            : "Closes in 5 seconds unless you follow"}
      </p>
    </article>
  );
}
