(function () {
  'use strict';

  var recommendations = [
    {
      name: 'Adrien de Malherbe',
      org: 'Managing Director, MA in Capital Markets & Securities — Investment Banking',
      file: 'https://assets.gabrieldalton.com/Gabriel_Dalton_Letter_of_Recommendation_Adrien_de_Malherbe.pdf'
    },
    {
      name: 'Farooq Khan',
      org: 'Founder, ViRA360',
      file: 'https://assets.gabrieldalton.com/Gabriel_Dalton_Letter_of_Recommendation_Farooq_Khan.pdf'
    },
    {
      name: 'Jack Wood',
      org: "Financial Assistant, St. Paul's Anglican Church",
      file: 'https://assets.gabrieldalton.com/Gabriel_Dalton_Letter_of_Recommendation_Jack_Wood.pdf'
    },
    {
      name: 'Jordan Mittler',
      org: 'Founder, Mittler Senior Technology',
      file: 'https://assets.gabrieldalton.com/Gabriel_Dalton_Letter_of_Recommendation_Jordan_Mittler.pdf'
    },
    {
      name: 'Sara Ciantar',
      org: "Office Administrator, St. Paul's Anglican Church",
      file: 'https://assets.gabrieldalton.com/Gabriel_Dalton_Letter_of_Recommendation_Sara_Ciantar.pdf'
    }
  ];

  var recognition = [
    {
      name: 'Hon. Patty Hajdu',
      org: 'Member of Parliament, Government of Canada',
      file: 'https://assets.gabrieldalton.com/Gabriel_Dalton_Letter_of_Recognition_Patty_Hajdu.pdf'
    },
    {
      name: 'Hon. Spencer Chandra Herbert',
      org: 'MLA, Province of British Columbia',
      file: 'https://assets.gabrieldalton.com/Gabriel_Dalton_Letter_of_Recognition_Spencer_Chandra_Hebert.pdf'
    },
    {
      name: 'Stanley Park Ecology Society',
      org: 'Certificate of Appreciation',
      file: 'https://assets.gabrieldalton.com/Gabriel_Dalton_Certificate_of_Appreciation_SPES.pdf'
    }
  ];

  function renderGrid(containerId, items, tagText) {
    var container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    items.forEach(function (item) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'card';
      card.dataset.name = item.name;
      card.dataset.org = item.org;
      card.dataset.file = item.file;
      card.dataset.search = (item.name + ' ' + item.org).toLowerCase();
      card.innerHTML =
        '<p class="card-name">' + escapeHtml(item.name) + '</p>' +
        '<p class="card-org">' + escapeHtml(item.org) + '</p>' +
        '<span class="card-tag">' + escapeHtml(tagText) + '</span>';
      card.addEventListener('click', function () {
        openModal(item);
      });
      container.appendChild(card);
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  var modal = document.getElementById('modal');
  var pdfFrame = document.getElementById('pdfFrame');
  var modalTitle = document.getElementById('modalTitle');
  var modalSubtitle = document.getElementById('modalSubtitle');
  var modalDownload = document.getElementById('modalDownload');

  function openModal(item) {
    modalTitle.textContent = item.name;
    modalSubtitle.textContent = item.org;
    modalDownload.href = item.file;
    pdfFrame.src = item.file;
    modal.hidden = false;
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    modal.hidden = true;
    pdfFrame.src = '';
    document.body.classList.remove('modal-open');
  }

  modal.addEventListener('click', function (e) {
    if (e.target.matches('[data-close]')) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  var searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var query = this.value.trim().toLowerCase();
      document.querySelectorAll('.card').forEach(function (card) {
        var match = !query || card.dataset.search.indexOf(query) !== -1;
        card.style.display = match ? '' : 'none';
      });
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  renderGrid('recommendationsGrid', recommendations, 'Recommendation');
  renderGrid('recognitionGrid', recognition, 'Recognition');
})();
