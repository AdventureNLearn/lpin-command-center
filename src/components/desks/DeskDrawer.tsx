import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { keptAtlasHoles, keptCountLine, keptDeskByIso, keptDesks } from "@/lib/kept/desks";
import { loadKeptRoster, type KeptRoster } from "@/lib/kept/roster";
import { flash, useIntel } from "@/lib/intel/store";
import { runCommand } from "@/lib/intel/runCommand";
import { useComms } from "@/lib/intel/comms";
import { STREAM_CAP, STREAM_THEMES, comparePacks, type ComparePack } from "@/lib/kept/streams";
import {
  ahjCountByState,
  getSearchablePlace,
  permitChip,
  searchAhj,
} from "@/lib/permit/search-lite";
import { STATE_CENTROIDS } from "@/lib/permit/permit-pins";
import { getCachedRestPlace, rememberRestPlace, searchRestAhj } from "@/lib/permit/rest-search";
import { getState } from "@/lib/permit/states";
import { PLAYBOOKS, getPlaybook } from "@/lib/permit/playbooks";
import { DISCLAIMER } from "@/lib/permit/types";
import type { PlaceDesk, ProjectKind } from "@/lib/permit/types";
import { JOBSITE_EMPTY, JOBSITE_HONESTY, lookupPack, normalizeJobsiteQuery } from "@/lib/jobsite/packs";
import { INSIND_EMPTY, INSIND_HONESTY, lookupInsind, normalizeInsindQuery } from "@/lib/insind/lookup";
import {
  CIVIC_REFS,
  LIN_HONESTY,
  LIN_NAME,
  linDeskById,
  type CivicRef,
} from "@/lib/lin/network";
import { noteKey, useLin } from "@/lib/lin/session";
import { sealInsight } from "@/lib/intel/honesty";
import { FiftyBoard } from "@/components/lin/FiftyBoard";
import { OpenCellsBoard } from "@/components/lin/OpenCellsBoard";
import { LanesPanel } from "@/components/lin/LanesPanel";
import { MethodCard } from "@/components/lin/MethodCard";
import { openLinDesk } from "@/components/lin/openDesk";
import { HOW_TO, PILLARS } from "@/lib/lin/plain";

function KeptBody({ iso2 }: { iso2: string }) {
  const desk = keptDeskByIso(iso2);
  const pins = useIntel((s) => s.streamPins);
  const pinned = pins.includes(iso2);
  const [roster, setRoster] = useState<KeptRoster | null>(null);

  useEffect(() => {
    let live = true;
    setRoster(null);
    void loadKeptRoster(iso2).then((r) => {
      if (live) setRoster(r);
    });
    return () => {
      live = false;
    };
  }, [iso2]);

  if (!desk) {
    return <p className="text-sm text-muted">Listed without a kit on disk.</p>;
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold tracking-wide">{desk.name}</h2>
      <p className="text-xs text-muted">
        {desk.chamber} in {desk.capitalName}
      </p>
      <p className="hud-num mt-1 text-sm">{keptCountLine(desk)}</p>
      {desk.session ? <p className="mt-1 text-xs text-subtle">{desk.session}</p> : null}
      <button
        type="button"
        className="mt-2 min-h-11 rounded-sm bg-panel-2 px-2 text-sm"
        onClick={() => {
          const s = useIntel.getState();
          if (pinned) {
            s.unpinStream(iso2);
            return;
          }
          if (s.streamPins.length >= STREAM_CAP) {
            flash("Eight pins is the cap");
            return;
          }
          s.pinStream(iso2);
        }}
      >
        {pinned ? `Unpin this desk (${pins.length}/${STREAM_CAP})` : `Pin this desk (${pins.length}/${STREAM_CAP})`}
      </button>
      {pins.length > 0 ? (
        <button
          type="button"
          className="mt-1 min-h-11 rounded-sm bg-panel-2 px-2 text-sm"
          onClick={() => useIntel.getState().setDesk({ system: "kept", id: "streams" })}
        >
          View streams
        </button>
      ) : null}
      {roster?.sourceUrl ? (
        <a
          href={roster.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-block text-xs underline decoration-line underline-offset-2"
        >
          Source register
        </a>
      ) : null}
      <p className="mt-2 text-xs text-subtle">
        Names from the public register on disk. Delayed. Not a live roll.
        {roster?.retrieved ? ` As of ${roster.retrieved}.` : ""}
      </p>
      {roster?.hole ? <p className="mt-2 text-sm text-muted">{roster.hole}</p> : null}
      {roster && roster.items.length > 0 ? (
        <ul className="mt-2 space-y-1 text-sm">
          {roster.items.map((m) => (
            <li key={m.id}>
              {m.url ? (
                <a
                  href={m.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-line underline-offset-2"
                >
                  {m.name}
                </a>
              ) : (
                m.name
              )}
              {m.caucus || m.seat ? (
                <span className="block text-xs text-muted">
                  {[m.caucus, m.seat].filter(Boolean).join(" · ")}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Chip({ id, rest }: { id: string; rest?: boolean }) {
  const chip = permitChip(id, rest);
  return (
    <span className="rounded-sm bg-panel-2 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted">
      {chip}
    </span>
  );
}

function openPermit(place: PlaceDesk, rest = false) {
  const s = useIntel.getState();
  if (rest) rememberRestPlace(place);
  s.setDesk({ system: "permit", id: place.id });
  void s.engine?.lookupPlace(`${place.name} ${place.state}`);
}

function PermitHits({ query, restHits }: { query: string; restHits?: PlaceDesk[] }) {
  const hits = searchAhj(query);
  const rest = restHits ?? [];
  return (
    <div>
      <p className="text-xs text-muted">
        {hits.length} Core/Extra/More
        {rest.length ? ` · ${rest.length} Rest (provisional)` : " · Rest not mapped"}
      </p>
      <ul className="mt-2 space-y-1">
        {hits.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              className="min-h-11 w-full rounded-sm px-1 text-left hover:bg-panel-2"
              onClick={() => openPermit(p)}
            >
              <span className="block text-sm">
                {p.name}, {p.state}
                <Chip id={p.id} />
              </span>
              <span className="block truncate text-xs text-muted">
                {p.kind} · {p.ahjName}
              </span>
            </button>
          </li>
        ))}
        {rest.map((p) => (
          <li key={`rest-${p.id}`}>
            <button
              type="button"
              className="min-h-11 w-full rounded-sm px-1 text-left hover:bg-panel-2"
              onClick={() => openPermit(p, true)}
            >
              <span className="block text-sm">
                {p.name}, {p.state}
                <Chip id={p.id} rest />
              </span>
              <span className="block truncate text-xs text-muted">
                Rest · {p.kind} · portal not verified
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PermitCard({ place, rest }: { place: PlaceDesk; rest?: boolean }) {
  const state = getState(place.state);
  const [kind, setKind] = useState<ProjectKind | "">("");
  const book = kind ? getPlaybook(kind) : undefined;
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-2">
        <h2 className="font-display text-xl font-semibold tracking-wide">
          {place.name}, {place.state}
        </h2>
        <Chip id={place.id} rest={rest} />
      </div>
      <p className="text-xs text-muted">
        {place.ahjName} · {place.kind}
      </p>
      <p className="mt-2 text-xs">
        <a href={place.portalUrl} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-2">
          {place.portalName}
        </a>
        <span className="text-subtle"> · portal not verified</span>
      </p>
      <p className="mt-1 text-xs">
        <a href={place.departmentUrl} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-2">
          Department page
        </a>
      </p>
      {state ? (
        <div className="mt-3">
          <p className="kicker">State pack</p>
          <p className="mt-1 text-xs text-muted">{state.modelBase}</p>
          <p className="mt-1 text-xs">{state.commonPermits.slice(0, 8).join(" · ")}</p>
        </div>
      ) : null}
      <label className="kicker mt-3 block">
        Playbook
        <select
          className="mt-1 block min-h-11 w-full rounded-sm bg-panel-2 px-2 text-sm text-fg"
          value={kind}
          onChange={(e) => setKind(e.target.value as ProjectKind | "")}
        >
          <option value="">Choose work kind</option>
          {PLAYBOOKS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </label>
      {book ? <p className="mt-2 text-xs text-muted">{book.summary}</p> : null}
    </div>
  );
}

function PermitHome() {
  const [q, setQ] = useState("");
  const restOn = useIntel((s) => s.permitRest);
  const [restHits, setRestHits] = useState<PlaceDesk[]>([]);
  const hits = searchAhj(q);
  const counts = ahjCountByState();
  const states = Object.entries(STATE_CENTROIDS)
    .filter(([code]) => (counts.get(code) ?? 0) > 0)
    .sort(([a], [b]) => a.localeCompare(b));
  useEffect(() => {
    if (!restOn || q.trim().length < 3) {
      setRestHits([]);
      return;
    }
    let live = true;
    void searchRestAhj(q).then((rows) => {
      if (live) setRestHits(rows);
    });
    return () => {
      live = false;
    };
  }, [q, restOn]);
  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Type a state or place"
        className="min-h-11 w-full rounded-sm bg-panel-2 px-2 text-sm outline-none"
        aria-label="Type a state or place"
      />
      <label className="mt-2 flex min-h-9 items-center gap-2 text-xs text-muted">
        <input
          type="checkbox"
          checked={restOn}
          onChange={(e) => useIntel.getState().setPermitRest(e.target.checked)}
        />
        Include Rest (provisional, 20-hit cap)
      </label>
      {!q ? (
        <>
          <p className="mt-2 text-xs text-subtle">
            Nationwide catalog. Type a state or place. Rest stays a count until opted in.
          </p>
          <p className="kicker mt-3">By state</p>
          <ul className="mt-1 space-y-1">
            {states.map(([code, pos]) => {
              const n = counts.get(code) ?? 0;
              const name = getState(code)?.name ?? code;
              return (
                <li key={code}>
                  <button
                    type="button"
                    className="min-h-11 w-full rounded-sm px-1 text-left hover:bg-panel-2"
                    onClick={() => {
                      const s = useIntel.getState();
                      s.engine?.flyTo(pos.lon, pos.lat, 700_000);
                      s.setDesk({ system: "permit", id: `search:${code}` });
                    }}
                  >
                    <span className="block text-sm">{name}</span>
                    <span className="block truncate text-xs text-muted">
                      {code} · {n} Core/Extra/More · Rest not mapped
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <>
          <PermitHits query={q} restHits={restOn ? restHits : []} />
          {hits.length === 0 && restHits.length === 0 ? (
            <p className="mt-2 text-sm text-muted">No match in this catalog.</p>
          ) : null}
        </>
      )}
    </div>
  );
}

function PermitBody({ id }: { id: string }) {
  if (id.startsWith("search:")) return <PermitHits query={id.slice(7)} />;
  if (id.startsWith("playbook:")) {
    const book = getPlaybook(id.slice(9));
    return (
      <div>
        <h2 className="font-display text-xl font-semibold tracking-wide">{book?.label ?? "Playbook"}</h2>
        <p className="mt-1 text-xs text-muted">{book?.summary ?? "Unknown work kind."}</p>
        <p className="mt-2 text-xs text-subtle">Pick an AHJ to attach this playbook. Rest is not searched.</p>
        <div className="mt-3">
          <PermitHome />
        </div>
      </div>
    );
  }
  const place = getSearchablePlace(id) ?? getCachedRestPlace(id);
  if (place) return <PermitCard place={place} rest={!getSearchablePlace(id)} />;
  return <PermitHome />;
}

function CompareShell({ spec }: { spec: string }) {
  const parts = spec.split(":");
  const isoA = parts[1] ?? "";
  const isoB = parts[2] ?? "";
  const [pack, setPack] = useState<ComparePack | null>(null);
  useEffect(() => {
    let live = true;
    void comparePacks(isoA, isoB).then((p) => {
      if (live) setPack(p);
    });
    return () => {
      live = false;
    };
  }, [isoA, isoB]);
  const a = pack?.a ?? keptDeskByIso(isoA);
  const b = pack?.b ?? keptDeskByIso(isoB);
  return (
    <div>
      <p className="kicker">Compare</p>
      <p className="mt-1 text-sm">
        {a?.name ?? isoA} · {b?.name ?? isoB}
      </p>
      <table className="mt-2 w-full text-left text-xs">
        <thead>
          <tr className="text-subtle">
            <th className="py-1">Field</th>
            <th>{a?.iso2 ?? isoA}</th>
            <th>{b?.iso2 ?? isoB}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-1">Roster</td>
            <td>{a ? keptCountLine(a) : "—"}</td>
            <td>{b ? keptCountLine(b) : "—"}</td>
          </tr>
          <tr>
            <td className="py-1">Sourced pledges</td>
            <td>{pack ? pack.pledgesA : "…"}</td>
            <td>{pack ? pack.pledgesB : "…"}</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-2 text-xs text-muted">Pledge vs own sourced sentences only. Not an influence score.</p>
      {pack?.sharedIssues.length ? (
        <p className="mt-2 text-xs">
          Same issue_id in both packs: {pack.sharedIssues.join(", ")}. Not a shared pledge.
        </p>
      ) : (
        <p className="mt-2 text-xs text-muted">No overlapping issue_id (or still loading).</p>
      )}
      {pack?.sharedStems.length ? (
        <p className="mt-2 text-xs">
          Folded-stem co-occurrence: {pack.sharedStems.join(", ")}. Not the same legal entity.
        </p>
      ) : (
        <p className="mt-2 text-xs text-muted">No folded-stem co-occurrence in sourced rosters.</p>
      )}
      {pack?.holes.length ? (
        <ul className="mt-2 list-disc space-y-0.5 pl-4 text-xs text-muted">
          {pack.holes.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      ) : null}
      <div className="mt-3 grid gap-1">
        {a ? (
          <button
            type="button"
            className="min-h-11 rounded-sm bg-panel-2 px-2 text-left text-sm"
            onClick={() => useIntel.getState().setDesk({ system: "kept", id: a.iso2 })}
          >
            Open {a.name}
          </button>
        ) : null}
        {b ? (
          <button
            type="button"
            className="min-h-11 rounded-sm bg-panel-2 px-2 text-left text-sm"
            onClick={() => useIntel.getState().setDesk({ system: "kept", id: b.iso2 })}
          >
            Open {b.name}
          </button>
        ) : null}
        <button
          type="button"
          className="min-h-11 rounded-sm bg-panel-2 px-2 text-left text-sm"
          onClick={() => useIntel.getState().setDesk({ system: "kept", id: "streams" })}
        >
          Back to streams
        </button>
      </div>
    </div>
  );
}

function AskPond() {
  return (
    <div className="mt-3">
      <p className="kicker">Ask</p>
      <p className="mt-1 text-xs text-muted">
        Optional. Uses the same Grok comms key as the jump seat. Dark if that key is absent. This
        app does not file FOIA. Not an influence score.
      </p>
      <button
        type="button"
        className="mt-2 min-h-11 rounded-sm bg-panel-2 px-2 text-sm"
        onClick={() => {
          useComms.getState().setOpen(true);
        }}
      >
        Open Grok comms
      </button>
    </div>
  );
}

function MethodPanel() {
  const kits = keptDesks().length;
  const holes = keptAtlasHoles().length;
  return (
    <div>
      <h2 className="font-display text-xl font-semibold tracking-wide">Method</h2>
      <p className="mt-2 text-sm">
        Primary registers beat commentary. Score a sitting against that chamber’s sourced pledge
        sentences, never a party ticket. Incomplete files stay empty. Vacancies are not invented.
      </p>
      <p className="kicker mt-3">Pipeline</p>
      <p className="mt-1 text-xs text-muted">
        Campaign cash ≠ lobbying ≠ grants ≠ contracts ≠ 990. Shared names are folded-stem
        co-occurrence, not the same legal entity, not a score. US filings stay a count. This app
        does not file FOIA.
      </p>
      <p className="kicker mt-3">How a pack completes</p>
      <p className="mt-1 text-xs text-muted">
        A kit on disk is a sourced harvest. This drawer does not fill seats, whip marks, donors, or
        awards. {kits} kits on disk. {holes} listed without a kit. Holes stay holes.
      </p>
      <button
        type="button"
        className="mt-3 min-h-11 rounded-sm bg-panel-2 px-2 text-sm"
        onClick={() => useIntel.getState().setDesk({ system: "kept", id: "streams" })}
      >
        Open streams
      </button>
      <AskPond />
    </div>
  );
}

function StreamsPanel() {
  const pins = useIntel((s) => s.streamPins);
  const [pickA, setPickA] = useState(pins[0] ?? "");
  const [pickB, setPickB] = useState(pins[1] ?? "");
  useEffect(() => {
    setPickA((cur) => (pins.includes(cur) ? cur : (pins[0] ?? "")));
    setPickB((cur) => (pins.includes(cur) ? cur : (pins[1] ?? pins[0] ?? "")));
  }, [pins]);
  return (
    <div>
      <h2 className="font-display text-xl font-semibold tracking-wide">Streams</h2>
      <p className="mt-1 text-xs text-muted">
        Pin up to {STREAM_CAP} country desks. Nothing is auto-pinned. Not a spreadsheet on the
        globe.
      </p>
      {pins.length === 0 ? (
        <p className="mt-2 text-sm text-muted">No pins. Open a country desk and pin it.</p>
      ) : (
        <ul className="mt-2 space-y-1">
          {pins.map((iso) => {
            const d = keptDeskByIso(iso);
            return (
              <li key={iso} className="flex min-h-11 items-center justify-between gap-2">
                <button
                  type="button"
                  className="min-h-11 flex-1 rounded-sm px-1 text-left text-sm hover:bg-panel-2"
                  onClick={() => useIntel.getState().setDesk({ system: "kept", id: iso })}
                >
                  {d?.name ?? iso}
                </button>
                <button
                  type="button"
                  className="min-h-11 rounded-sm bg-panel-2 px-2 text-xs"
                  onClick={() => useIntel.getState().unpinStream(iso)}
                >
                  Unpin
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <p className="kicker mt-3">Themes</p>
      <ul className="mt-1 space-y-2">
        {STREAM_THEMES.map((t) => (
          <li key={t.id}>
            <p className="text-sm">{t.label}</p>
            <p className="text-xs text-muted">{t.note}</p>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-subtle">Six named themes. Two spare pin slots stay empty.</p>
      {pins.length >= 2 ? (
        <div className="mt-3">
          <p className="kicker">Compare two pins</p>
          <label className="mt-1 block text-xs text-muted">
            Desk A
            <select
              className="mt-1 block min-h-11 w-full rounded-sm bg-panel-2 px-2 text-sm text-fg"
              value={pickA}
              onChange={(e) => setPickA(e.target.value)}
            >
              {pins.map((iso) => (
                <option key={iso} value={iso}>
                  {keptDeskByIso(iso)?.name ?? iso}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-2 block text-xs text-muted">
            Desk B
            <select
              className="mt-1 block min-h-11 w-full rounded-sm bg-panel-2 px-2 text-sm text-fg"
              value={pickB}
              onChange={(e) => setPickB(e.target.value)}
            >
              {pins.map((iso) => (
                <option key={iso} value={iso}>
                  {keptDeskByIso(iso)?.name ?? iso}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="mt-2 min-h-11 w-full rounded-sm bg-panel-2 px-2 text-sm"
            disabled={!pickA || !pickB || pickA === pickB}
            onClick={() =>
              useIntel.getState().setDesk({ system: "kept", id: `compare:${pickA}:${pickB}` })
            }
          >
            Compare sourced holes
          </button>
        </div>
      ) : (
        <p className="mt-3 text-xs text-muted">Pin two country desks to compare sourced holes.</p>
      )}
      <div className="mt-3 grid gap-1">
        <button
          type="button"
          className="min-h-11 rounded-sm bg-panel-2 px-2 text-left text-sm"
          onClick={() => useIntel.getState().setDesk({ system: "kept", id: "method" })}
        >
          Method / pipeline
        </button>
        <button
          type="button"
          className="min-h-11 rounded-sm bg-panel-2 px-2 text-left text-sm"
          onClick={() => useIntel.getState().setDesk({ system: "kept", id: "" })}
        >
          Atlas
        </button>
      </div>
      <AskPond />
    </div>
  );
}

function KeptAtlas() {
  const desks = [...keptDesks()].sort((a, b) => a.name.localeCompare(b.name));
  const holes = keptAtlasHoles();
  return (
    <div>
      <p className="text-sm">No desk selected.</p>
      <div className="mt-2 grid gap-1">
        <button
          type="button"
          className="min-h-11 rounded-sm bg-panel-2 px-2 text-left text-sm"
          onClick={() => useIntel.getState().setDesk({ system: "kept", id: "streams" })}
        >
          Streams
        </button>
        <button
          type="button"
          className="min-h-11 rounded-sm bg-panel-2 px-2 text-left text-sm"
          onClick={() => useIntel.getState().setDesk({ system: "kept", id: "method" })}
        >
          Method
        </button>
      </div>
      <p className="kicker mt-3">Kits on disk</p>
      <ul className="mt-1 space-y-0.5 text-sm">
        {desks.map((d) => (
          <li key={d.iso2}>
            <button
              type="button"
              className="min-h-9 w-full rounded-sm px-1 text-left hover:bg-panel-2"
              onClick={() => {
                const s = useIntel.getState();
                if (!s.layers.legislatures.on) {
                  s.setLayer("legislatures", { on: true, freshness: "delayed" });
                }
                s.setDesk({ system: "kept", id: d.iso2 });
                s.engine?.flyTo(d.lon, d.lat, 1_200_000);
              }}
            >
              {d.name}
            </button>
          </li>
        ))}
      </ul>
      <p className="kicker mt-3">Listed without a kit</p>
      <ul className="mt-1 space-y-0.5 text-xs text-muted">
        {holes.map((h) => (
          <li key={h.iso2}>{h.name}</li>
        ))}
      </ul>
    </div>
  );
}

function JobsiteBody({ id }: { id: string }) {
  const [typed, setTyped] = useState(id);
  const pack = id ? lookupPack(id) : null;

  useEffect(() => {
    setTyped(id);
  }, [id]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = normalizeJobsiteQuery(typed);
    if (!q) return;
    useIntel.getState().setDesk({ system: "jobsite", id: q });
  }

  return (
    <div className="space-y-3 text-sm">
      <form className="flex gap-2" onSubmit={submit}>
        <input
          className="min-h-11 min-w-0 flex-1 rounded-sm border border-line bg-panel-2 px-2 text-sm"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          placeholder="Pack name or locality you type"
          aria-label="Jobsite pack or locality"
        />
        <button type="submit" className="min-h-11 shrink-0 rounded-sm bg-accent px-3 text-accent-fg">
          Look up
        </button>
      </form>
      {pack ? (
        <div>
          <h2 className="font-display text-xl font-semibold tracking-wide">{pack.title}</h2>
          <p className="text-xs text-muted">Locality you typed: {pack.locality}</p>
          {pack.rows.length === 0 ? (
            <p className="mt-3 text-muted">
              {JOBSITE_EMPTY} No sourced rows on disk. We do not invent claims.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {pack.rows.map((row) => (
                <li key={row.id}>
                  <p>{row.label}</p>
                  <p className="text-xs text-subtle">
                    {row.basis} · {row.source}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p className="text-muted">
          Type a jobsite or pack name. Nothing loads until you do. No municipality samples ship
          with this desk.
        </p>
      )}
    </div>
  );
}

function InsindBody({ id }: { id: string }) {
  const [typed, setTyped] = useState(id);
  const hit = id ? lookupInsind(id) : null;

  useEffect(() => {
    setTyped(id);
  }, [id]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = normalizeInsindQuery(typed);
    if (!q) return;
    useIntel.getState().setDesk({ system: "insind", id: q });
  }

  return (
    <div className="space-y-3 text-sm">
      <form className="flex gap-2" onSubmit={submit}>
        <input
          className="min-h-11 min-w-0 flex-1 rounded-sm border border-line bg-panel-2 px-2 text-sm"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          placeholder="VIN, plate, USDOT, MC, or company name"
          aria-label="Inspection lookup"
        />
        <button type="submit" className="min-h-11 shrink-0 rounded-sm bg-accent px-3 text-accent-fg">
          Look up
        </button>
      </form>
      {hit ? (
        <div>
          <h2 className="font-display text-xl font-semibold tracking-wide">{INSIND_EMPTY}</h2>
          <p className="text-xs text-muted">You typed: {hit.query}</p>
          <p className="mt-3 text-muted">
            No inspection rows on this tree. We do not dump nationwide files or iframe the live
            index. Incomplete stays empty.
          </p>
        </div>
      ) : (
        <p className="text-muted">
          Type a VIN, plate, USDOT, MC, or company name. Nothing loads until you do. Zero pins at
          orbit.
        </p>
      )}
    </div>
  );
}

function openCivicRef(r: CivicRef) {
  const topic = useLin.getState().topic;
  let id = r.opens.id;
  if (r.opens.system === "permit" && topic) id = `search:${topic}`;
  else if ((r.opens.system === "jobsite" || r.opens.system === "insind") && topic) id = topic;
  useIntel.getState().setDesk({ system: r.opens.system, id });
}

function TopicBar() {
  const topic = useLin((s) => s.topic);
  const desk = useIntel((s) => s.desk);
  const [typed, setTyped] = useState(topic);
  useEffect(() => setTyped(topic), [topic]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const next = typed.trim();
    if (!next) return;
    if (desk?.system === "lin" && desk.id && desk.id !== "network") {
      useLin.getState().setTopic(next);
      const d = linDeskById(desk.id);
      if (d) openLinDesk(d);
      flash(`Topic · ${next}`);
      return;
    }
    void runCommand(`research ${next}`);
  }

  return (
    <form className="space-y-2" onSubmit={submit}>
      <p className="kicker">Topic</p>
      <input
        className="min-h-11 w-full rounded-sm border border-line bg-panel-2 px-2 text-sm"
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        placeholder="What are you trying to find out?"
        aria-label="Your question"
      />
      <div className="flex gap-2">
        <button type="submit" className="min-h-11 flex-1 rounded-sm bg-accent px-3 text-accent-fg">
          Research
        </button>
        {topic ? (
          <button
            type="button"
            className="min-h-11 rounded-sm bg-panel-2 px-3 text-sm"
            onClick={() => useLin.getState().clear()}
          >
            Clear
          </button>
        ) : null}
      </div>
      {topic ? <p className="text-xs text-muted">On the board: {topic}</p> : null}
    </form>
  );
}

function LinIndex() {
  return (
    <div className="space-y-4 text-sm">
      <div>
        <h2 className="font-display text-xl font-semibold tracking-wide">{LIN_NAME}</h2>
        <p className="mt-1 text-xs text-muted">
          Governance, Operations, and Yields. Name a question. Fill only what you can back up. You
          decide.
        </p>
      </div>
      <div>
        <p className="kicker">How to use this</p>
        <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs">
          {HOW_TO.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
      <TopicBar />
      <LanesPanel />
      {PILLARS.map((p) => (
        <div key={p.id}>
          <p className="kicker">{p.label}</p>
          <p className="mt-1 text-xs text-muted">{p.ask}</p>
          <ul className="mt-2 space-y-1">
            {p.deskIds.map((id) => {
              const civic = CIVIC_REFS.find((r) => r.id === id);
              if (civic) {
                return (
                  <li key={id}>
                    <button
                      type="button"
                      className="min-h-11 w-full rounded-sm bg-panel-2 px-2 text-left text-sm"
                      onClick={() => openCivicRef(civic)}
                    >
                      {civic.kicker}
                      <span className="mt-0.5 block text-xs text-subtle">{civic.title}</span>
                    </button>
                  </li>
                );
              }
              const d = linDeskById(id);
              if (!d || d.id === "network") return null;
              return (
                <li key={id}>
                  <button
                    type="button"
                    className="min-h-11 w-full rounded-sm bg-panel-2 px-2 text-left text-sm"
                    onClick={() => openLinDesk(d)}
                  >
                    {d.kicker}
                    <span className="mt-0.5 block text-xs text-subtle">{d.field}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function LinBody({ id }: { id: string }) {
  const desk = linDeskById(id);
  const topic = useLin((s) => s.topic);
  const notes = useLin((s) => s.notes);
  const sources = useLin((s) => s.sources);
  const [url, setUrl] = useState("");
  const [quote, setQuote] = useState("");
  if (!desk || desk.id === "network") return <LinIndex />;

  const deskId = desk.id;
  if (deskId === "fifty") {
    return (
      <div className="space-y-3">
        <TopicBar />
        <MethodCard id="fifty" />
        <FiftyBoard />
        <button
          type="button"
          className="min-h-11 rounded-sm bg-panel-2 px-2 text-sm"
          onClick={() => openLinDesk(linDeskById("network")!)}
        >
          Back to network
        </button>
      </div>
    );
  }
  if (deskId === "opencells") {
    return (
      <div className="space-y-3">
        <TopicBar />
        <MethodCard id="opencells" />
        <OpenCellsBoard />
        <button
          type="button"
          className="min-h-11 rounded-sm bg-panel-2 px-2 text-sm"
          onClick={() => openLinDesk(linDeskById("network")!)}
        >
          Back to network
        </button>
      </div>
    );
  }
  const mine = sources.filter((s) => s.deskId === deskId);

  function attach(e: FormEvent) {
    e.preventDefault();
    if (!topic) {
      flash("Name a topic first");
      return;
    }
    const err = useLin.getState().addSource(deskId, url, quote);
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
        <h2 className="font-display text-xl font-semibold tracking-wide">{desk.title}</h2>
        <p className="mt-1 text-xs text-muted">{desk.field}</p>
        {topic ? <p className="mt-1 text-xs">Topic: {topic}</p> : <p className="mt-1 text-xs text-subtle">Name a topic to use this desk.</p>}
      </div>
      <TopicBar />
      <MethodCard id={deskId} />
      <div>
        <p className="kicker">Boxes</p>
        <ul className="mt-2 space-y-2">
          {desk.cells.map((c) => {
            const key = noteKey(deskId, c.id);
            const filled = Boolean(notes[key]);
            return (
              <li key={c.id} className="rounded-sm border border-line bg-panel-2 px-2 py-1.5">
                <p className="text-xs">
                  {c.label}
                  <span className="ml-2 text-subtle">{filled ? "noted" : "open"}</span>
                </p>
                <textarea
                  className="mt-1 min-h-16 w-full resize-y rounded-sm border border-line bg-void px-2 py-1 text-xs"
                  value={notes[key] ?? ""}
                  onChange={(e) => useLin.getState().setNote(deskId, c.id, e.target.value)}
                  placeholder="Write what you found. It is not proven until you add an official link."
                  aria-label={c.label}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <form className="space-y-2" onSubmit={attach}>
        <p className="kicker">Add an official link</p>
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
          placeholder="The smallest sentence that does the work"
          aria-label="Quote from the official page"
        />
        <button type="submit" className="min-h-11 w-full rounded-sm bg-accent px-3 text-accent-fg">
          Save with link
        </button>
      </form>
      {mine.length > 0 ? (
        <ul className="space-y-1 text-xs">
          {mine.map((s) => (
            <li key={s.id} className="rounded-sm border border-line px-2 py-1.5">
              <p className="truncate">{s.url}</p>
              <p className="text-muted">{s.quote}</p>
              <p className="text-subtle">as of {s.retrieved}</p>
              <button
                type="button"
                className="mt-1 text-xs underline"
                onClick={() => useLin.getState().removeSource(s.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-subtle">No official links here yet. Blank is honest.</p>
      )}
      <button
        type="button"
        className="min-h-11 rounded-sm bg-panel-2 px-2 text-sm"
        onClick={() => openLinDesk(linDeskById("network")!)}
      >
        Back to the board
      </button>
    </div>
  );
}

function keptTitle(id: string) {
  if (id === "streams") return "Streams";
  if (id === "method" || id === "pipeline") return "Method";
  if (id.startsWith("compare:")) return "Compare";
  return "Legislature";
}

export function DeskDrawer() {
  const desk = useIntel((s) => s.desk);
  if (!desk) return null;

  const lin = desk.system === "lin" ? linDeskById(desk.id) : undefined;
  const title =
    desk.system === "kept"
      ? keptTitle(desk.id)
      : desk.system === "jobsite"
        ? desk.id === "claims" || desk.id.startsWith("claims")
          ? "Claims"
          : "Jobsite"
        : desk.system === "insind"
          ? "Inspection desk"
          : desk.system === "lin"
            ? (lin?.kicker ?? "Network")
            : "Building desk";
  const selected = desk.system === "kept" ? keptDeskByIso(desk.id) : null;

  return (
    <aside
      className="panel desk-drawer absolute inset-x-3 top-28 bottom-28 z-20 flex min-h-0 flex-col overflow-hidden p-3 sm:top-16 md:inset-x-auto md:top-20 md:right-4 md:bottom-28 md:w-[22rem]"
      role="dialog"
      aria-label={title}
      data-presence-surface="desk"
      data-desk={desk.system}
      data-desk-id={desk.id}
    >
      <header className="mb-2 flex shrink-0 items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="kicker">{title}</p>
          <p className="truncate text-xs text-subtle">
            {selected
              ? selected.name
              : desk.system === "lin"
                ? (lin?.title ?? LIN_NAME)
                : (desk.system === "jobsite" || desk.system === "insind") && desk.id
                  ? desk.id
                  : "Globe stays up"}
          </p>
        </div>
        <button
          type="button"
          className="grid size-9 place-items-center text-muted"
          onClick={() => useIntel.getState().setDesk(null)}
          aria-label="Close desk"
        >
          <X className="size-4" />
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
        {desk.system === "kept" ? (
          desk.id === "streams" ? (
            <StreamsPanel />
          ) : desk.id === "method" || desk.id === "pipeline" ? (
            <MethodPanel />
          ) : desk.id.startsWith("compare:") ? (
            <CompareShell spec={desk.id} />
          ) : desk.id ? (
            <KeptBody iso2={desk.id} />
          ) : (
            <KeptAtlas />
          )
        ) : desk.system === "jobsite" ? (
          <JobsiteBody id={desk.id} />
        ) : desk.system === "insind" ? (
          <InsindBody id={desk.id} />
        ) : desk.system === "lin" ? (
          <LinBody id={desk.id} />
        ) : (
          <PermitBody id={desk.id} />
        )}
      </div>
      <footer className="mt-2 shrink-0 border-t border-line pt-2 text-xs text-muted">
        {desk.system === "kept"
          ? "Delayed register. Incomplete files stay empty. Not an influence score."
          : desk.system === "jobsite"
            ? JOBSITE_HONESTY
            : desk.system === "insind"
              ? INSIND_HONESTY
              : desk.system === "lin"
                ? (lin?.honesty ?? LIN_HONESTY)
                : DISCLAIMER}
      </footer>
    </aside>
  );
}
