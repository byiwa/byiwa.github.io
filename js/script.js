document.addEventListener('DOMContentLoaded', () => {

  // 1) create one badge element
  const badge = document.createElement('div');
  badge.className = 'hover-badge';
  document.body.append(badge);

  // 2) wire up every cover
  document.querySelectorAll('.cover').forEach(cover => {
    const text = cover.dataset.badge;
    if (!text) return;

    cover.addEventListener('mouseenter', () => {
      badge.textContent = text;
      badge.classList.add('visible');
    });

    cover.addEventListener('mousemove', e => {
      // offset it a bit so it doesn’t sit exactly under the cursor
      badge.style.top  = (e.clientY + 15) + 'px';
      badge.style.left = (e.clientX + 15) + 'px';
    });

    cover.addEventListener('mouseleave', () => {
      badge.classList.remove('visible');
    });
  });

  const overlay = document.querySelector('.coverTransition');
  const links = document.querySelectorAll('.case-link');

  links.forEach(link => {
    link.addEventListener('click', async e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const cover = link.querySelector('div');

      // 1) get the clicked cover's bounding box
      const rect = cover.getBoundingClientRect();

      // 2) snapshot its background-color
      const bg = getComputedStyle(cover).backgroundColor;

      // 3) position & size the overlay exactly over it
      overlay.style.transition = 'none';      // disable transitions while setting
      overlay.style.top = `${rect.top}px`;
      overlay.style.left = `${rect.left}px`;
      overlay.style.width = `${rect.width}px`;
      overlay.style.height = `${rect.height}px`;
      overlay.style.backgroundColor = bg;
      overlay.style.opacity = '0';

      // force a reflow so the browser registers the above as the "start" state
      overlay.getBoundingClientRect();

      // 4) turn transitions back on
      overlay.style.transition = `
        top 0.2s ease,
        left 0.2s ease,
        width 0.2s ease,
        height 0.2s ease,
        opacity 0.2s ease
      `;

      // 5) kick off the animation
      overlay.style.opacity = '1';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';

      // 6) wait until the *longest* transition finishes (height/top/width/left → 0.6s)
      overlay.addEventListener('transitionend', function handler(ev) {
        // only fire once, when height (or width) finishes
        if (ev.propertyName === 'height') {
          overlay.removeEventListener('transitionend', handler);
          // 7) actually navigate
          window.location.href = href;
        }
      });
    });
  });

  const backLink = document.querySelector('.backlink a');
  const cover = document.querySelector('.caseBackTransition');

  backLink.addEventListener('click', e => {
    e.preventDefault();
    // start the slide-up
    cover.classList.add('active');
    // after the transition, go back
    cover.addEventListener('transitionend', () => {
      window.location.href = backLink.getAttribute('href');
    }, { once: true });
  });

  
});

window.addEventListener('pageshow', event => {
  // event.persisted is true when this load
  // was from bfcache, but you can reset unconditionally
  const overlay = document.querySelector('.coverTransition');
  if (!overlay) return;
  // remove any inline styles the last transition left behind
  overlay.removeAttribute('style');
});