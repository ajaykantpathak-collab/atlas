// motions.js — signature motion choreography (section 1.5 of the bible)
// All transform/opacity only. reduced-motion safe (CSS handles fallback).
(function () {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target;
      const kind = el.dataset.motion;
      el.classList.add("motion-on");
      if (kind === "draw") drawOn(el);
      if (kind === "ignite") ignite(el);
      io.unobserve(el);
    }
  }, { threshold: 0.4 });

  function motionScan() {
    document.querySelectorAll("[data-motion]:not(.motion-on)").forEach(el => io.observe(el));
  }
  window.motionScan = motionScan;
  motionScan();

  // red-pen draw-on: animate stroke-dashoffset of any SVG stroke inside
  function drawOn(el) {
    if (reduced) return;
    el.querySelectorAll("path, line, polyline").forEach((p, i) => {
      const len = p.getTotalLength ? p.getTotalLength() : 60;
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.style.transition = `stroke-dashoffset 0.5s ${0.15 + i * 0.18}s cubic-bezier(0.22,1,0.36,1)`;
      requestAnimationFrame(() => { p.style.strokeDashoffset = "0"; });
    });
  }

  // star ignition: scale+bloom pulse then settle
  function ignite(el) {
    if (reduced) return;
    el.animate([
      { transform: "scale(1)", filter: "brightness(1)" },
      { transform: "scale(1.9)", filter: "brightness(3)", offset: 0.35 },
      { transform: "scale(1)", filter: "brightness(1.25)" }
    ], { duration: 600, easing: "cubic-bezier(0.22,1,0.36,1)", fill: "forwards" });
  }
})();

// --- page-turn: work-layer question advance, answer-book feel ---
window.pageTurn = function (el, swap) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !el) { swap(); return; }
  el.animate([
    { transform: "translateX(0)", opacity: 1 },
    { transform: "translateX(-30px)", opacity: 0 }
  ], { duration: 170, easing: "ease-in", fill: "forwards" }).onfinish = () => {
    swap();
    el.animate([
      { transform: "translateX(30px)", opacity: 0 },
      { transform: "translateX(0)", opacity: 1 }
    ], { duration: 230, easing: "cubic-bezier(0.22,1,0.36,1)", fill: "forwards" });
  };
};

// --- shared UI helpers used by pages ---
function pick(el) { // practice/exam option select
  el.closest(".paper-opts").querySelectorAll("li").forEach(li => li.classList.remove("picked"));
  el.classList.add("picked");
}
function grade(list) { // mark picked options right/wrong (demo)
  document.querySelectorAll(".paper-opts li[data-correct]").forEach(li => {
    if (li.classList.contains("picked")) li.classList.add("right");
  });
  document.querySelectorAll(".paper-opts li.picked:not(.right)").forEach(li => li.classList.add("wrong"));
}
