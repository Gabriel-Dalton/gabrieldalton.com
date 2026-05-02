(function () {
  'use strict';
  if (window.__newsletterWidgetMounted) return;
  window.__newsletterWidgetMounted = true;

  var EMBED_ID = '97733971566';
  var LOADER_SRC = 'https://js.supascribe.com/v1/loader/Y1ZIPKYKPQZ2b5HzgJdOHBpIFML2.js';

  var widget = document.createElement('aside');
  widget.className = 'newsletter-widget';
  widget.setAttribute('aria-label', 'Newsletter');
  widget.innerHTML =
    '<button class="newsletter-launcher" type="button" aria-expanded="false" aria-controls="newsletterPanel">' +
      'Follow my journey' +
    '</button>' +
    '<div class="newsletter-panel" id="newsletterPanel" hidden>' +
      '<button class="newsletter-close" type="button" aria-label="Close">×</button>' +
      '<h3>A short letter, once a month.</h3>' +
      '<p>Real updates from a youth in tech, building a greener web. No spam.</p>' +
      '<div data-supascribe-embed-id="' + EMBED_ID + '" data-supascribe-subscribe></div>' +
      '<p class="newsletter-fineprint">Privacy-respecting · sent from Substack.</p>' +
    '</div>';
  document.body.appendChild(widget);

  // Load the Supascribe loader once
  if (!document.querySelector('script[data-supascribe-loader]')) {
    var s = document.createElement('script');
    s.src = LOADER_SRC;
    s.async = true;
    s.setAttribute('data-supascribe-loader', '');
    document.head.appendChild(s);
  }

  var btn = widget.querySelector('.newsletter-launcher');
  var panel = widget.querySelector('.newsletter-panel');
  var close = widget.querySelector('.newsletter-close');

  function open() {
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
  }
  function shut() {
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (panel.hidden) open(); else shut();
  });
  close.addEventListener('click', shut);
  document.addEventListener('click', function (e) {
    if (!widget.contains(e.target) && !panel.hidden) shut();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) shut();
  });
})();
