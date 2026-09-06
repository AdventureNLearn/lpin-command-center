import { keptCountLine, keptDesks } from "@/lib/kept/desks";
import { flash, useIntel } from "@/lib/intel/store";
import { STATE_CENTROIDS } from "@/lib/permit/permit-pins";
import { ahjCountByState } from "@/lib/permit/search-lite";
import { getState } from "@/lib/permit/states";
import type { LayerId } from "@/lib/intel/types";

const LEG_H = 1_200_000;
const STATE_H = 700_000;

const NEAREST: Partial<Record<LayerId, "flight" | "vessel" | "satellite">> = {
  flights: "flight",
  vessels: "vessel",
  satellites: "satellite",
};

const CIVIC: ReadonlySet<LayerId> = new Set(["legislatures", "permits", "jobsite", "insind"]);

function SubBtn({
  label,
  hint,
  onClick,
}: {
  label: string;
  hint?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="flex min-h-11 w-full items-center rounded-sm px-2 text-left hover:bg-panel-2"
      onClick={onClick}
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm">{label}</span>
        {hint ? <span className="block truncate text-xs text-subtle">{hint}</span> : null}
      </span>
    </button>
  );
}

function LegKids() {
  const desks = [...keptDesks()].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <ul className="mb-1 ml-3 border-l border-line pl-1">
      {desks.map((d) => (
        <li key={d.iso2}>
          <SubBtn
            label={d.name}
            hint={keptCountLine(d)}
            onClick={() => {
              const s = useIntel.getState();
              s.engine?.flyTo(d.lon, d.lat, LEG_H);
              s.setDesk({ system: "kept", id: d.iso2 });
              s.engine?.track(`leg-${d.iso2}`);
            }}
          />
        </li>
      ))}
    </ul>
  );
}

function AhjKids() {
  const counts = ahjCountByState();
  const states = Object.entries(STATE_CENTROIDS)
    .filter(([code]) => (counts.get(code) ?? 0) > 0)
    .sort(([a], [b]) => a.localeCompare(b));
  return (
    <div className="mb-1 ml-3 border-l border-line pl-1">
      <p className="kicker px-2 pt-1">By state</p>
      <ul>
        {states.map(([code, pos]) => {
          const n = counts.get(code) ?? 0;
          const name = getState(code)?.name ?? code;
          return (
            <li key={code}>
              <SubBtn
                label={name}
                hint={`${code} · ${n} Core/Extra/More · Rest not mapped`}
                onClick={() => {
                  const s = useIntel.getState();
                  s.engine?.flyTo(pos.lon, pos.lat, STATE_H);
                  s.setDesk({ system: "permit", id: `search:${code}` });
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function JobsiteKids() {
  return (
    <ul className="mb-1 ml-3 border-l border-line pl-1">
      <li>
        <SubBtn
          label="Open jobsite desk"
          hint="Type a pack. No pins."
          onClick={() => {
            useIntel.getState().setDesk({ system: "jobsite", id: "" });
          }}
        />
      </li>
    </ul>
  );
}

function InsindKids() {
  return (
    <ul className="mb-1 ml-3 border-l border-line pl-1">
      <li>
        <SubBtn
          label="Open inspection desk"
          hint="Type VIN/plate/USDOT. No pins."
          onClick={() => {
            useIntel.getState().setDesk({ system: "insind", id: "" });
          }}
        />
      </li>
    </ul>
  );
}

function LiveKids({ id }: { id: LayerId }) {
  if (CIVIC.has(id)) return null;
  const kind = NEAREST[id];
  return (
    <ul className="mb-1 ml-3 border-l border-line pl-1">
      {kind ? (
        <li>
          <SubBtn
            label="Track nearest"
            hint="Follow the closest contact in view. Does not zoom."
            onClick={() => {
              const s = useIntel.getState();
              const ok = s.engine?.trackNearest(kind);
              flash(ok ? `Tracking nearest ${kind}` : `No ${kind} in catalog yet`);
            }}
          />
        </li>
      ) : null}
      <li>
        <SubBtn
          label="Next in view"
          hint="Cycle drawn contacts"
          onClick={() => useIntel.getState().engine?.nextContact()}
        />
      </li>
    </ul>
  );
}

export function LayerSubs({ id }: { id: LayerId }) {
  const on = useIntel((s) => s.layers[id].on);
  if (!on) return null;
  switch (id) {
    case "legislatures":
      return <LegKids />;
    case "permits":
      return <AhjKids />;
    case "jobsite":
      return <JobsiteKids />;
    case "insind":
      return <InsindKids />;
    default:
      return <LiveKids id={id} />;
  }
}
