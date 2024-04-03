let currentCount = 0;

window.addEventListener("click", (event) => {
  if (
    event.target.closest(".details-wrapper") &&
    (event.target.dataset.action === "plus" ||
      event.target.dataset.action === "minus")
  ) {
    const counterWrapper = event.target.closest(".counter-wrapper");
    const count = counterWrapper.querySelector("[data-counter]");

    if (event.target.dataset.action === "plus") {
      count.innerText = ++count.innerText;
    }

    if (event.target.dataset.action === "minus") {
      count.innerText = --count.innerText;
      if (count.innerText <= 0) {
        count.innerText = 1;
      }
    }
    currentCount = parseInt(count.innerText);
  }
});
