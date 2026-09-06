import { LAYER_META, type SceneId } from "./types";
import { flash, useIntel } from "./store";

function wait(ms: number) {
  return new Promise<void>((r) => window.setTimeout(r, ms));
}

export async function playScene(id: SceneId) {
  const s = useIntel.getState();
  const engine = s.engine;
  if (!engine) return;
  s.dismissFirstRun(false);

  if (id === "orbital") {
    s.setLayer("satellites", { on: true, freshness: LAYER_META.satellites.freshness });
    engine.setStyle("noir");
    engine.resetGlobe();
    flash("Staring at space. ISS incoming.");
    await wait(1600);
    engine.trackNearest("iss");
    return;
  }

  if (id === "night") {
    s.setLayer("flights", { on: true, freshness: LAYER_META.flights.freshness });
    engine.setStyle("nvg");
    engine.setMapSource("night");
    engine.resetGlobe();
    flash("Night goggles. Public flights.");
    await wait(1400);
    engine.trackNearest("flight");
    return;
  }

  s.setLayer("fires", { on: true, freshness: LAYER_META.fires.freshness });
  engine.setStyle("flir");
  engine.resetGlobe();
  s.setPlace("Earth");
  flash("Public fire detections. Not a forecast.");
}
