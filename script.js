const cards = document.querySelectorAll(".card");

window.addEventListener("load", () => {
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add("visible");
    }, i * 120);
  });
});
