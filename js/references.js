(function () {
  'use strict';

  var recommendations = [
    {
      name: 'Adrien de Malherbe',
      org: 'Managing Director, MA in Capital Markets & Securities — Investment Banking',
      file: '/files/Gabriel_Dalton_Letter_of_Recommendation_Adrien_de_Malherbe.pdf'
    },
    {
      name: 'Farooq Khan',
      org: 'Founder, ViRA360',
      file: '/files/Gabriel_Dalton_Letter_of_Recommendation_Farooq_Khan.pdf'
    },
    {
      name: 'Jack Wood',
      org: "Financial Assistant, St. Paul's Anglican Church",
      file: '/files/Gabriel_Dalton_Letter_of_Recommendation_Jack_Wood.pdf'
    },
    {
      name: 'Jordan Mittler',
      org: 'Founder, Mittler Senior Technology',
      file: '/files/Gabriel_Dalton_Letter_of_Recommendation_Jordan_Mittler.pdf'
    },
    {
      name: 'Sara Ciantar',
      org: "Office Administrator, St. Paul's Anglican Church",
      file: '/files/Gabriel_Dalton_Letter_of_Recommendation_Sara_Ciantar.pdf'
    }
  ];

  var recognition = [
    {
      name: 'Hon. Patty Hajdu',
      org: 'Member of Parliament, Government of Canada',
      file: '/files/Gabriel_Dalton_Letter_of_Recognition_Patty_Hajdu.pdf'
    },
    {
      name: 'Hon. Spencer Chandra Herbert',
      org: 'MLA, Province of British Columbia',
      file: '/files/Gabriel_Dalton_Letter_of_Recognition_Spencer_Chandra_Hebert.pdf'
    },
    {
      name: 'Stanley Park Ecology Society',
      org: 'Certificate of Appreciation',
      file: '/files/Gabriel_Dalton_Certificate_of_Appreciation_SPES.pdf'
    }
  ];

  var testimonials = [
    {
      name: 'Tricia Collingham',
      org: 'Review on website design and client support',
      quote: 'Gabriel is very talented at website design. He is an incredibly enthusiastic, self-directed and capable individual who is quick to address changes and improvements. I have no doubt that Gabriel will go on to do great things.'
    },
    {
      name: 'Jordan Mittler',
      org: 'Founder, Mittler Senior Technology',
      quote: 'Gabriel did a full redesign of our website and made it much easier for seniors to navigate. He was responsive, professional, and led our digital sustainability work with real impact.'
    },
    {
      name: 'Revd. Philip Cochrane',
      org: "St. Paul's Anglican Church",
      quote: 'Gabriel made a real impact in six weeks by developing a new website and strengthening our online presence. His initiative, technical skill, and attention to detail were invaluable.'
    },
    {
      name: 'Michael Andersen',
      org: 'Sustainable WWW',
      quote: 'Gabriel consistently showed initiative, asked smart questions, and contributed across multiple needs. His research and follow-through directly led to a tree-planting integration we implemented.'
    }
  ];

  var mediaFeatures = [
    {
      title: 'Saving The Earth One Line Of Code At A Time',
      source: 'Spotify Podcast',
      date: '2025-01-11',
      link: 'https://open.spotify.com/episode/13KunhOM4W8eYKdUywKeJE?nd=1&dlsi=fbb64dfba13d41ba',
      blog: '/#contact'
    },
    {
      title: "Featured Changemaker — Gabriel D'Alton",
      source: 'Change Makers',
      date: '2024-06-04',
      link: 'https://www.changemakersgen.com/featuredchangemakers/kove-l5psr-egxtx-h3xth-dzabz-esd6g-8frjm-ej8cj-fhxz7-r8ngj-ggwap-59mw8-5wye2-6g2ry-2gpl2-lyfpm-tna4e',
      blog: '/#contact'
    },
    {
      title: "Entrepreneur Gabriel D'Alton | Promoting Sustainability Digitally",
      source: 'Happy Eco News',
      date: '2024-05-31',
      link: 'https://happyeconews.com/entrepreneur-gabriel-dalton-and-his-nonprofit-promoting-sustainability-digitally/',
      blog: '/#contact'
    },
    {
      title: 'Teenpreneur Gabriel Dalton with His Not-for-Profit',
      source: 'The Teen Magazine',
      date: '2024-04-29',
      link: 'https://www.theteenmagazine.com/teenpreneur-gabriel-dalton-revolutionizes-internet-sustainability-with-his-not-for-profit',
      blog: '/#contact'
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

  function renderTestimonials(containerId, items) {
    var container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    items.forEach(function (item) {
      var card = document.createElement('article');
      card.className = 'card quote-card';
      card.dataset.search = (item.name + ' ' + item.org + ' ' + item.quote).toLowerCase();
      card.innerHTML =
        '<p class="card-name">' + escapeHtml(item.name) + '</p>' +
        '<p class="card-org">' + escapeHtml(item.org) + '</p>' +
        '<p class="card-quote">“' + escapeHtml(item.quote) + '”</p>';
      container.appendChild(card);
    });
  }

  function renderMedia(containerId, items) {
    var container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    items.forEach(function (item) {
      var card = document.createElement('article');
      card.className = 'card media-card';
      card.dataset.search = (item.title + ' ' + item.source).toLowerCase();
      card.innerHTML =
        '<p class="card-name">' + escapeHtml(item.title) + '</p>' +
        '<p class="card-org">' + escapeHtml(item.source) + ' · ' + formatDate(item.date) + '</p>' +
        '<div class="card-actions">' +
          '<a class="card-link" href="' + escapeHtml(item.link) + '" target="_blank" rel="noopener">Open feature</a>' +
          '<a class="card-link secondary" href="' + escapeHtml(item.blog) + '">Draft blog post</a>' +
        '</div>';
      container.appendChild(card);
    });
  }

  function formatDate(value) {
    var date = new Date(value + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target.matches('[data-close]')) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (modal && e.key === 'Escape' && !modal.hidden) closeModal();
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
  renderTestimonials('testimonialsGrid', testimonials);
  renderMedia('mediaGrid', mediaFeatures);
})();
