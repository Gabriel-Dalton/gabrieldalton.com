// Testimonials modal functionality
const testimonialsModalContainer = document.querySelector('[data-modal-container]');
const overlay = document.querySelector('[data-overlay]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const testimonialItems = document.querySelectorAll('[data-testimonials-item]');

// Modal toggle function
const toggleTestimonialModal = () => {
  if (testimonialsModalContainer && overlay) {
    testimonialsModalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('modal-active');
  }
}

// Add click event to all testimonial items
testimonialItems.forEach(item => {
  item.addEventListener('click', () => {
    const modalImg = item.querySelector('[data-testimonials-avatar]')?.innerHTML;
    const modalTitle = item.querySelector('[data-testimonials-title]')?.innerHTML;
    const modalText = item.querySelector('[data-testimonials-text]')?.innerHTML;

    const modalImgElement = document.querySelector('[data-modal-img]');
    const modalTitleElement = document.querySelector('[data-modal-title]');
    const modalTextElement = document.querySelector('[data-modal-text]');
    const testimonialRoleElement = document.querySelector('.testimonial-role');

    if (modalImgElement && modalImg) modalImgElement.innerHTML = modalImg;
    if (modalTitleElement && modalTitle) modalTitleElement.innerHTML = modalTitle;
    if (modalTextElement && modalText) modalTextElement.innerHTML = modalText;

    // Set the role/title for the testimonial
    const roles = {
      'Tricia Collingham': 'Former Executive Director, Stanley Park Ecology Society (SPES)',
      'Jordan Mittler': 'Founder, Mittler Senior Technology (MST)',
      'Revd. Philip Cochrane': "Former Priest, St. Paul's Anglican Church",
      'Michael Andersen': 'Founder, SustainableWWW'
    };
    const role = roles[modalTitle?.trim()] || '';
    if (testimonialRoleElement) testimonialRoleElement.textContent = role;

    toggleTestimonialModal();
  });
});

// Close modal when clicking the close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', toggleTestimonialModal);
}

// Close modal when clicking outside
if (overlay) {
  overlay.addEventListener('click', toggleTestimonialModal);
}

// Email copy functionality
const emailElement = document.querySelector('[data-email]');
if (emailElement) {
  emailElement.addEventListener('click', function() {
    const email = this.dataset.email;
    navigator.clipboard.writeText(email).then(() => {
      this.classList.add('copied');
      setTimeout(() => {
        this.classList.remove('copied');
      }, 2000);
    });
  });
}

// Testimonials scroll functionality
function scrollTestimonials(direction) {
  const testimonialsList = document.querySelector('.testimonials-list');
  if (testimonialsList) {
    const scrollAmount = testimonialsList.offsetWidth * 0.8;
    const scrollPosition = direction === 'next' ? scrollAmount : -scrollAmount;
    
    testimonialsList.scrollBy({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }
}

// Clients scroll functionality
function scrollClients(direction) {
  const clientsList = document.querySelector('.clients-list');
  if (clientsList) {
    const scrollAmount = clientsList.offsetWidth * 0.8;
    const scrollPosition = direction === 'next' ? scrollAmount : -scrollAmount;
    
    clientsList.scrollBy({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }
}

// Keyboard navigation for testimonials
const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
if (testimonialsWrapper) {
  testimonialsWrapper.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      scrollTestimonials('prev');
    } else if (e.key === 'ArrowRight') {
      scrollTestimonials('next');
    }
  });
}

// Keyboard navigation for clients
const clientsWrapper = document.querySelector('.clients-wrapper');
if (clientsWrapper) {
  clientsWrapper.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      scrollClients('prev');
    } else if (e.key === 'ArrowRight') {
      scrollClients('next');
    }
  });
}

// CO2 Modal functionality
const co2ModalContainer = document.querySelector('#modal-co2');
const co2Overlay = co2ModalContainer?.querySelector('[data-overlay]');
const co2CloseBtn = co2ModalContainer?.querySelector('[data-modal-close-btn]');
const co2InfoIcon = document.querySelector('.info-icon');

// Modal toggle function
const toggleCO2Modal = () => {
  if (co2ModalContainer && co2Overlay) {
    co2ModalContainer.classList.toggle('active');
    co2Overlay.classList.toggle('active');
  }
}

// Add click event to info icon
if (co2InfoIcon) {
  co2InfoIcon.addEventListener('click', () => {
    toggleCO2Modal();
  });
}

// Close modal when clicking the close button
if (co2CloseBtn) {
  co2CloseBtn.addEventListener('click', toggleCO2Modal);
}

// Close modal when clicking outside
if (co2Overlay) {
  co2Overlay.addEventListener('click', toggleCO2Modal);
}

// Close modal when pressing Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && co2ModalContainer?.classList.contains('active')) {
    toggleCO2Modal();
  }
});

// Add tooltip functionality for mobile
document.addEventListener('DOMContentLoaded', function() {
  const infoIcon = document.querySelector('.info-icon');
  const tooltip = document.querySelector('.tooltip');
  
  if (infoIcon && tooltip) {
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'tooltip-overlay';
    document.body.appendChild(overlay);

    // Handle info icon click
    infoIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      if (window.innerWidth <= 768) {
        tooltip.classList.add('active');
        overlay.classList.add('active');
      }
    });

    // Close tooltip when clicking overlay
    overlay.addEventListener('click', function() {
      tooltip.classList.remove('active');
      overlay.classList.remove('active');
    });

    // Close tooltip when pressing Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        tooltip.classList.remove('active');
        overlay.classList.remove('active');
      }
    });
  }
}); 