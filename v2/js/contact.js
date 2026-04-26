(function () {
  'use strict';

  var form = document.getElementById('contactForm');
  if (!form) return;

  // ===== preselect topic from ?topic= URL parameter =====
  try {
    var params = new URLSearchParams(window.location.search);
    var preset = (params.get('topic') || '').toLowerCase();
    var TOPIC_MAP = {
      speaking:   'Speaking inquiry',
      project:    'Project / consulting',
      consulting: 'Project / consulting',
      press:      'Press / media',
      media:      'Press / media',
      grants:     'Nonprofit grants',
      nonprofit:  'Nonprofit grants',
      hi:         'Just saying hi'
    };
    var matchValue = TOPIC_MAP[preset];
    if (matchValue) {
      var radio = form.querySelector('input[name="topic"][value="' + matchValue + '"]');
      if (radio) radio.checked = true;
    }
  } catch (e) {}

  // ===== timing trap =====
  var loadedAt = Date.now();
  var loadedField = document.getElementById('cf_loaded');
  if (loadedField) loadedField.value = String(loadedAt);

  // ===== one-shot client token (page-scoped integrity check) =====
  var token = '';
  try {
    var bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    token = Array.prototype.map.call(bytes, function (b) {
      return ('0' + b.toString(16)).slice(-2);
    }).join('');
  } catch (e) {
    token = String(Math.random()).slice(2) + String(Date.now());
  }
  var tokenField = document.getElementById('cf_token');
  if (tokenField) tokenField.value = token;

  // ===== rate-limit (localStorage) =====
  var RATE_KEY = 'gd-contact-recent';
  var RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
  var RATE_LIMIT = 3;
  function getRecent() {
    try {
      var raw = localStorage.getItem(RATE_KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return [];
      var cutoff = Date.now() - RATE_WINDOW_MS;
      return arr.filter(function (t) { return typeof t === 'number' && t > cutoff; });
    } catch (e) { return []; }
  }
  function pushRecent() {
    try {
      var arr = getRecent();
      arr.push(Date.now());
      localStorage.setItem(RATE_KEY, JSON.stringify(arr));
    } catch (e) {}
  }

  // ===== email autocomplete =====
  var emailInput  = document.getElementById('cf-email');
  var suggestList = document.getElementById('cf-email-suggest');
  var DOMAINS = [
    'gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com',
    'proton.me', 'protonmail.com', 'live.com', 'aol.com', 'me.com',
    'fastmail.com', 'duck.com', 'zoho.com',
    'oasisofchange.org', 'gabrieldalton.com'
  ];
  var suggestIndex = -1;

  function renderSuggestions(items) {
    suggestList.innerHTML = '';
    if (!items.length) {
      suggestList.hidden = true;
      suggestIndex = -1;
      return;
    }
    items.forEach(function (val, i) {
      var li = document.createElement('li');
      li.role = 'option';
      li.className = 'email-suggest-item';
      li.dataset.value = val;
      li.textContent = val;
      li.addEventListener('mousedown', function (e) {
        e.preventDefault();
        applySuggestion(val);
      });
      suggestList.appendChild(li);
    });
    suggestList.hidden = false;
    suggestIndex = -1;
  }

  function buildSuggestions() {
    var v = emailInput.value;
    var at = v.indexOf('@');
    if (at === -1 || at !== v.lastIndexOf('@')) return [];
    var local = v.slice(0, at);
    if (!local) return [];
    var partial = v.slice(at + 1).toLowerCase();
    var matched = DOMAINS.filter(function (d) {
      return d.toLowerCase().indexOf(partial) === 0 && d.length !== partial.length;
    });
    return matched.slice(0, 6).map(function (d) { return local + '@' + d; });
  }

  function applySuggestion(val) {
    emailInput.value = val;
    suggestList.hidden = true;
    emailInput.focus();
    validateEmail();
    updateSubmitState();
  }

  emailInput.addEventListener('input', function () {
    renderSuggestions(buildSuggestions());
    validateEmail();
    updateSubmitState();
  });
  emailInput.addEventListener('blur', function () {
    setTimeout(function () { suggestList.hidden = true; }, 120);
  });
  emailInput.addEventListener('keydown', function (e) {
    var items = suggestList.querySelectorAll('.email-suggest-item');
    if (suggestList.hidden || !items.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      suggestIndex = (suggestIndex + 1) % items.length;
      highlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      suggestIndex = (suggestIndex - 1 + items.length) % items.length;
      highlight(items);
    } else if (e.key === 'Tab' || e.key === 'Enter') {
      if (suggestIndex >= 0) {
        e.preventDefault();
        applySuggestion(items[suggestIndex].dataset.value);
      }
    } else if (e.key === 'Escape') {
      suggestList.hidden = true;
    }
  });
  function highlight(items) {
    items.forEach(function (el, i) {
      el.classList.toggle('is-active', i === suggestIndex);
    });
  }

  // ===== validation =====
  var nameInput    = document.getElementById('cf-name');
  var msgInput     = document.getElementById('cf-message');
  var consentInput = document.getElementById('cf-consent');
  var submitBtn    = document.getElementById('cf-submit');
  var statusEl     = document.getElementById('cf-status');
  var charCount    = document.getElementById('cf-charcount');
  var topicInputs  = form.querySelectorAll('input[name="topic"]');

  // crude email regex — enough to catch obvious typos client-side; server is the real check
  var EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // simple suspicious-pattern filter to deter trivial spam
  var SUSPICIOUS = [
    /\bviagra\b/i, /\bcasino\b/i, /\bseo (services|expert)\b/i,
    /https?:\/\/[^\s]+\.(?:ru|cn|tk|top)\b/i,
    /\b(?:bitcoin|crypto)\s+(?:investment|opportunity)\b/i
  ];

  function setError(fieldId, msg) {
    var hint = document.querySelector('[data-error="' + fieldId + '"]');
    var input = document.getElementById(fieldId);
    if (hint) hint.textContent = msg || '';
    if (input) input.classList.toggle('has-error', !!msg);
  }
  function validateName() {
    var v = nameInput.value.trim();
    if (!v) return setError('cf-name', '');
    if (v.length < 2) return setError('cf-name', 'Please enter your name.');
    setError('cf-name', '');
  }
  function validateEmail() {
    var v = emailInput.value.trim();
    if (!v) return setError('cf-email', '');
    if (!EMAIL_RE.test(v)) return setError('cf-email', 'That doesn’t look like a valid email.');
    setError('cf-email', '');
  }
  function validateMessage() {
    var v = msgInput.value;
    charCount.textContent = v.length + ' / 4000';
    var trimmed = v.trim();
    if (!trimmed) return setError('cf-message', '');
    if (trimmed.length < 20) return setError('cf-message', 'A few more words please — at least 20 characters.');
    setError('cf-message', '');
  }
  function topicSelected() {
    for (var i = 0; i < topicInputs.length; i++) if (topicInputs[i].checked) return true;
    return false;
  }
  function isFormValid() {
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) return false;
    if (!EMAIL_RE.test(emailInput.value.trim())) return false;
    if (msgInput.value.trim().length < 20) return false;
    if (!consentInput.checked) return false;
    if (!topicSelected()) return false;
    return true;
  }
  function updateSubmitState() {
    submitBtn.disabled = !isFormValid();
  }

  nameInput.addEventListener('input', function () { validateName(); updateSubmitState(); });
  msgInput .addEventListener('input', function () { validateMessage(); updateSubmitState(); });
  consentInput.addEventListener('change', updateSubmitState);
  topicInputs.forEach(function (i) { i.addEventListener('change', updateSubmitState); });
  validateMessage();

  // ===== submission =====
  form.addEventListener('submit', function (e) {
    if (!isFormValid()) {
      e.preventDefault();
      return;
    }
    // honeypot
    var hp = document.getElementById('cf-website');
    if (hp && hp.value.trim() !== '') {
      e.preventDefault();
      statusEl.textContent = 'Submission blocked.';
      return;
    }
    // time-trap: must take >= 3 seconds (humans never submit a form that fast)
    if (Date.now() - loadedAt < 3000) {
      e.preventDefault();
      statusEl.textContent = 'Hold on a moment, then try again.';
      return;
    }
    // rate-limit
    var recent = getRecent();
    if (recent.length >= RATE_LIMIT) {
      e.preventDefault();
      statusEl.classList.add('is-error');
      statusEl.textContent = 'You’ve sent ' + RATE_LIMIT + ' messages in the last hour. Please try again later.';
      return;
    }
    // suspicious-content filter
    var combined = (msgInput.value + ' ' + (nameInput.value || '') + ' ' + (emailInput.value || '')).toLowerCase();
    for (var i = 0; i < SUSPICIOUS.length; i++) {
      if (SUSPICIOUS[i].test(combined)) {
        e.preventDefault();
        statusEl.classList.add('is-error');
        statusEl.textContent = 'Your message was flagged. If this seems wrong, please rephrase.';
        return;
      }
    }
    // all good — record and let it submit
    pushRecent();
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    statusEl.classList.remove('is-error');
    statusEl.textContent = 'Sending…';
  });
})();
