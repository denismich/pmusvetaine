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
window.addEventListener('load', function() {
  if (typeof Calendly === 'undefined') {
    registrationSection = document.querySelector('#registration-section-old');
  }
});

var bannerRegistrationButton = document.querySelector('#banner-registration-button');
bannerRegistrationButton.addEventListener('click', function() {
    try {
      registrationSection.scrollIntoView({behavior: 'smooth'});
  } catch(error) {
      registrationSection.scrollIntoView();
  }
  setTimeout(function() {
    if (typeof Calendly !== 'undefined') {
      document.querySelector('#registration-board').focus();
    } else {
      document.querySelector('#name').focus();
    }
  }, 500);
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

//Registration section appearance
window.addEventListener('load', function() {
  if (typeof Calendly !== 'undefined') {
    document.querySelector('#registration-section').style.display = 'block';
    document.querySelector('#registration-section-old').style.display = 'none';
  } else {
    document.querySelector('#registration-section').style.display = 'none';
    document.querySelector('#registration-section-old').style.display = 'block';
  }
});

//Registration form select dropdown
var select = document.querySelector('#procedure');
var dropdown = document.querySelector('#custom-dropdown');
var dropdownOptions = document.querySelectorAll('#custom-dropdown .option');

var toggleDropdown = function() {
  dropdown.classList.toggle('opened');

  if (dropdown.classList.contains('opened')) {
    dropdown.style.top = '0';
    
    var selectRect = select.getBoundingClientRect();
    var dropdownRect = dropdown.getBoundingClientRect();
    var spaceBelow = document.documentElement.clientHeight - selectRect.bottom;
    var spaceAbove = selectRect.top;
    var distanceDownward = selectRect.bottom - dropdownRect.top;
    var distanceUpward = selectRect.top - dropdownRect.bottom;
    
    dropdown.style.top = ((spaceBelow >= dropdownRect.height || spaceAbove < dropdownRect.height) ? distanceDownward : distanceUpward) + 'px';
  }
}
var closeDropdownFromOutside = function(event) {event.target !== select && dropdown.classList.remove('opened')};

var selectOption = function(event) {select.value = event.currentTarget.textContent};

select.addEventListener('mousedown', function(event) {event.preventDefault()});
select.addEventListener('keydown', function(event) {
  if (event.keyCode === 13 || event.keyCode === 32) {
    event.preventDefault();
    toggleDropdown();
  }
  if (event.keyCode === 27) {
    dropdown.classList.remove('opened');
  }
  if (event.keyCode === 38) {
    event.preventDefault();
    dropdownOptions[dropdownOptions.length-1].focus();
  }
  if (event.keyCode === 40) {
    event.preventDefault();
    dropdownOptions[0].focus();
  }
});

select.addEventListener('click', toggleDropdown);

document.body.addEventListener('click', closeDropdownFromOutside);

for(var i = 0; i < dropdownOptions.length; i++) {
  dropdownOptions[i].addEventListener('click', selectOption);
  (function(index) {
    dropdownOptions[index].addEventListener('keydown', function(event) {
      if (event.keyCode === 9 || event.keyCode === 32) {
        event.preventDefault();
      }
      if (event.keyCode === 13 || event.keyCode === 27) {
        selectOption(event);
        closeDropdownFromOutside(event);
        select.focus();
      }
      if(event.keyCode === 38) {
        event.preventDefault();
        if (index !== 0) {
          dropdownOptions[index-1].focus();
        } else {
          dropdownOptions[dropdownOptions.length-1].focus();
        }
      }
      if (event.keyCode === 40) {
        event.preventDefault();
        if (index < dropdownOptions.length - 1) {
          dropdownOptions[index+1].focus();
        } else {
          dropdownOptions[0].focus();
        }
      }
    });
  })(i);
}

//Email sending on registration
var form = document.querySelector('#registration-form');

var successModal = document.querySelector('#success-modal');
var errorModal = document.querySelector('#error-modal');
var oldBrowsersErrorModal = document.querySelector('#old-browsers-error-modal');
var validationErrorModal = document.querySelector('#validation-error-modal');

var modals = document.querySelectorAll('.modal');
var modalCloseButtons = document.querySelectorAll('.modal-close-button');

var sendEmail = function() {
  var name = document.querySelector('#name').value;
  var email = document.querySelector('#email').value;
  var phone = document.querySelector('#phone').value;
  var visitDate = document.querySelector('#date').value;
  var procedure = document.querySelector('#procedure').value;
  var message = document.querySelector('#message').value;
  var notification = 'Registracijos procedūrai užklausa: <br><br>Vardas:  '+ name + '<br>El. paštas:  ' + email + '<br>Telefonas:  ' + phone + '<br>Data:  ' + visitDate + '<br>Procedūra:  ' + procedure + '<br>Žinutė:  ' + message;
  
  if (!name || !email || !phone || !visitDate || !procedure || procedure === 'Pasirinkite procedūrą') {
    validationErrorModal.style.display = 'block';
    window.scrollBy(0,-1);
    validationErrorModal.focus();
    return;
  }

  Email.send({
      SecureToken: '90677d85-8654-4537-91d0-eacde4cbff0 d',
      To : 'dmichailovskij@gmail.com',
      From : 'dmichailovskij@gmail.com',
      Subject : 'Registracijos Procedūrai Užklausa',
      Body : notification
  }).then(function(message) {
    if (message === 'OK') {
      successModal.style.display = 'block';
      window.scrollBy(0,-1);
      successModal.focus();
      form.reset();
    } else {
      throw new Error('Email was not sent');
    }
  })
  .catch(function(error) {
    errorModal.style.display = 'block';
    window.scrollBy(0,-1);
    errorModal.focus();
  });
}

var closeModal = function() {
  successModal.style.display = 'none';
  errorModal.style.display = 'none';
  oldBrowsersErrorModal.style.display = 'none';
  validationErrorModal.style.display = 'none';
  document.querySelector('#submit').focus();
}

var closeModalFromOutside = function(event) {
  if (event.target === successModal || event.target === errorModal || event.target === oldBrowsersErrorModal || 
    event.target === validationErrorModal) {
    closeModal();
  }
}

for(var i = 0; i < modalCloseButtons.length; i++) {
  modalCloseButtons[i].addEventListener('click', closeModal);
}

document.body.addEventListener('click', closeModalFromOutside);

window.addEventListener('keydown', function(event) {
  if (successModal.style.display === 'block' || errorModal.style.display === 'block' || 
  oldBrowsersErrorModal.style.display === 'block' || validationErrorModal.style.display === 'block') {
    if (event.keyCode === 32 || event.keyCode === 38 || event.keyCode === 40) {
      event.preventDefault();
    }
    if (event.keyCode === 27) {
      closeModal();
    }
    if (event.keyCode === 9) {
      event.preventDefault();
      for (var i = 0; i < modalCloseButtons.length; i++) {
        if (modals[i].style.display === 'block') {
          modalCloseButtons[i].focus();
          modalCloseButtons[i].addEventListener('keydown', function(e) {
            if (e.keyCode === 13 || e.keyCode === 32) {
              e.preventDefault();
              closeModal();
            }
          });
        }
      }
    }
  }
});

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
  setTimeout(function() {
    if (headerNavIcon.style.display !== 'none') {
      headerNavIcon.focus();
    } else {
      document.querySelector('#first-link').focus();
    }
  }, 500);
});