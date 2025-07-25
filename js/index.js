const cards = Array.from(document.querySelectorAll('.grid__card'));

function resetCards() {
  cards.forEach(c => c.classList.remove('pop-in','pop-out'));
}

function pageLoad() {
  resetCards();

  cards.forEach((card, idx) => {
    setTimeout(() => card.classList.add('pop-in'), idx * 100);
  });
}

window.addEventListener('pageshow', () => {
  pageLoad();
});

window.addEventListener('pagehide', resetCards);

cards.forEach(card => {
  if (card.tagName.toLowerCase() !== 'a') return;
  card.addEventListener('click', e => {
    e.preventDefault();
    const url = card.href;
    cards.forEach(c => {
      c.classList.remove('pop-in');
      c.classList.add('pop-out');
    });
    setTimeout(() => window.location.href = url, 300);
  });
});