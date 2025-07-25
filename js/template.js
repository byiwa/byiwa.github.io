function initTemplateAnimations() {
  const sections = Array.from(document.querySelectorAll('.case-content'));
  const backBtn  = document.querySelector('.nav__back');

  sections.forEach(sec => {
    sec.classList.remove('fade-in','fade-out');
  });
  if (backBtn) {
    backBtn.classList.remove('slide-in','slide-out');
  }

  sections.forEach(sec => sec.classList.add('fade-in'));

  if (sections.length && backBtn) {
    const first = sections[0];
    function onFirstFade(e) {
      if (e.propertyName === 'opacity') {
        backBtn.classList.add('slide-in');
        first.removeEventListener('transitionend', onFirstFade);
      }
    }
    first.addEventListener('transitionend', onFirstFade);
  }

  document.querySelectorAll('a').forEach(link => {
    if (link._hasHandler) return;
    link._hasHandler = true;
    link.addEventListener('click', e => {
      e.preventDefault();
      const url = link.href;

      sections.forEach(sec => {
        sec.classList.remove('fade-in');
        sec.classList.add('fade-out');
      });
      if (backBtn) {
        backBtn.classList.remove('slide-in');
        backBtn.classList.add('slide-out');
      }

      setTimeout(() => window.location.href = url, 300);
    });
  });
}

window.addEventListener('pageshow', initTemplateAnimations);

window.addEventListener('pagehide', () => {
  document.querySelectorAll('.case-content').forEach(sec => {
    sec.classList.remove('fade-in','fade-out');
  });
  const backBtn = document.querySelector('.nav__back');
  if (backBtn) backBtn.classList.remove('slide-in','slide-out');
});