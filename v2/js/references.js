(function () {
  'use strict';

  /**
   * Each item supports a `type`:
   *   - 'recommendation' / 'recognition' → PDF letter, opens in modal
   *   - 'press'    → external article link
   *   - 'quote'    → public written quote (rendered inline as a blockquote)
   *   - 'link'     → external resource / partner link
   *   - 'note'     → short written note rendered inline
   */
  var resources = [

    // ===== Letters of recommendation (PDFs) =====
    { type: 'recommendation', name: 'Adrien de Malherbe', org: 'Managing Director · MA in Capital Markets & Securities', file: '/files/Gabriel_Dalton_Letter_of_Recommendation_Adrien_de_Malherbe.pdf', summary: 'A letter of recommendation from a senior leader at a global investment-banking program.' },
    { type: 'recommendation', name: 'Farooq Khan', org: 'Founder · ViRA360', file: '/files/Gabriel_Dalton_Letter_of_Recommendation_Farooq_Khan.pdf', summary: 'On collaboration on SEO content, website usability, and eco-friendly digital practices.' },
    { type: 'recommendation', name: 'Jack Wood', org: "Financial Assistant · St. Paul's Anglican Church", file: '/files/Gabriel_Dalton_Letter_of_Recommendation_Jack_Wood.pdf', summary: 'On the redevelopment of the parish website and a 90% reduction in hosting costs.' },
    { type: 'recommendation', name: 'Jordan Mittler', org: 'Founder · Mittler Senior Technology', file: '/files/Gabriel_Dalton_Letter_of_Recommendation_Jordan_Mittler.pdf', summary: 'On leading sustainability work and rebuilding the MST website for accessibility.' },
    { type: 'recommendation', name: 'Sara Ciantar', org: "Office Administrator · St. Paul's Anglican Church", file: '/files/Gabriel_Dalton_Letter_of_Recommendation_Sara_Ciantar.pdf', summary: 'On launching the parish website on time, with discipline and craft.' },

    // ===== Letters of recognition / appreciation (PDFs) =====
    { type: 'recognition', name: 'Hon. Patty Hajdu', org: 'Member of Parliament · Government of Canada', file: '/files/Gabriel_Dalton_Letter_of_Recognition_Patty_Hajdu.pdf', summary: 'A letter of recognition from a federal Minister.' },
    { type: 'recognition', name: 'Hon. Spencer Chandra Herbert', org: 'MLA · Province of British Columbia', file: '/files/Gabriel_Dalton_Letter_of_Recognition_Spencer_Chandra_Hebert.pdf', summary: 'A provincial letter of recognition for community contribution and youth leadership.' },
    { type: 'recognition', name: 'Stanley Park Ecology Society', org: 'Certificate of Appreciation', file: '/files/Gabriel_Dalton_Certificate_of_Appreciation_SPES.pdf', summary: 'A certificate of appreciation for the SPES digital sustainability engagement.' },

    // ===== Press / features (external) =====
    { type: 'press', name: 'Saving the Earth one line of code at a time', org: 'Spotify Podcast · 11 Jan 2025', url: 'https://open.spotify.com/episode/13KunhOM4W8eYKdUywKeJE', summary: 'A podcast conversation about Oasis of Change and the case for sustainable web development.' },
    { type: 'press', name: 'Featured Changemaker — Gabriel D\'Alton', org: 'Change Makers · 04 Jun 2024', url: 'https://www.changemakersgen.com/featuredchangemakers/kove-l5psr-egxtx-h3xth-dzabz-esd6g-8frjm-ej8cj-fhxz7-r8ngj-ggwap-59mw8-5wye2-6g2ry-2gpl2-lyfpm-tna4e', summary: 'Featured profile on the work at Oasis of Change and Web-Ready.' },
    { type: 'press', name: 'Promoting sustainability, digitally', org: 'Happy Eco News · 31 May 2024', url: 'https://happyeconews.com/entrepreneur-gabriel-dalton-and-his-nonprofit-promoting-sustainability-digitally/', summary: 'On how Oasis of Change reframes sustainability as a digital practice.' },
    { type: 'press', name: 'Teenpreneur revolutionizes internet sustainability', org: 'The Teen Magazine · 29 Apr 2024', url: 'https://www.theteenmagazine.com/teenpreneur-gabriel-dalton-revolutionizes-internet-sustainability-with-his-not-for-profit', summary: 'A profile written for a teen audience on starting a sustainability nonprofit.' },
    { type: 'press', name: 'City of Vancouver honours digital sustainability innovation', org: 'Vancouver School Board · 2025', url: 'https://www.vsb.bc.ca/city-of-vancouver-honours-digital-sustainability-innovation-led-by-vancouver-student.84832', summary: 'On receiving the 2025 Impact & Innovation Award from the City of Vancouver.' },

    // ===== Public quotes (text-only references) =====
    { type: 'quote', name: 'Tricia Collingham', org: 'Former Executive Director · Stanley Park Ecology Society', quote: 'Gabriel is very talented at website design — an incredibly enthusiastic, self-directed and capable individual who is quick to address changes and improvements. I have no doubt he will go on to do great things.' },
    { type: 'quote', name: 'Revd. Philip Cochrane', org: "Former Priest · St. Paul's Anglican Church", quote: 'Gabriel joined us through a summer program and made a real impact in just six weeks. He developed a brand-new website for St. Paul\'s and helped enhance our online presence. His tech skills, initiative, and attention to detail were invaluable.' },
    { type: 'quote', name: 'Michael Andersen', org: 'Founder · Sustainable WWW', quote: 'Gabriel volunteered with us at Sustainable WWW and quickly proved himself as someone who shows up, asks smart questions, and genuinely cares. He suggested a tree-planting integration we hadn\'t considered, and after digging into the research, we actually implemented it.' },
    { type: 'quote', name: 'Robin Clements', org: 'Founder · Breathwave', quote: 'We turned to Gabriel Dalton to create a fresh, innovative online presence. His expertise and responsive service significantly elevated our site, showcasing his exceptional talent and dedication to professional excellence.' },
    { type: 'quote', name: 'Anisa Abduhamedova', org: 'Editor-in-Chief · The King George Times', quote: 'Gabriel transforms visions into stunning, sustainable websites with unmatched professionalism and efficiency. His commitment to seamless collaboration and eco-friendly practices makes him the go-to developer for exceptional web development.' },
    { type: 'quote', name: 'Michael Ocampo', org: 'Owner · Safe Haven Services', quote: 'Gabriel exceeded my expectations by quickly launching a high-speed website and setting up a complimentary business email and Google Business page. His responsive service makes him highly recommendable.' },

    // ===== External links / partner organizations =====
    { type: 'link', name: 'Oasis of Change, Inc.', org: 'Founder & President · 2023 → present', url: 'https://oasisofchange.org', summary: 'The Vancouver-based not-for-profit promoting digital sustainability and accessibility.' },
    { type: 'link', name: 'Plastic Bank', org: 'Generative Engine Optimization Intern · 2025 → present', url: 'https://plasticbank.com', summary: 'Working on visibility across search and AI to fight plastic pollution and poverty.' },
    { type: 'link', name: 'AccessibilityChecker.org', org: 'Contributor · 2026 → present', url: 'https://www.accessibilitychecker.org/', summary: 'Improving digital accessibility — helping organizations meet WCAG 2.2 in practice.' },
    { type: 'link', name: 'Stanley Park Ecology Society', org: 'Digital Strategy Advisor · 2024 → present', url: 'https://stanleyparkecology.ca', summary: 'Pro bono technology advising focused on sustainable web practices.' },
    { type: 'link', name: 'The Dais — Toronto Metropolitan University', org: 'National Coach (Fellow) · 2025 → present', url: 'https://dais.ca', summary: 'Coaching Youth Champions on Canada\'s first nationwide phone-free-classrooms initiative.' }
  ];

  // ===== render =====
  var grid    = document.getElementById('resourcesGrid');
  var emptyEl = document.getElementById('resourcesEmpty');

  function escapeHtml(value) {
    return String(value)
      .replace(/&(?!amp;|lt;|gt;|quot;|#39;)/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  var typeLabel = {
    recommendation: 'Recommendation',
    recognition:    'Recognition',
    press:          'Press',
    quote:          'Quote',
    link:           'Resource',
    note:           'Note'
  };

  function ctaFor(item) {
    if (item.type === 'recommendation' || item.type === 'recognition') {
      return '<button type="button" class="btn btn-secondary btn-sm" data-open-pdf="' + escapeHtml(item.file) + '" data-pdf-title="' + escapeHtml(item.name) + '" data-pdf-sub="' + escapeHtml(item.org) + '">View PDF</button>';
    }
    if (item.type === 'press' || item.type === 'link') {
      return '<a class="btn btn-secondary btn-sm" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener">Open ↗</a>';
    }
    return '';
  }

  function bodyFor(item) {
    if (item.type === 'quote') {
      return '<blockquote>' + escapeHtml(item.quote) + '<cite>' + escapeHtml(item.name) + ' — ' + escapeHtml(item.org) + '</cite></blockquote>';
    }
    var heading = '<div><h3>' + escapeHtml(item.name) + '</h3>' +
                  '<span class="resource-by">' + escapeHtml(item.org) + '</span></div>';
    var summary = item.summary ? '<p>' + escapeHtml(item.summary) + '</p>' : '';
    return heading + summary;
  }

  function categoryFilter(item) {
    return item.type;
  }

  function render() {
    grid.innerHTML = '';
    resources.forEach(function (item) {
      var article = document.createElement('article');
      article.className = 'resource';
      article.dataset.filterGroup = 'resources';
      article.dataset.filterCategories = categoryFilter(item);
      article.dataset.search = (
        (item.name || '') + ' ' +
        (item.org || '') + ' ' +
        (item.summary || '') + ' ' +
        (item.quote || '') + ' ' +
        (typeLabel[item.type] || '')
      ).toLowerCase();

      article.innerHTML =
        '<div class="resource-head">' + bodyFor(item) + '</div>' +
        '<div class="resource-foot">' +
          '<span class="resource-type resource-type--' + item.type + '">' + escapeHtml(typeLabel[item.type] || item.type) + '</span>' +
          ctaFor(item) +
        '</div>';
      grid.appendChild(article);
    });
  }

  // ===== modal handling =====
  var modal         = document.getElementById('modal');
  var pdfFrame      = document.getElementById('pdfFrame');
  var modalTitle    = document.getElementById('modalTitle');
  var modalSubtitle = document.getElementById('modalSubtitle');
  var modalDownload = document.getElementById('modalDownload');

  function openModal(file, title, sub) {
    modalTitle.textContent = title;
    modalSubtitle.textContent = sub;
    modalDownload.href = file;
    pdfFrame.src = file;
    modal.hidden = false;
    document.body.classList.add('modal-open');
  }
  function closeModal() {
    modal.hidden = true;
    pdfFrame.src = '';
    document.body.classList.remove('modal-open');
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-open-pdf]');
    if (trigger) {
      e.preventDefault();
      openModal(trigger.dataset.openPdf, trigger.dataset.pdfTitle, trigger.dataset.pdfSub);
    } else if (e.target.matches('[data-close]')) {
      closeModal();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  // ===== empty state for combined search + filter =====
  function checkEmpty() {
    var visible = grid.querySelectorAll('.resource:not([style*="display: none"])').length;
    emptyEl.style.display = visible === 0 ? '' : 'none';
  }
  // Hook into MutationObserver for filter/search side effects (style attr changes)
  var observer = new MutationObserver(checkEmpty);

  render();
  grid.querySelectorAll('.resource').forEach(function (el) {
    observer.observe(el, { attributes: true, attributeFilter: ['style'] });
  });
})();
