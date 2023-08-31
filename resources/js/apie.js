"use strict";

//Header height for scrolling/links to elements
var headerHeight = document.querySelector('header').clientHeight;

//Banner registration button
var registrationSection = document.querySelector('#registration-section-old');
var bannerRegistrationButton = document.querySelector('#banner-registration-button');
var initCalendlyPopupWidget = function() {
  Calendly.initPopupWidget({url: 'https://calendly.com/dmichailovskij?hide_landing_page_details=1&primary_color=ff00ea'});
  return false;
}

bannerRegistrationButton.addEventListener('click', initCalendlyPopupWidget);

window.addEventListener('load', function() {
  if (typeof Calendly === 'undefined') {
    bannerRegistrationButton.removeEventListener('click', initCalendlyPopupWidget);
    bannerRegistrationButton.addEventListener('click', function() {
      window.scrollBy(0, registrationSection.getBoundingClientRect().top - headerHeight);
      setTimeout(function() {
        document.querySelector('#name').focus();
        window.scrollBy(0, registrationSection.getBoundingClientRect().top - headerHeight);
      }, 100);
    });
  }
});

//Gallery images enlarging
var imageContainer = document.querySelector('#gallery-photos-container');
var fullScreenContainer = document.querySelector('#full-screen-container');
var fullScreenImage = document.querySelector('#full-screen-image');
var prevButton = document.querySelector('#prev-button');
var nextButton = document.querySelector('#next-button');
var closeButton = document.querySelector('#close-button');
var imageToFocus = null;
var imageArray = [];

for(var i = 0; i < imageContainer.children.length; i++) {
  imageArray.push(imageContainer.children[i]);
}

var currentImageIndex = 0;

imageContainer.addEventListener('click', function(event) {
  if (event.target.tagName === 'IMG') {
      imageToFocus = event.target;
      setTimeout(function() {
        fullScreenContainer.style.display = 'block';
        fullScreenImage.focus();
      }, 100);
      fullScreenImage.src = event.target.src.replace('/gallery/', '/gallery-enlarged/');
      currentImageIndex = imageArray.indexOf(event.target.parentElement);
  }
});

imageContainer.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    event.target.click();
  }
})

fullScreenContainer.addEventListener('click', function(event) {
  if (event.target === fullScreenContainer) {
      fullScreenContainer.style.display = 'none';
      imageToFocus.focus();
  }
});

fullScreenImage.addEventListener('keydown', function(event) {
  if (event.keyCode === 9) {
    closeButton.focus();
  }
  if (event.keyCode === 13) {
    nextButton.click();
  }
});

closeButton.addEventListener('keydown', function(event) {
  if (event.keyCode === 9) {
    prevButton.focus();
  }
  if (event.keyCode === 13) {
    event.target.click();
  }
});

prevButton.addEventListener('keydown', function(event) {
  if (event.keyCode === 9) {
    nextButton.focus();
  }
  if (event.keyCode === 13) {
    event.target.click();
  }
});

nextButton.addEventListener('keydown', function(event) {
  if (event.keyCode === 9) {
    fullScreenImage.focus();
  }
  if (event.keyCode === 13) {
    event.target.click();
  }
});

window.addEventListener('keydown', function(event) {
  if (fullScreenContainer.style.display === 'block') {
    if (event.keyCode === 27) {
      event.preventDefault();
      fullScreenContainer.style.display = 'none';
      imageToFocus.focus();
    }
    if (event.keyCode === 9 || event.keyCode === 32 || event.keyCode === 38 || event.keyCode === 40) {
      event.preventDefault();
    }
    if (event.keyCode === 39) {
      event.preventDefault();
      nextButton.click();
    }
    if (event.keyCode === 37) {
      event.preventDefault();
      prevButton.click();
    }
  }
});

closeButton.addEventListener('click', function() {
  fullScreenContainer.style.display = 'none';
  imageToFocus.focus();
});

prevButton.addEventListener('click', function() {
  currentImageIndex = (currentImageIndex + imageContainer.children.length - 1) % imageContainer.children.length;
  fullScreenImage.src = imageArray[currentImageIndex].children[2].src.replace('/gallery/', '/gallery-enlarged/');
});

nextButton.addEventListener('click', function() {
  currentImageIndex = (currentImageIndex + 1) % imageContainer.children.length;
  fullScreenImage.src = imageArray[currentImageIndex].children[2].src.replace('/gallery/', '/gallery-enlarged/');
});

//Testimonials slides
var dots = document.getElementsByClassName('dot');

var slideIndex = 1;
var myTimer;

var showSlides = function(n) {
  clearInterval(myTimer);
  myTimer = setInterval(function() {showSlides(slideIndex += 1)}, 4000);

  var slides = document.getElementsByClassName('slide');
  
  n > slides.length && (slideIndex = 1);
  n < 1 && (slideIndex = slides.length);

  for (var i = 0; i < slides.length; i++) {
      slides[i].style.transform = `translateX(${(i+slideIndex-1) * 100}%)`;
      dots[i].classList.remove('active');
  }
  slides[slideIndex-1].style.transform = 'translateX(0)';
  dots[slideIndex-1].className += ' active';
}

var pause = function() {clearInterval(myTimer)};
var resume = function() {myTimer = setInterval(function() {showSlides(slideIndex += 1)}, 4000)};

window.addEventListener('DOMContentLoaded', function() {
  showSlides(slideIndex);

  var slideshowContainer = document.querySelector('#slideshow-container');

  // slideshowContainer.addEventListener('mouseenter', pause);
  // slideshowContainer.addEventListener('mouseleave', resume);
//   slideshowContainer.addEventListener('touchstart', pause, passiveArgument);
//   slideshowContainer.addEventListener('touchend', resume);
// }, passiveArgument);

for (var i = 0; i < dots.length; i++) {
  (function(index) {
    dots[index].addEventListener('click', function() {showSlides(slideIndex = index + 1)});
    dots[index].addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
        dots[index].click();
      }
    });
  })(i);
}

//Adjusting testimonials section position when redirected from links
window.addEventListener('DOMContentLoaded', function() {
  var targetId = window.location.hash.substring(1);
  if (targetId !== '') {
      var target = document.querySelector('#' + targetId);
      setTimeout(function() {window.scrollBy(0, target.getBoundingClientRect().top - headerHeight);}, 100);
      target.focus();
  }
});

document.querySelector('#testimonials-link').addEventListener('click', function() {
  var targetId = window.location.hash.substring(1);
  if (targetId !== '') {
      var target = document.querySelector('#' + targetId);
      setTimeout(function() {window.scrollBy(0, target.getBoundingClientRect().top - headerHeight);}, 100);
  }
  document.querySelector('#header-nav-icon').classList.remove('open');
  document.querySelector('#header-nav-menu').classList.remove('visible');
});