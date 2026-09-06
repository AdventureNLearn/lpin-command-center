export function isPhone(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const q = new URLSearchParams(window.location.search);
    if (q.get("globe") === "1") return false;
    if (q.get("flat") === "1") return true;
  } catch {
    /* ignore */
  }
  // Desktop Cesium always. Width does not switch engines. Flat tiles only
  // on a real phone UA (or ?flat=1).
  return /Android|iPhone|iPod|Mobile/i.test(navigator.userAgent);
}
