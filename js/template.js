document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.case-content');
  const backBtn  = document.querySelector('.nav__back');

  sections.forEach((sec, i) => {
    setTimeout(() => {
      sec.classList.add('fade-in');
    }, i * 50);
  });

  if (sections.length) {
    sections[0].addEventListener('transitionend', e => {
      if (e.propertyName === 'opacity') {
        backBtn.classList.add('slide-in');
      }
    });
  }

  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const url = link.href;

      sections.forEach(sec => {
        sec.classList.remove('fade-in');
        sec.classList.add('fade-out');
      });
      backBtn.classList.remove('slide-in');
      backBtn.classList.add('slide-out');

      setTimeout(() => window.location.href = url, 300);
    });
  });
});