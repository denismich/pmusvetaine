"use strict";

//Gallery filters
var galleryImages = document.querySelectorAll('.gallery-photo');
var galleryFilters = document.querySelectorAll('.gallery-filter');

for (var i = 0; i < galleryFilters.length; i++) {
  galleryFilters[i].addEventListener('click', function() {
    document.querySelector('.focused-filter').classList.remove('focused-filter');
    event.target.classList.add('focused-filter');
    for (var j = 0; j < galleryImages.length; j++) {
      if (galleryImages[j].classList.contains(event.target.id) || event.target.id === 'visi') {
        galleryImages[j].style.display = 'inline-block';
      } else {
        galleryImages[j].style.display = 'none';
      }
    }
  });
}

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
  if (event[keyCode] === 13) {
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
  if (event[keyCode] === 9) {
    closeButton.focus();
  }
  if (event[keyCode] === 13) {
    nextButton.click();
  }
});

closeButton.addEventListener('keydown', function(event) {
  if (event[keyCode] === 9) {
    prevButton.focus();
  }
  if (event[keyCode] === 13) {
    event.target.click();
  }
});

prevButton.addEventListener('keydown', function(event) {
  if (event[keyCode] === 9) {
    nextButton.focus();
  }
  if (event[keyCode] === 13) {
    event.target.click();
  }
});

nextButton.addEventListener('keydown', function(event) {
  if (event[keyCode] === 9) {
    fullScreenImage.focus();
  }
  if (event[keyCode] === 13) {
    event.target.click();
  }
});

window.addEventListener('keydown', function(event) {
  if (fullScreenContainer.style.display === 'block') {
    if (event[keyCode] === 27) {
      event.preventDefault();
      fullScreenContainer.style.display = 'none';
      imageToFocus.focus();
    }
    if (event[keyCode] === 9 || event[keyCode] === 32 || event[keyCode] === 38 || event[keyCode] === 40) {
      event.preventDefault();
    }
    if (event[keyCode] === 39) {
      event.preventDefault();
      nextButton.click();
    }
    if (event[keyCode] === 37) {
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
  do {
    currentImageIndex = (currentImageIndex + imageContainer.children.length - 1) % imageContainer.children.length;
  } while (imageContainer.children[currentImageIndex].style.display === 'none');
  fullScreenImage.src = imageContainer.children[currentImageIndex].children[2].src.replace('/gallery/', '/gallery-enlarged/');
});

nextButton.addEventListener('click', function() {
  do {
    currentImageIndex = (currentImageIndex + 1) % imageContainer.children.length;
  } while (imageContainer.children[currentImageIndex].style.display === 'none');
  fullScreenImage.src = imageContainer.children[currentImageIndex].children[2].src.replace('/gallery/', '/gallery-enlarged/');
});

//Header height for scrolling/links to elements
var headerHeight = document.querySelector('header').clientHeight;

//Gallery registration button
var registrationSection = document.querySelector('#registration-section-old');
var registrationTitle = document.querySelector('#registration-title-old');

var galleryRegistrationButton = document.querySelector('#gallery-registration-button');

window.addEventListener('load', function() {
  if (typeof Calendly === 'undefined') {
    galleryRegistrationButton.style.display = 'inline-block';
  }
});

galleryRegistrationButton.addEventListener('click', function() {
  window.scrollBy(0, registrationSection.getBoundingClientRect().top - headerHeight);
  setTimeout(function() {
    document.querySelector('#name').focus();
    window.scrollBy(0, registrationSection.getBoundingClientRect().top - headerHeight);
  }, 100);
});

window.addEventListener("scroll", function() {
  registrationTitle.getBoundingClientRect().bottom - window.innerHeight < 0 ? galleryRegistrationButton.classList.add("hide") : galleryRegistrationButton.classList.remove("hide")
});