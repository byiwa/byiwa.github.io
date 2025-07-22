// script.js

// Function to run the entry animation on .card elements
function animateCards() {
  const cards = Array.from(document.querySelectorAll('.card'));

  // Reset any lingering state
  cards.forEach(card => {
    card.classList.remove('is-loaded');
    card.style.transitionDelay = '';
  });

  // Force reflow so the start state is applied
  void document.body.offsetWidth;

  // Staggered "enter" animation
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('is-loaded');
    }, 100 * i);
  });
}

// Function to run the entry animation on .caseContent element (fade + translate Y)
function animatePage() {
  const pageEl = document.querySelector('.caseContent');
  if (!pageEl) return;

  // Initial state: hidden and shifted down 12px
  pageEl.style.opacity = '0';
  pageEl.style.transform = 'translateY(12px)';
  pageEl.style.transition = 'opacity 300ms ease-out, transform 300ms ease-out';

  // Force reflow so the start state is applied
  void pageEl.offsetWidth;

  // Animate to visible and original position
  setTimeout(() => {
    pageEl.style.opacity = '1';
    pageEl.style.transform = 'translateY(0)';
  }, 50);
}

// Function to wire up exit transitions on link clicks (no stagger, caseContent exits too)
function setupExitTransitions() {
  const cards = Array.from(document.querySelectorAll('.card'));
  const pageEl = document.querySelector('.caseContent');
  const links = Array.from(document.querySelectorAll('a'))
    .filter(link => !link.target);

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.href;

      // Exit cards: remove delay and hide immediately
      cards.forEach(card => {
        card.style.transitionDelay = '0ms';
        card.classList.remove('is-loaded');
      });

      // Exit caseContent: prepare transition, force reflow, then fade out and shift down
      if (pageEl) {
        pageEl.style.transition = 'opacity 300ms ease-out, transform 300ms ease-out';
        pageEl.style.transitionDelay = '0ms';
        // force reflow to ensure transition applies
        void pageEl.offsetWidth;
        pageEl.style.opacity = '0';
        pageEl.style.transform = 'translateY(12px)';
      }

      // Determine the longest transition duration: cards 150ms or caseContent 300ms
      const cardsDelay = cards.length ? 100 * (cards.length - 1) + 150 : 0;
      const pageDelay = 300;
      const totalDelay = Math.max(cardsDelay, pageDelay);

      // Navigate after animations complete
      setTimeout(() => {
        window.location.href = href;
      }, totalDelay);
    });
  });
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  animatePage();
  animateCards();
  setupExitTransitions();
});

// Re-run entry animations when returning via bfcache
window.addEventListener('pageshow', event => {
  if (event.persisted) {
    animatePage();
    animateCards();
  }
});
