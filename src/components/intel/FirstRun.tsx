import { useRef } from "react";
import { Building2, Flame, Landmark, Radar, Rocket, Globe, Network } from "lucide-react";
import { flash, useIntel } from "@/lib/intel/store";
import { LIN_NAME, NETWORK_DESK } from "@/lib/lin/network";
import { sealInsight } from "@/lib/intel/honesty";

const CHOICES = [
  {
    id: "network" as const,
    title: LIN_NAME,
    copy: "Ask a question. Look at it from several honest angles. Empty means we do not know yet.",
    icon: Network,
  },
  {
    id: "contacts" as const,
    title: "See the planes",
    copy: "Public flight data. Not a secret feed. Not for flying.",
    icon: Radar,
  },
  {
    id: "space" as const,
    title: "See orbit",
    copy: "The station and public satellite catalog.",
    icon: Rocket,
  },
  {
    id: "environment" as const,
    title: "See quakes",
    copy: "Public earthquake list for the last day. Fire is a separate switch.",
    icon: Flame,
  },
  {
    id: "legislatures" as const,
    title: "Who sits where",
    copy: "Public rolls as filed. If a country has no file here, it stays empty.",
    icon: Landmark,
  },
  {
    id: "permits" as const,
    title: "Find a building desk",
    copy: "Look up who issues building permits. Not a login. Not an approval.",
    icon: Building2,
  },
  {
    id: "explore" as const,
    title: "Just the globe",
    copy: "Start empty. Ask or type when you are ready.",
    icon: Globe,
  },
];

export function FirstRun() {
  const persist = useRef(false);
  const picked = useRef(false);
  const dismiss = useIntel((s) => s.dismissFirstRun);
  const setLayer = useIntel((s) => s.setLayer);
  const ready = useIntel((s) => s.ready);

  // Camera moves only from this click. Mount / Esc / explore do not fly.
  function pick(id: (typeof CHOICES)[number]["id"]) {
    if (picked.current) return;
    picked.current = true;
    const engine = useIntel.getState().engine;
    let place = "";
    if (id === "network") {
      useIntel.getState().setDesk({ system: "lin", id: "network" });
      useIntel.getState().setInsight(
        sealInsight({
          id: "lin-boot",
          title: NETWORK_DESK.title,
          body: NETWORK_DESK.field,
          system: "lin",
          desk: { system: "lin", id: "network" },
          source: "Local network · delayed",
        }),
      );
      flash("Board open. The globe stays. You keep the call.");
    } else if (id === "contacts") {
      setLayer("flights", { on: true, freshness: "live" });
      engine?.resetGlobe();
      place = "Earth";
      flash("Public ADS-B on. Not for navigation.");
    } else if (id === "space") {
      setLayer("satellites", { on: true, freshness: "live" });
      // Timeout outlives this overlay: pick() dismisses immediately. Not a load fly.
      window.setTimeout(() => useIntel.getState().engine?.trackNearest("iss"), 1400);
      place = "Orbital";
      flash("Public satellite catalog on. ISS when the feed has it.");
    } else if (id === "environment") {
      setLayer("earthquakes", { on: true, freshness: "live" });
      engine?.resetGlobe();
      place = "Earth";
      flash("USGS 24h on. Public events, delayed.");
    } else if (id === "legislatures") {
      setLayer("legislatures", { on: true, freshness: "delayed" });
      engine?.resetGlobe();
      place = "Earth";
      flash("Legislatures on. Delayed public registers. Incomplete stays empty.");
    } else if (id === "permits") {
      setLayer("permits", { on: true, freshness: "delayed" });
      engine?.resetGlobe();
      place = "Earth";
      flash("Building desks on. Type a state or place. Rest not mapped.");
    } else {
      flash("Empty globe. Ask Grok or type a command.");
    }
    dismiss(persist.current);
    if (place) useIntel.getState().setPlace(place);
  }

  function skip() {
    if (picked.current) return;
    picked.current = true;
    dismiss(false);
  }

  return (
    <aside
      className="panel pointer-events-auto absolute top-1/2 left-1/2 z-20 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 p-5"
      role="dialog"
      aria-labelledby="first-run-title"
      data-presence-surface="firstrun"
    >
      <p className="kicker">{LIN_NAME}</p>
      <h2
        id="first-run-title"
        className="font-display mt-2 text-2xl font-semibold tracking-tight text-fg"
      >
        Where to start
      </h2>
      <p className="mt-2 text-sm leading-snug text-muted text-pretty">
        A board for honest questions. Public sources only. Not legal advice. Not a score.
        Pick a starting point, or skip and keep the empty globe.
      </p>
      <div className="mt-4 grid gap-2">
        {CHOICES.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              type="button"
              disabled={!ready && c.id !== "explore" && c.id !== "network"}
              onClick={() => pick(c.id)}
              className="flex min-h-11 items-center gap-3 rounded-sm border border-line bg-panel-2 px-3 py-2.5 text-left transition-colors duration-150 hover:border-line-strong hover:bg-panel disabled:opacity-50"
            >
              <Icon className="size-4 shrink-0 text-accent" strokeWidth={1.75} />
              <span className="min-w-0 flex-1">
                <strong className="block font-display text-base font-semibold tracking-wide">
                  {c.title}
                </strong>
                <small className="block text-xs text-muted">{c.copy}</small>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 text-[11px] text-subtle">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="size-3.5 accent-accent"
            onChange={(e) => {
              persist.current = e.target.checked;
            }}
          />
          Don't show this again
        </label>
        <button type="button" className="text-muted hover:text-fg" onClick={skip}>
          Esc
        </button>
      </div>
    </aside>
  );
}
