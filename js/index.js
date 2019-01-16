class Brandi {
  constructor() {
    this.icon = document.getElementById('icon');
    this.slides = document.querySelectorAll(".slide");
    this.dots = document.querySelectorAll(".carousel-controls .dot");
    this.nextButton = document.getElementById("next-button");
    this.prevButton = document.getElementById("prev-button");
    this.currentSlide = 0;
    this.playing = true;

    this.icon.addEventListener('click', event => this.showNavLinks(event));
    this.nextButton.addEventListener('click', event => this.nextSlide(event));
    this.prevButton.addEventListener('click', event => this.prevSlide(event));
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].addEventListener('click', event => this.goToSlide(i))
    }
  }

  showNavLinks(event) {
    let nav = document.getElementById('nav-links');

    nav.className === 'nav-links' ? nav.className += ' responsive' : nav.className = 'nav-links';
  }

  pauseSlideshow() {
    playing = false;
    //    clearInterval(slideInterval);
  }
  playSlideshow() {
    playing = true;
    //        slideInterval = setInterval(nextSlide, 5000);
  }
  nextSlide(event) {
    this.goToSlide(this.currentSlide + 1);
  }
  prevSlide(event) {
    if (this.currentSlide !== 0) this.goToSlide(this.currentSlide - 1);
    else this.goToSlide(this.slides.length - 1);
  }
  goToSlide(nthSlide) {
    this.slides[this.currentSlide].className = "slide";
    this.dots[this.currentSlide].className = "dot";
    this.currentSlide = (nthSlide) % this.slides.length;

    for (let slide of this.slides) {
      slide.style.display = "none";
    }
    for (let dot of this.dots) {
      dot.className = dot.className.replace(" active", "");
    }

    this.slides[this.currentSlide].style.display = 'block';
//    this.slides[this.currentSlide].className += " active";
    this.dots[this.currentSlide].className = "active";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let brandiObject = new Brandi();
  brandiObject.goToSlide(0);
});
