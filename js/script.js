'use strict';

// Profile image loading
document.addEventListener('DOMContentLoaded', function() {
  const profileImage = document.querySelector('.avatar-box img');
  const placeholder = document.querySelector('.avatar-placeholder');
  function hidePlaceholder() {
    if (placeholder) {
      placeholder.classList.add('hide');
    }
  }
  if (profileImage.complete) {
    profileImage.classList.add('loaded');
    hidePlaceholder();
  } else {
    profileImage.addEventListener('load', function() {
      profileImage.classList.add('loaded');
      hidePlaceholder();
    });
  }
  // Remove .hidden and .no-transition from sidebar after DOM is ready
  var sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.remove('hidden');
    sidebar.classList.remove('no-transition');
  }
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
    const icon = this.querySelector("ion-icon");
    icon.setAttribute("name", sidebar.classList.contains("active") ? "chevron-up" : "chevron-down");
  });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const toggleModal = function (modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.toggle("active");
    document.body.classList.toggle("modal-active");
  }
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    toggleModal(this.getAttribute("data-testimonials-item"));
  });
}

// Project modal functionality
const projectItems = document.querySelectorAll("[data-project-item]");

// Function to close modal
const closeModal = (modal) => {
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Function to open modal
const openModal = (modal) => {
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Add click events to project items
projectItems.forEach(item => {
  item.addEventListener("click", function(e) {
    e.preventDefault();
    const modalId = this.getAttribute("data-project-item");
    const modal = document.getElementById(modalId);
    openModal(modal);
  });
});

// Handle modal close button clicks
document.querySelectorAll("[data-modal-close-btn]").forEach(btn => {
  btn.addEventListener("click", function() {
    const modal = this.closest(".modal-container");
    closeModal(modal);
  });
});

// Handle modal container clicks (for overlay)
document.querySelectorAll(".modal-container").forEach(container => {
  container.addEventListener("click", function(e) {
    // If the click is directly on the modal container (overlay area)
    if (e.target === this) {
      closeModal(this);
    }
  });
});

// Handle escape key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal-container.active");
    if (activeModal) {
      activeModal.classList.remove("active");
      document.body.classList.remove("modal-active");
      const overlay = activeModal.querySelector("[data-overlay]");
      if (overlay) overlay.classList.remove("active");
    }
  }
});

// Prevent clicks inside modal from closing it
document.querySelectorAll(".project-modal").forEach(modal => {
  modal.addEventListener("click", function(e) {
    e.stopPropagation();
  });
});

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText;
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue.toLowerCase() === "all") {
      filterItems[i].classList.add("active");
    } else {
      const categories = filterItems[i].dataset.category.split(',');
      if (categories.includes(selectedValue)) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText;
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.getAttribute("data-nav-link");
    
    // Update active states
    for (let j = 0; j < pages.length; j++) {
      if (targetPage === pages[j].getAttribute("data-page")) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// Initialize the first page as active
const firstPage = pages[0];
const firstNavLink = navigationLinks[0];

if (firstPage && firstNavLink) {
  firstPage.classList.add("active");
  firstNavLink.classList.add("active");
}
});