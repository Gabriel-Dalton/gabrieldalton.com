(function () {
  'use strict';

  // Year stamps
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Email click-to-copy
  document.querySelectorAll('[data-copy-email]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var email = el.dataset.copyEmail;
      if (!email || !navigator.clipboard) return; // let mailto fall through
      e.preventDefault();
      navigator.clipboard.writeText(email).then(function () {
        var original = el.textContent;
        el.textContent = 'Copied — ' + email;
        el.classList.add('is-copied');
        setTimeout(function () {
          el.textContent = original;
          el.classList.remove('is-copied');
        }, 1800);
      });
    });
  });

  // Generic filter system: any [data-filter-group="X"] container holds chips and items
  // Chip:  <button class="filter-chip" data-filter-target="group" data-filter="all">
  // Item:  <... data-filter-group="group" data-filter-categories="cat1,cat2">
  document.querySelectorAll('[data-filter-target]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var group = chip.dataset.filterTarget;
      var value = chip.dataset.filter;

      document.querySelectorAll('[data-filter-target="' + group + '"]').forEach(function (c) {
        c.classList.toggle('is-active', c === chip);
      });

      var items = document.querySelectorAll('[data-filter-group="' + group + '"]');
      items.forEach(function (item) {
        var cats = (item.dataset.filterCategories || '').split(',').map(function (s) { return s.trim(); });
        var match = value === 'all' || cats.indexOf(value) !== -1;
        item.style.display = match ? '' : 'none';
      });
    });
  });

  // Live search filter:
  // <input data-search-target="group">
  // matches against item textContent + data-search attr
  document.querySelectorAll('[data-search-target]').forEach(function (input) {
    var group = input.dataset.searchTarget;
    var items = document.querySelectorAll('[data-filter-group="' + group + '"]');
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      items.forEach(function (item) {
        var hay = (item.dataset.search || item.textContent).toLowerCase();
        var match = !q || hay.indexOf(q) !== -1;
        item.style.display = match ? '' : 'none';
      });
    });
  });

  // Contact form: enable submit only when valid
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var submitBtn = form.querySelector('[type="submit"]');
    var inputs = form.querySelectorAll('input[required], textarea[required]');
    function validate() { submitBtn.disabled = !form.checkValidity(); }
    inputs.forEach(function (i) { i.addEventListener('input', validate); });
    validate();
  }

  // Mark active nav link based on current pathname
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.primary-nav a[href]').forEach(function (a) {
    var href = a.getAttribute('href').replace(/\/$/, '') || '/';
    var isHome = href === '/';
    var match = isHome ? path === '/' : (path === href || path.indexOf(href + '/') === 0);
    if (match) a.classList.add('is-active');
  });
})();
