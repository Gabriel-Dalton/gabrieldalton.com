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

  // TEDx popup: keep visitors on-site by opening the YouTube embed in a modal
  (function () {
    var triggers = document.querySelectorAll('[data-tedx-url]');
    if (!triggers.length) return;

    var modal = null;
    var lastFocus = null;

    function buildModal() {
      modal = document.createElement('div');
      modal.className = 'tedx-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'TEDx talk video');
      modal.innerHTML =
        '<div class="tedx-modal__backdrop" data-tedx-close></div>' +
        '<div class="tedx-modal__panel">' +
          '<button type="button" class="tedx-modal__close" data-tedx-close aria-label="Close video">' +
            '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
          '</button>' +
          '<div class="tedx-modal__frame"></div>' +
          '<a class="tedx-modal__fallback" href="#" target="_blank" rel="noopener">Trouble loading? Watch on YouTube ↗</a>' +
        '</div>';
      document.body.appendChild(modal);
      modal.addEventListener('click', function (e) {
        if (e.target.closest('[data-tedx-close]')) closeModal();
      });
    }

    function getYouTubeId(href) {
      try {
        var url = new URL(href, window.location.href);
        var v = url.searchParams.get('v');
        if (v) return v;
        if (url.hostname.indexOf('youtu.be') !== -1) return url.pathname.slice(1).split('/')[0];
        if (url.pathname.indexOf('/embed/') === 0) return url.pathname.slice(7).split('/')[0];
      } catch (err) {}
      return null;
    }

    function openModal(href) {
      var id = getYouTubeId(href);
      if (!id) return false;
      if (!modal) buildModal();

      var frame = modal.querySelector('.tedx-modal__frame');
      var iframe = document.createElement('iframe');
      // youtube.com (not nocookie) + no autoplay = best mobile compatibility.
      // The user has already tapped to open the modal; tapping the play
      // button is fine and avoids iOS Safari's autoplay restrictions.
      iframe.setAttribute('src', 'https://www.youtube.com/embed/' + encodeURIComponent(id) + '?rel=0&playsinline=1&modestbranding=1');
      iframe.setAttribute('title', 'TEDx talk');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      iframe.setAttribute('loading', 'lazy');
      frame.innerHTML = '';
      frame.appendChild(iframe);

      // fallback link in case the iframe errors (e.g. age-restricted, region-locked)
      var fb = modal.querySelector('.tedx-modal__fallback');
      if (fb) fb.href = href;

      lastFocus = document.activeElement;
      document.body.classList.add('tedx-modal-open');
      modal.classList.add('is-open');
      document.addEventListener('keydown', onKey);

      var closeBtn = modal.querySelector('.tedx-modal__close');
      if (closeBtn) closeBtn.focus();
      return true;
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('is-open');
      document.body.classList.remove('tedx-modal-open');
      document.removeEventListener('keydown', onKey);
      // Removing the iframe is what actually stops the audio
      var frame = modal.querySelector('.tedx-modal__frame');
      if (frame) frame.innerHTML = '';
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }

    function onKey(e) {
      if (e.key === 'Escape' || e.key === 'Esc') closeModal();
    }

    triggers.forEach(function (link) {
      link.addEventListener('click', function (e) {
        // Let modified clicks (new tab, new window, download) still go to YouTube
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
        if (openModal(link.href)) e.preventDefault();
      });
    });
  })();

  // Mark active nav link based on current pathname
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.primary-nav a[href]').forEach(function (a) {
    var href = a.getAttribute('href').replace(/\/$/, '') || '/';
    var isHome = href === '/';
    var match = isHome ? path === '/' : (path === href || path.indexOf(href + '/') === 0);
    if (match) a.classList.add('is-active');
  });

  // Mobile nav drawer
  (function () {
    var toggle = document.querySelector('.nav-toggle');
    var nav    = document.querySelector('.primary-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Toggle menu');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!nav.classList.contains('is-open'));
    });

    // close when a nav link is clicked (so anchor jumps work cleanly)
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });

    // close on click outside
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    });

    // close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
    });

    // close if window resizes back to desktop
    var mq = window.matchMedia('(min-width: 721px)');
    if (mq.addEventListener) {
      mq.addEventListener('change', function (ev) { if (ev.matches) setOpen(false); });
    } else if (mq.addListener) {
      mq.addListener(function (ev) { if (ev.matches) setOpen(false); });
    }
  })();
})();
