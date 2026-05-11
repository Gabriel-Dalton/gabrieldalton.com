(function () {
  'use strict';
  if (window.__co2WidgetMounted) return;
  window.__co2WidgetMounted = true;

  // Per-visit emissions from the Mittler Senior Technology case study —
  // a typical heavy site vs. the optimised version we shipped:
  //   typical: 5.31 g CO₂ per visit
  //   actual:  0.10 g CO₂ per visit  (98.1% reduction)
  // The per-visit cost is spread across an industry-average 53 s session
  // to derive a per-second rate. The "actual" site is treated as ~0 g/s
  // after page-load — an optimised static page has no ongoing analytics,
  // ads, or polling, so it stops emitting once it's loaded.
  var TYPICAL_PER_VISIT_G = 5.31;
  var OPTIMISED_PER_VISIT_G = 0.10;
  var SESSION_S = 53;
  var TYPICAL_RATE_G_PER_S = TYPICAL_PER_VISIT_G / SESSION_S;
  var PER_VISIT_SAVINGS_G = TYPICAL_PER_VISIT_G - OPTIMISED_PER_VISIT_G;
  var STORAGE_KEY = 'gd_co2_session_saved_v1';

  // Carry over savings from prior pages in this browser session.
  var sessionBaseG = 0;
  try {
    sessionBaseG = parseFloat(sessionStorage.getItem(STORAGE_KEY)) || 0;
  } catch (_) { /* sessionStorage disabled / blocked */ }
  // This page load itself avoids one "typical visit" worth of emissions.
  sessionBaseG += PER_VISIT_SAVINGS_G;
  var pageLoadTime = (window.performance && performance.now) ? performance.now() : Date.now();

  function elapsedSeconds() {
    var now = (window.performance && performance.now) ? performance.now() : Date.now();
    return (now - pageLoadTime) / 1000;
  }
  function liveSaved() {
    return sessionBaseG + elapsedSeconds() * TYPICAL_RATE_G_PER_S;
  }
  function liveTypical() {
    return TYPICAL_PER_VISIT_G + elapsedSeconds() * TYPICAL_RATE_G_PER_S;
  }
  function liveActual() {
    return OPTIMISED_PER_VISIT_G;
  }
  function fmt(grams) {
    if (grams < 1) return Math.round(grams * 1000) + ' mg';
    if (grams < 1000) return grams.toFixed(1) + ' g';
    return (grams / 1000).toFixed(2) + ' kg';
  }

  var widget = document.createElement('aside');
  widget.className = 'co2-widget';
  widget.setAttribute('aria-label', 'Carbon savings on this site');
  widget.innerHTML =
    '<button class="co2-launcher" type="button" aria-expanded="false" aria-controls="co2Panel">' +
      '<svg class="co2-launcher-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-3.6 15.8-8.2 17.04Z"/>' +
        '<path d="M2 21c0-3 1.85-5.36 5.08-6"/>' +
      '</svg>' +
      '<span class="co2-launcher-label">' +
        '<span class="co2-launcher-label-prefix">Saved </span>' +
        '<span data-co2-pill class="co2-launcher-num">0 mg</span>' +
      '</span>' +
    '</button>' +
    '<div class="co2-panel" id="co2Panel" hidden>' +
      '<button class="co2-close" type="button" aria-label="Close">×</button>' +
      '<p class="co2-eyebrow">CO₂ saved this session</p>' +
      '<p class="co2-figure-saved" aria-live="polite"><span data-co2-saved>0 mg</span></p>' +
      '<p class="co2-figure-note">…and counting, since you started browsing this site.</p>' +
      '<div class="co2-compare">' +
        '<div class="co2-compare-row">' +
          '<span class="co2-compare-label">A typical site would have used</span>' +
          '<span class="co2-compare-value" data-co2-typical>0 g</span>' +
        '</div>' +
        '<div class="co2-compare-row">' +
          '<span class="co2-compare-label">This page actually used</span>' +
          '<span class="co2-compare-value co2-compare-value--actual" data-co2-actual>0 mg</span>' +
        '</div>' +
      '</div>' +
      '<div class="co2-scale">' +
        '<p class="co2-scale-title">Benchmark · Mittler Senior Technology</p>' +
        '<ul class="co2-scale-list">' +
          '<li><strong>98%</strong> less CO₂, energy, and water per visit — <strong>F → B</strong> Website Carbon rating.</li>' +
          '<li>At 100k visits a year: <strong>6.25 t</strong> of CO₂ avoided — the work of <strong>~280 trees</strong>.</li>' +
          '<li><strong>16,320 kWh</strong> of electricity saved — roughly two BC homes for a year.</li>' +
        '</ul>' +
      '</div>' +
      '<p class="co2-fineprint">Methodology via <a href="https://www.websitecarbon.com" target="_blank" rel="noopener">Website Carbon</a> · case study at <a href="portfolio/mittler-senior-technology.html">/portfolio/mittler-senior-technology</a> · more at <a href="https://oasisofchange.org" target="_blank" rel="noopener">oasisofchange.org</a></p>' +
    '</div>';
  document.body.appendChild(widget);

  var btn = widget.querySelector('.co2-launcher');
  var panel = widget.querySelector('.co2-panel');
  var close = widget.querySelector('.co2-close');
  var pillNumEl = widget.querySelector('[data-co2-pill]');
  var savedEl = widget.querySelector('[data-co2-saved]');
  var typicalEl = widget.querySelector('[data-co2-typical]');
  var actualEl = widget.querySelector('[data-co2-actual]');

  // The case-study link is relative to the site root. Nested pages
  // (e.g. /portfolio/something) need a "../" prefix.
  var caseStudyLink = widget.querySelector('.co2-fineprint a[href$="mittler-senior-technology.html"]');
  if (caseStudyLink) {
    var path = window.location.pathname;
    if (/\/(portfolio|writing)\//.test(path)) {
      caseStudyLink.setAttribute('href', '../portfolio/mittler-senior-technology.html');
    }
  }

  function render() {
    pillNumEl.textContent = fmt(liveSaved());
    if (!panel.hidden) {
      savedEl.textContent = fmt(liveSaved());
      typicalEl.textContent = fmt(liveTypical());
      actualEl.textContent = fmt(liveActual());
    }
  }
  function persist() {
    try { sessionStorage.setItem(STORAGE_KEY, liveSaved().toString()); } catch (_) { /* ignore */ }
  }

  render();
  // 1 s tick keeps the pill alive without burning battery. RAF would be smoother
  // but most users will look at the number, not stare at it animate.
  var tickInterval = setInterval(render, 1000);
  var persistInterval = setInterval(persist, 5000);
  window.addEventListener('pagehide', persist);

  function open() {
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    render();
  }
  function shut() {
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (panel.hidden) open(); else shut();
  });
  close.addEventListener('click', function (e) { e.stopPropagation(); shut(); });
  document.addEventListener('click', function (e) {
    if (!widget.contains(e.target) && !panel.hidden) shut();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) shut();
  });
})();
