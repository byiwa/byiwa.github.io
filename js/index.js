document.addEventListener('DOMContentLoaded', function() {
  // 1. Grab all your cards
  const cards = Array.from(document.querySelectorAll('.grid__card'));

  // 2. On page load: stagger each card’s “pop-in”
  cards.forEach((card, idx) => {
    setTimeout(() => {
      card.classList.add('pop-in');
    }, idx * 100); // 100 ms between each card
  });

  // 3. Whenever a card-link is clicked: play “pop-out” on all, then navigate
  cards.forEach(card => {
    // we only care about the <a> cards
    if (card.tagName.toLowerCase() !== 'a') return;

    card.addEventListener('click', function(e) {
      e.preventDefault();               // stop it jumping immediately
      const targetURL = this.href;      // where we’ll go

      // reverse the animation on every card
      cards.forEach(c => {
        c.classList.remove('pop-in');
        c.classList.add('pop-out');
      });

      // wait for the 300 ms transition, then navigate
      setTimeout(() => {
        window.location.href = targetURL;
      }, 300);
    });
  });
});