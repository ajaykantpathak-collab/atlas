// chrome.js — shared specimen bar + footer, injected per page
(function () {
  const PAGES = [
    ["index.html", "Landing"],
    ["galaxy.html", "Galaxy"],
    ["story.html", "Learn"],
    ["practice.html", "Practice"],
    ["exam.html", "Exam"],
    ["solve.html", "Solve"],
    ["dashboard.html", "Dashboard"],
    ["passport.html", "Passport"],
    ["junior.html", "Junior"],
    ["pricing.html", "Pricing"],
    ["login.html", "Sign in"]
  ];
  const here = location.pathname.split("/").pop() || "index.html";
  const bar = document.querySelector("[data-specimen-bar]");
  if (bar) {
    bar.innerHTML = `
      <a class="brand" href="index.html">Atlas · Concept</a>
      <nav>${PAGES.map(([h, t]) =>
        `<a href="${h}" class="${h === here ? "here" : ""}">${t}</a>`).join("")}
      </nav>`;
  }
  const foot = document.querySelector("[data-specimen-foot]");
  if (foot) {
    foot.innerHTML = `
      <span class="specimen">Atlas concept — detached design study</span>
      <span class="specimen gold">Every answer verified. The dark stays honest.</span>`;
  }
})();
