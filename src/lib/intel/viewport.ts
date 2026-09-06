/** Size the globe to the app shell, not a stale window pixel size. */

export function fillViewport(el: HTMLElement) {
  const box = el.parentElement ?? el;
  const w = Math.max(1, Math.round(box.clientWidth || window.innerWidth));
  const h = Math.max(1, Math.round(box.clientHeight || window.innerHeight));
  el.style.width = `${w}px`;
  el.style.height = `${h}px`;
}

export function watchViewport(el: HTMLElement, onChange: () => void): () => void {
  const run = () => onChange();
  const ro = new ResizeObserver(run);
  ro.observe(el.parentElement ?? el);
  window.addEventListener("resize", run);
  window.visualViewport?.addEventListener("resize", run);
  window.visualViewport?.addEventListener("scroll", run);
  run();
  return () => {
    ro.disconnect();
    window.removeEventListener("resize", run);
    window.visualViewport?.removeEventListener("resize", run);
    window.visualViewport?.removeEventListener("scroll", run);
  };
}
