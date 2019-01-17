class Brandi {
  constructor() {
    this.icon = document.getElementById('icon');
    this.navLinkButtons = document.querySelectorAll('.nav-link');
    this.slides = document.querySelectorAll(".slide");
    this.dots = document.querySelectorAll(".carousel-controls .dot");
    this.nextButton = document.getElementById("next-button");
    this.prevButton = document.getElementById("prev-button");
    this.currentSlide = 0;
    this.playing = true;
    this.filterButtons = document.querySelectorAll('.filter-button');

    this.icon.addEventListener('click', event => this.showNavLinks(event));
    
    this.nextButton.addEventListener('click', event => {
      this.pauseSlideshow();
      this.nextSlide(event);
    });
    this.prevButton.addEventListener('click', event => {
      this.pauseSlideshow();
      this.prevSlide(event);
    });

    this.filter("all");


    for (let navLinkButton of this.navLinkButtons) {
      navLinkButton.addEventListener('click', event => this.smoothScroll(event));
    }

    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].addEventListener('click', event => this.goToSlide(i))
    }

    for (let button of this.filterButtons) {
      button.addEventListener('click', event => this.handleFilterButtons(event));
    }
  
  }

  showNavLinks(event) {
    let nav = document.getElementById('nav-links');
    let bar = document.getElementById('icon');

    bar.className === 'icon' ? bar.className += ' change' : bar.className = 'icon';
    nav.className === 'nav-links' ? nav.className += ' responsive' : nav.className = 'nav-links';
  }

  handleFilterButtons(event) {
    let activeButton = document.getElementsByClassName('active-filter-button');
    activeButton[0].className = activeButton[0].className.replace(" active-filter-button", "");
    event.target.className += " active-filter-button";
    console.log(activeButton);
    this.filter(event.target.value);
  }
  smoothScroll(event) {
    let bar = document.getElementById('icon');

    bar.className === 'icon' ? bar.className += ' change' : bar.className = 'icon';
    let activeNavLink = document.getElementsByClassName('active-nav-link');
    activeNavLink[0].className = activeNavLink[0].className.replace(" active-nav-link", "");
    event.target.className += " active-nav-link";

    let parentElement = event.target.parentNode;
    let parentElementClass = parentElement.className.split(' ')[1];
    if (parentElementClass === 'responsive') {
      console.log('yes');
      this.removeClass(parentElement, 'responsive');
    } else {
      console.log('no');
    }
    if (event.target.dataset.target === '#') {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      let target = event.target.dataset.target.split('#')[1];
      document.querySelector('#' + target).scrollIntoView({
        behavior: 'smooth'
      });
    }


  }

  pauseSlideshow() {
    this.playing = false;
    clearInterval(this.slideInterval);
  }
  playSlideshow() {
      this.goToSlide(0);
      this.playing = true;
      this.slideInterval = setInterval(this.nextSlide.bind(this), 2000);    
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

  filter(filterName) {
    let photoElement, i;
    let photoElements = document.getElementsByClassName("column");

    if (filterName === 'all') {
      filterName = "";
    }

    for (i = 0; i < photoElements.length; i++) {
      this.removeClass(photoElements[i], "show");
      if (photoElements[i].className.indexOf(filterName) > -1) {
        this.addClass(photoElements[i], "show");
      }

    }
  }

  removeClass(elementName, nameOfClass) {
    var i, arrayOfElementClassNames, arrayOfClass;
    arrayOfElementClassNames = elementName.className.split(" ");
    arrayOfClass = nameOfClass.split(" ");

    for (i = 0; i < arrayOfClass.length; i++) {
      while (arrayOfElementClassNames.indexOf(arrayOfClass[i]) > -1) {
        arrayOfElementClassNames.splice(arrayOfElementClassNames.indexOf(arrayOfClass[i]), 1);
      }
    }
    elementName.className = arrayOfElementClassNames.join(" ");
  }

  addClass(elementName, nameOfClass) {
    var i, arrayOfElementClassNames, arrayOfClass;
    arrayOfElementClassNames = elementName.className.split(" ");
    arrayOfClass = nameOfClass.split(" ");

    for (i = 0; i < arrayOfClass.length; i++) {
      if (arrayOfElementClassNames.indexOf(arrayOfClass[i]) === -1) {
        elementName.className += " " + arrayOfClass[i];
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let brandiObject = new Brandi();
  brandiObject.playSlideshow();
});
