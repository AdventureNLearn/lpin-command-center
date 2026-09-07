import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

export type GlobeContext = {
  place: string;
  style: string;
  cam: { lat: number; lon: number; height: number };
  tracked: {
    kind: string;
    name: string;
    meta: string;
    lat: number;
    lon: number;
    altM: number;
    heading: number;
    speedMs: number;
    source: string;
    freshness: string;
  } | null;
  weather: { temp: string; wind: string; sky: string } | null;
  layers: { id: string; on: boolean; count: number; detail: string }[];
  radio: { station: string; playing: boolean } | null;
  workbook?: { title: string; country: string; industry: string; tab: string; source_n: number };
};

type ChatTurn = { role: "user" | "assistant"; content: string };

const buckets = new Map<string, { n: number; t: number }>();

function clientKey() {
  try {
    const req = getRequest();
    const xf = req.headers.get("x-forwarded-for");
    if (xf) return xf.split(",")[0]?.trim() || "anon";
    return req.headers.get("x-real-ip") || "anon";
  } catch {
    return "anon";
  }
}

function allow(ip: string) {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now - b.t > 10 * 60_000) {
    buckets.set(ip, { n: 1, t: now });
    return true;
  }
  if (b.n >= 24) return false;
  b.n += 1;
  return true;
}

const SYSTEM = `You are Grok, jump-seat operator in the LPIN Intelligence Network — a civic command center on a public 3D Earth cockpit. The feeds are public (ADS-B, CelesTrak, USGS, NASA EONET, Launch Library). SME desks: legal, regulatory, technical, jurisdictional, operational, engineering, commerce, governance. Nothing here is classified. Not for navigation. Not legal advice. Not a score.

Voice: Grok. Dry, useful, short. A joke is optional seasoning, never the meal. Answer the ask first. 1–3 tight paragraphs unless they ask for more. No markdown headings. No emoji spam. No fake "accessing satellites" theater.

Use the current globe (place, camera, tracked contact, layers, weather, radio) plus catalogs on disk. If they have a contact locked, talk about THAT object. If a feed is simulated or delayed, say so.
Everyday: plain English, a card, they press Look here if they want the map — they never have to. Names on disk, or an honest empty.
Serious: delayed / sourced / hole language. 196 legislature kits as filed (honest empty where no public source). Permit portals unverified. No auto-score, auto-truth, or auto-zoom.

Honesty: public feeds and catalogs only. Insight body is guidance, not a certified fact, not a score, not a city login. Do not invent claims, sittings, donors, names, or portals. Do not say verified, live portal, certified, or I checked the login. Factory URLs are unverified. Jobsite packs are empty holes until the user types a pack. Incomplete is empty — say we do not have that pack yet. Not a live claims desk. No operator skill brands. Human presses Look here / Open the file / Show on the map.

Prefer INSIGHT. When a place, desk, or feed is relevant, do NOT fly the globe unless they asked to go/fly/take me/show me on the globe. Append exactly one last line, never in the spoken paragraphs:
<<INSIGHT:{"title":"what they named","body":"What is on disk this turn. Look here if you want the map to follow.","system":"intel","q":"what they named"}>>
system is intel | kept | permit | jobsite | insind | lin. Optional layer (flights, permits, legislatures, jobsite, …). Optional desk {"system":"lin","id":"legal"} for an SME desk they named, or {"system":"kept","id":"iso2 they named"} for any country kit on disk (196 ISO2 folders).
q is only what they named this turn — a place they typed, or a country they named (iso2 or country name matching a kit on disk). Do not invent a demo city. Do not seed q with a canned municipality. If they named a country with no kit, say so and leave q empty. Body names the useful fact (chamber · named of seats, or no sourced roster; permit unverified; jobsite hole).

You may move the globe or punch the radio ONLY when they asked, by appending exactly one last line:
<<ACTION:{"type":"flyTo","q":"what they named"}>>
Allowed ACTION types: flyTo (q), trackNearest (kind: flight|vessel|satellite|iss), style (style: normal|crt|nvg|flir|noir|snow), layer (id + on), cockpit (on), radio (id: station id such as ccr, skynyrd, floyd, zeppelin, cash, seventies, or next/prev; on), reset, next.
Do not emit ACTION flyTo for a normal question. Prefer INSIGHT. One tag line, not both.

Radio: artist channels are Exclusive Radio public internet streams. Mixes are SomaFM. Not downloads. If they name a band on the rack, punch that station.

Research workbook and comprehensive civic toolkit:
Countries first. The United States kit is the most complete pack on disk, not a finished one. When they name another country, give it that same attention: official source_url, retrieved date, the full object set, honest empty where nothing sourced. Do not treat US as done (House-only sitting file; ethics/lobby samples). Not a political clone. They type their own county or place; do not seed a municipality. Law, permitting, trades, industries, and regulations hang off a country pack. You never invent coverage to look finished.
Reason from the stack. Dirt is not shingles. Field is not boardroom. A trade quote is not a permit. A board vote is not an inspection. Do not skip a layer.
Country and industry are two facets. Then keep law, permitting, trades, regulations, funding, political, and corporate on separate tabs. Never one influence score. Presence is not capture.
Primary record beats commentary. Quote plus official URL, or the cell stays open. Status in the same sentence. Supported / Unproven / Disputed. Evidence / Inference / Assumption. Human keeps the call.
Kit files on disk are delayed catalogs. If a roster or money file is on disk, name the count and the source URL. If empty, say we do not have that pack yet.
When they name country+industry, prefer INSIGHT with system lin and desk {"system":"lin","id":"workbook"}, and you MAY also append:
<<ACTION:{"type":"workbook","country":"iso2 or country they named","industry":"industry they named"}>>
Do not fly the globe for a research question.`;

function clipContext(ctx: GlobeContext): GlobeContext {
  return {
    place: String(ctx.place ?? "Earth").slice(0, 80),
    style: String(ctx.style ?? "normal").slice(0, 16),
    cam: {
      lat: Number(ctx.cam?.lat) || 0,
      lon: Number(ctx.cam?.lon) || 0,
      height: Number(ctx.cam?.height) || 0,
    },
    tracked: ctx.tracked
      ? {
          kind: String(ctx.tracked.kind).slice(0, 24),
          name: String(ctx.tracked.name).slice(0, 80),
          meta: String(ctx.tracked.meta).slice(0, 160),
          lat: Number(ctx.tracked.lat) || 0,
          lon: Number(ctx.tracked.lon) || 0,
          altM: Number(ctx.tracked.altM) || 0,
          heading: Number(ctx.tracked.heading) || 0,
          speedMs: Number(ctx.tracked.speedMs) || 0,
          source: String(ctx.tracked.source).slice(0, 80),
          freshness: String(ctx.tracked.freshness).slice(0, 24),
        }
      : null,
    weather: ctx.weather,
    layers: (ctx.layers ?? []).slice(0, 8).map((l) => ({
      id: String(l.id).slice(0, 24),
      on: Boolean(l.on),
      count: Number(l.count) || 0,
      detail: String(l.detail ?? "").slice(0, 80),
    })),
    radio: ctx.radio
      ? { station: String(ctx.radio.station).slice(0, 48), playing: Boolean(ctx.radio.playing) }
      : null,
    workbook: ctx.workbook
      ? {
          title: String(ctx.workbook.title ?? "").slice(0, 80),
          country: String(ctx.workbook.country ?? "").slice(0, 2),
          industry: String(ctx.workbook.industry ?? "").slice(0, 24),
          tab: String(ctx.workbook.tab ?? "").slice(0, 16),
          source_n: Number(ctx.workbook.source_n) || 0,
        }
      : undefined,
  };
}

export const askGrok = createServerFn({ method: "POST" })
  .validator((input: { messages: ChatTurn[]; context: GlobeContext }) => input)
  .handler(async ({ data }): Promise<{ ok: true; text: string } | { ok: false; error: string }> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "Comms are dark in this environment. The globe still works." };
    if (!allow(clientKey())) return { ok: false, error: "Comms are busy. Give it a few minutes." };

    const messages = (data.messages ?? [])
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-8)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 500) }));
    if (!messages.length || messages[messages.length - 1]?.role !== "user") {
      return { ok: false, error: "Say something first." };
    }

    const ctx = clipContext(data.context);
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: ctx.workbook?.title ? 900 : 420,
        temperature: ctx.workbook?.title ? 0.35 : 0.85,
        messages: [
          { role: "system", content: SYSTEM },
          {
            role: "system",
            content: `Current globe: ${JSON.stringify(ctx)}`,
          },
          ...messages,
        ],
      }),
    });
    if (!res.ok) {
      if (res.status === 429) return { ok: false, error: "Grok's queue is full. Try again in a bit." };
      return { ok: false, error: `Comms error ${res.status}` };
    }
    const body = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false, error: "Grok stared into space and said nothing." };
    return { ok: true, text: text.slice(0, 4000) };
  });
