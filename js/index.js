const classEnum={
  ACTIVE: 'active',
};

const styleEnum={
  BLOCK: 'block',
};

const navLinkButtons=document.querySelectorAll('.nav-link');
const slides=document.querySelectorAll('.slide');
const dots=document.querySelectorAll('.carousel-controls .pagination-item');
const filterButtons = document.querySelectorAll('.filter-button');

class Brandi {
  constructor() {
    this.icon=document.getElementById('icon');
    this.nextButton = document.getElementById('next-button');
    this.prevButton = document.getElementById('prev-button');
    this.currentSlide = 0;
    this.playing = true;    
    this.icon.addEventListener('click', event => this.showNavLinks(event));
    this.nextButton.addEventListener('click', event => {
      this.pauseSlideshow();
      this.nextSlide(event);
    });
    this.prevButton.addEventListener('click', event => {
      this.pauseSlideshow();
      this.prevSlide(event);
    });
    this.filter('all');
    for (let navLinkButton of navLinkButtons) {
      navLinkButton.addEventListener('click', event => this.smoothScroll(event));
    }
    for (let i in dots) {
      if(i < dots.length) {
        dots[i].addEventListener('click', event => this.goToSlide(i))  
      }
    }
    for (let button of filterButtons) {
      button.addEventListener('click', event => this.handleFilterButtons(event));
    }
  }

  // Called only in responsive mode.
  showNavLinks(event) {
    const NAV = document.getElementById('nav-links');
    const BAR = document.getElementById('icon');
    BAR.className === 'icon' ? BAR.className += ' change' : BAR.className = 'icon';
    NAV.className === 'nav-links' ? NAV.className += ' responsive' : NAV.className = 'nav-links';
  }

  // This method will be called on clicking any of the filter buttons.
  handleFilterButtons(event) {
    const activeButton = document.getElementsByClassName('active-filter-button');
    activeButton[0].className = activeButton[0].className.replace(' active-filter-button', '');
    event.target.className += ' active-filter-button';
    this.filter(event.target.value);
  }

  // This method is used to scroll smoothly over elements on click.
  smoothScroll(event) {
    const BAR = document.getElementById('icon');
    BAR.className === 'icon' ? BAR.className += ' change' : BAR.className = 'icon';
    const ACTIVE_NAV_LINK = document.getElementsByClassName('active-nav-link');
    ACTIVE_NAV_LINK[0].className = ACTIVE_NAV_LINK[0].className.replace(' active-nav-link', '');
    event.target.className += ' active-nav-link';
    let parentElement = event.target.parentNode;
    let parentElementClass = parentElement.className.split(' ')[1];
    if (parentElementClass === 'responsive') {
      this.removeClass(parentElement, 'responsive');
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

  // This method pauses the slideshow (carousel).
  pauseSlideshow() {
    this.playing = false;
    clearInterval(this.slideInterval);
  }

  // This method plays/resumes the slideshow (carousel).
  playSlideshow() {
    this.goToSlide(0);
    this.playing = true;
    this.slideInterval = setInterval(this.nextSlide.bind(this), 2000);    
  }

  // This method goes to the next slide.
  nextSlide(event) {
    this.goToSlide(this.currentSlide + 1);
  }

  // This method goes to the previous slide.
  prevSlide(event) {
    if (this.currentSlide !== 0) this.goToSlide(this.currentSlide - 1);
    else this.goToSlide(slides.length - 1);
  }

  // This method jumps to the particular carousel slide.
  goToSlide(nthSlide) {
    slides[this.currentSlide].className = 'slide';
    dots[this.currentSlide].className = 'pagination-item';
    this.currentSlide = (nthSlide) % slides.length;
    for (let slide of slides) {
      slide.style.display = 'none';
    }
    for (let dot of dots) {
      dot.className = dot.className.replace(classEnum.ACTIVE, '');
    }
    slides[this.currentSlide].style.display = styleEnum.BLOCK;
    dots[this.currentSlide].className = classEnum.ACTIVE;
  }

  // This method is used to filter the content based on the argument that we provide.
  filter(filterName) {
    let photoElement, i;
    const PHOTO_ELEMENTS = document.getElementsByClassName('column');
    if (filterName === 'all') {
      filterName = '';
    }
    for (let i in PHOTO_ELEMENTS) {
      if(i < PHOTO_ELEMENTS.length) {
        this.removeClass(PHOTO_ELEMENTS[i], 'show');
        if (PHOTO_ELEMENTS[i].className.indexOf(filterName) > -1) {
          this.addClass(PHOTO_ELEMENTS[i], 'show');
        }
      }
    }
  }

  // A generic function to remove class from an element.
  removeClass(elementName, nameOfClass) {
    let i, arrayOfElementClassNames, arrayOfClass;
    arrayOfElementClassNames = elementName.className.split(' ');
    arrayOfClass = nameOfClass.split(' ');
    for (let i in arrayOfClass) {
      if(i < arrayOfClass.length) {
        while (arrayOfElementClassNames.indexOf(arrayOfClass[i]) > -1) {
          arrayOfElementClassNames.splice(arrayOfElementClassNames.indexOf(arrayOfClass[i]), 1);
        }
      }
    }
    elementName.className = arrayOfElementClassNames.join(' ');
  }

  // A generic function to add class to any element.
  addClass(elementName, nameOfClass) {
    let i, arrayOfElementClassNames, arrayOfClass;
    arrayOfElementClassNames = elementName.className.split(' ');
    arrayOfClass = nameOfClass.split(' ');
    for (let i in arrayOfClass) {
      if(i < arrayOfClass.length) {
        if (arrayOfElementClassNames.indexOf(arrayOfClass[i]) === -1) {
          elementName.className += ' ' + arrayOfClass[i];
        }  
      }
    }
  }
}

// Creating object on page load.
document.addEventListener('DOMContentLoaded', () => {
  let brandiObject = new Brandi();
  brandiObject.playSlideshow();
});
