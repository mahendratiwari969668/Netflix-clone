// scroll bar
const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");

  slideButtons.forEach(button => {
    button.addEventListener('click', () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  const handleSlideButtons = () => {
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    const atStart = imageList.scrollLeft <= 0;
    const atEnd = imageList.scrollLeft >= maxScrollLeft - 1 || Math.abs(imageList.scrollLeft - maxScrollLeft) < 2;

    slideButtons[0].style.display = atStart ? "none" : "block";
    slideButtons[1].style.display = atEnd ? "none" : "block";
  };

  imageList.addEventListener('scroll', handleSlideButtons);
  window.addEventListener('resize', handleSlideButtons);
  // ensure correct state after layout/images settle
  setTimeout(handleSlideButtons, 50);
  handleSlideButtons();
}

window.addEventListener("load", initSlider)



// FAQ section
const questions = document.querySelectorAll(".que");
questions.forEach((item) => {
  item.addEventListener("click", () => {
    const queBox = item.closest(".queBox");
    if (!queBox) return;
    const icon = item.querySelector(".material-symbols-outlined");

    // If we're about to open this one, close any other open answers first (use classes only)
    const willOpen = !queBox.classList.contains("open");
    if (willOpen) {
      document.querySelectorAll('.queBox.open').forEach(box => {
        if (box !== queBox) {
          box.classList.remove('open');
          const otherIcon = box.querySelector('.material-symbols-outlined');
          if (otherIcon) otherIcon.textContent = 'add_2';
        }
      });
    }

    const isOpen = queBox.classList.toggle("open");
    // Let CSS handle the show/hide/animation based on the .open class
    if (icon) icon.textContent = isOpen ? "close" : "add_2";
  });
});