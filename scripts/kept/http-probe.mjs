#!/usr/bin/env node
/** Probe one URL. 403 is a miss. Prints JSON. */
const UA = "LPIN-CommandCenter/0.1 (AdventureNLearn; civic open-data harvest)";
const BROWSER =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";
const url = process.argv[2];
if (!url) {
  console.error("usage: node http-probe.mjs URL");
  process.exit(2);
}
async function once(ua) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "User-Agent": ua, Accept: "application/json,text/html,application/xml,text/xml,*/*" },
      signal: ctrl.signal,
    });
    const buf = Buffer.from(await res.arrayBuffer());
    const text = buf.subarray(0, 400).toString("utf8").replace(/\s+/g, " ");
    return {
      url,
      status: res.status,
      ok: res.ok,
      content_type: res.headers.get("content-type") || "",
      bytes: buf.length,
      snippet: text.slice(0, 240),
    };
  } catch (e) {
    return { url, status: 0, ok: false, error: e.name === "AbortError" ? "timeout" : e.message };
  } finally {
    clearTimeout(t);
  }
}
const first = await once(UA);
if (first.status === 403) {
  const second = await once(BROWSER);
  second.retry = "browser-ua";
  console.log(JSON.stringify(second, null, 2));
} else {
  console.log(JSON.stringify(first, null, 2));
}
