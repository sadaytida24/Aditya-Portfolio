'use strict';

// Helper toggle
const elementToggleFunc = (elem) => elem.classList.toggle('active');

// Sidebar
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', () => {
    elementToggleFunc(sidebar);
    const expanded = sidebar.classList.contains('active');
    sidebarBtn.setAttribute('aria-expanded', String(expanded));
  });
}

// Testimonials modal (kept if used)
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle('active');
  overlay.classList.toggle('active');
};

if (testimonialsItem && modalContainer && overlay) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
      if (!modalImg || !modalTitle || !modalText) return;
      modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
      modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt || 'Avatar';
      modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
      modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;
      testimonialsModalFunc();
    });
  }
}

if (modalCloseBtn && overlay) {
  modalCloseBtn.addEventListener('click', testimonialsModalFunc);
  overlay.addEventListener('click', testimonialsModalFunc);
}

// Filter select
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === 'all' || selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add('active');
    } else {
      filterItems[i].classList.remove('active');
    }
  }
};

if (select) {
  select.addEventListener('click', function () {
    elementToggleFunc(this);
  });

  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

// Buttons on wide screens
let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener('click', function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove('active');
    this.classList.add('active');
    lastClickedBtn = this;
  });
}

// Contact form enable
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formInputs && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute('disabled');
      } else {
        formBtn.setAttribute('disabled', '');
      }
    });
  }
}

// Page navigation
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add('active');
        navigationLinks[i].classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        pages[j].classList.remove('active');
        navigationLinks[j]?.classList.remove('active');
      }
    }
  });
}
