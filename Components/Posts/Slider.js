import { useEffect } from "react";

useEffect(() => {
  let Carousel = document.querySelector("#carousel");
  let images = Carousel.querySelectorAll("img");
  let Slide = document.querySelector("#slide");
  let slideIndex = 0;
  carousel(slideIndex);

  for (let i = 0; i < images.length; i++) {
    let div = document.createElement("div");
    Slide.appendChild(div);
  }

  function plusSlide() {
    carousel(slideIndex + 1);
  }
  function minusSlide() {
    carousel(slideIndex - 1);
  }

  function carousel(n) {
    if (n < 0) {
      slideIndex = 0;
      carousel(slideIndex);
    }
    if (n >= 0 && n < images.length) {
      images.forEach((image, i) => {
        image.style.display = "none";
      });
      images[n].style.display = "block";
    }
    if (n >= images.length) {
      slideIndex = images.length - 1;
      carousel(slideIndex);
    }
  }
});
