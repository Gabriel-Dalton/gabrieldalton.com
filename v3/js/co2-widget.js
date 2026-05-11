(function () {
  'use strict';
  if (window.__co2WidgetMounted) return;
  window.__co2WidgetMounted = true;

  // A small floating widget that showcases one specific client project,
  // Mittler Senior Technology. All numbers come from that case study only.
  // Nothing here makes any claim about the site the widget is loaded on.

  var widget = document.createElement('aside');
  widget.className = 'co2-widget';
  widget.setAttribute('aria-label', 'Sustainability case study');
  widget.innerHTML =
    '<button class="co2-launcher" type="button" aria-expanded="false" aria-controls="co2Panel">' +
      '<svg class="co2-launcher-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-3.6 15.8-8.2 17.04Z"/>' +
        '<path d="M2 21c0-3 1.85-5.36 5.08-6"/>' +
      '</svg>' +
      '<span class="co2-launcher-label co2-launcher-label--long">Sustainability case study</span>' +
      '<span class="co2-launcher-label co2-launcher-label--short">Case study</span>' +
    '</button>' +
    '<div class="co2-panel" id="co2Panel" hidden>' +
      '<button class="co2-close" type="button" aria-label="Close">×</button>' +
      '<p class="co2-eyebrow">Case study · Mittler Senior Technology</p>' +
      '<p class="co2-task">A nonprofit that teaches seniors how to use technology, run by students. I rebuilt their website to be much lighter on the planet. Same content, same features, a small fraction of the footprint.</p>' +
      '<div class="co2-headline" aria-hidden="true">' +
        '<span class="co2-headline-num" data-co2-headline>0</span>' +
        '<span class="co2-headline-unit">%</span>' +
      '</div>' +
      '<p class="co2-headline-caption"><strong>less CO<sub>2</sub></strong> per page visit, after I rebuilt the site.</p>' +
      '<div class="co2-compare">' +
        '<div class="co2-compare-row">' +
          '<span class="co2-compare-label">Old site, per visit</span>' +
          '<span class="co2-compare-value">5.31 g <span class="co2-rating" title="Website Carbon grade F">F</span></span>' +
        '</div>' +
        '<div class="co2-compare-row">' +
          '<span class="co2-compare-label">New site, per visit</span>' +
          '<span class="co2-compare-value co2-compare-value--actual">0.10 g <span class="co2-rating co2-rating--good" title="Website Carbon grade B">B</span></span>' +
        '</div>' +
      '</div>' +
      '<p class="co2-scale-title">Across 100,000 visits a year</p>' +
      '<ul class="co2-scale-list">' +
        '<li><strong>6.25 tonnes</strong> of CO<sub>2</sub> kept out of the air, every year.</li>' +
        '<li>About <strong>280 trees</strong> worth of yearly absorption, saved.</li>' +
        '<li><strong>16,000 kWh</strong> of electricity saved, about two BC homes for a year.</li>' +
      '</ul>' +
      '<p class="co2-cta"><a href="portfolio/mittler-senior-technology.html">Read the full case study →</a></p>' +
      '<p class="co2-fineprint">Carbon measured with <a href="https://www.websitecarbon.com" target="_blank" rel="noopener">Website Carbon</a>. Built through my nonprofit, <a href="https://oasisofchange.org" target="_blank" rel="noopener">Oasis of Change</a>.</p>' +
    '</div>';
  document.body.appendChild(widget);

  var btn = widget.querySelector('.co2-launcher');
  var panel = widget.querySelector('.co2-panel');
  var close = widget.querySelector('.co2-close');
  var headlineEl = widget.querySelector('[data-co2-headline]');

  // The case-study link is relative to the site root. Nested pages
  // (/portfolio/*, /writing/*) need a "../" prefix.
  var caseStudyLink = widget.querySelector('a[href$="mittler-senior-technology.html"]');
  if (caseStudyLink) {
    var path = window.location.pathname;
    if (/\/(portfolio|writing)\//.test(path)) {
      caseStudyLink.setAttribute('href', '../portfolio/mittler-senior-technology.html');
    }
  }

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasAnimated = false;

  function animateHeadline() {
    if (hasAnimated) return;
    hasAnimated = true;
    if (prefersReducedMotion) {
      headlineEl.textContent = '98';
      return;
    }
    var start = performance.now();
    var duration = 900;
    function step(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      headlineEl.textContent = Math.round(98 * eased);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function open() {
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    animateHeadline();
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
