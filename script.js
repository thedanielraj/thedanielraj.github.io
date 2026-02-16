const cards = document.querySelectorAll('.card');
const glow = document.querySelector('.cursor-glow');
const hero = document.querySelector('#heroPanel');

const showCards = () => {
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, i * 120);
  });
};

window.addEventListener('load', showCards);

if (glow) {
  window.addEventListener('pointermove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

if (hero) {
  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 7;
    const rotateX = (0.5 - y) * 7;
    hero.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  hero.addEventListener('pointerleave', () => {
    hero.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
  });
}
