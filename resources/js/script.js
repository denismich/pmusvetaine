"use strict";

/* SmtpJS.com - v3.0.0 */
var Email = { send: function (a) {
  return new Promise(function (n, e) {
    a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send";
    var t = JSON.stringify(a);
    Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
      n(e);
    });
  });
}, 
ajaxPost: function (e, n, t) {
  var a = Email.createCORSRequest("POST", e);
  a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), 
  a.onload = function () {
    var e = a.responseText;
    null != t && t(e);
  },
  a.onerror = function () {
    oldBrowsersErrorModal.style.display = 'block';
    window.scrollBy(0,-1);
    oldBrowsersErrorModal.focus();
  }, a.send(n);
},
ajax: function (e, n) {
  var t = Email.createCORSRequest("GET", e);
  t.onload = function () {
    var e = t.responseText;
    null != n && n(e)
  },
  t.onerror = function () {
    oldBrowsersErrorModal.style.display = 'block';
    window.scrollBy(0,-1);
    oldBrowsersErrorModal.focus();
  }, t.send()
},
createCORSRequest: function (e, n) {
  var t = new XMLHttpRequest;
  return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t;
}
};

//Header navigation bar icon
var headerNavIcon = document.querySelector('#header-nav-icon');
var headerNavMenu = document.querySelector('#header-nav-menu');

headerNavIcon.addEventListener('click', function() {
  document.querySelector('#header-nav-menu').classList.toggle('visible');
  headerNavIcon.classList.toggle('open');
});
var navLinks = document.querySelectorAll('.nav-link');

headerNavIcon.addEventListener('keydown', function(event) {
  if (event.keyCode === 13 || event.keyCode === 32) {
    event.preventDefault();
    headerNavIcon.click();
  }
  if (headerNavIcon.classList.contains('open')) {
    if (event.keyCode === 9) {
      event.preventDefault();
    }
    if (event.keyCode === 27) {
      headerNavIcon.classList.remove('open');
      headerNavMenu.classList.remove('visible');
    }
    if (event.keyCode === 38) {
      event.preventDefault();
      navLinks[navLinks.length-1].focus();
    }
    if (event.keyCode === 40) {
      event.preventDefault();
      navLinks[0].focus();
    }
    for(var i = 0; i < navLinks.length; i++) {
      (function(index) {
        navLinks[index].addEventListener('keydown', function(event) {
          if (event.keyCode === 9 || event.keyCode === 32) {
            event.preventDefault();
          }
          if (event.keyCode === 27) {
            headerNavIcon.classList.remove('open');
            headerNavMenu.classList.remove('visible');
            headerNavIcon.focus();
          }
          if(event.keyCode === 38) {
            event.preventDefault();
            if (index !== 0) {
              navLinks[index-1].focus();
            } else {
              navLinks[navLinks.length-1].focus();
            }
          }
          if (event.keyCode === 40) {
            event.preventDefault();
            if (index < navLinks.length - 1) {
              navLinks[index+1].focus();
            } else {
              navLinks[0].focus();
            }
          }
        });
      })(i);
    }
  }
})

//Banner registration button
var registrationSection = document.querySelector('#registration-section');
document.querySelector('#banner-registration-button').addEventListener('click', function() {
    try {
      registrationSection.scrollIntoView({behavior: 'smooth'});
  } catch(error) {
      registrationSection.scrollIntoView();
  }
  setTimeout(function() {document.querySelector('#registration-board').focus()}, 500);
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
      currentImageIndex = imageArray.indexOf(event.target);
      fullScreenImage.src = event.target.src;
      fullScreenContainer.style.display = 'block';
      fullScreenImage.focus();
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
  fullScreenImage.src = imageContainer.children[currentImageIndex].src;
});

nextButton.addEventListener('click', function() {
  currentImageIndex = (currentImageIndex + 1) % imageContainer.children.length;
  fullScreenImage.src = imageContainer.children[currentImageIndex].src;
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

  slideshowContainer.addEventListener('mouseenter', pause);
  slideshowContainer.addEventListener('mouseleave', resume);
  slideshowContainer.addEventListener('touchstart', pause);
  slideshowContainer.addEventListener('touchend', resume);
});

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

//Button for scrolling to top
var scrollToTopButton = document.querySelector('#scroll-to-top-button');

window.addEventListener("scroll", function() {window.scrollY > 1000 ? scrollToTopButton.classList.add("show") : scrollToTopButton.classList.remove("show")});

scrollToTopButton.addEventListener('click', function() {
  try {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  } catch(err) {
    window.scrollTo(0, 0)
  }
  });