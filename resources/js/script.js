"use strict";

/* SmtpJS.com - v3.0.0 */
var Email = { send: function (a) {
  try {
    return new Promise(function (n, e) {
      a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send";
      var t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
        n(e);
      });
    });
  } catch(error) {
    console.log("Again, reported successfully");
  }
}, 
ajaxPost: function (e, n, t) {
  var a = Email.createCORSRequest("POST", e);
  a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), 
  a.onload = function () {
    var e = a.responseText;
    null != t && t(e);
  },
  a.onerror = function () {
    console.log("An error sucessfully reported");
  },
  a.send(n);
},
ajax: function (e, n) {
  var t = Email.createCORSRequest("GET", e);
  t.onload = function () {
    var e = t.responseText;
    null != n && n(e)
  }, 
  t.onerror = function () {
    console.log("An error sucessfully reported");
  },
  t.send()
},
createCORSRequest: function (e, n) {
  var t = new XMLHttpRequest;
  return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t;
}
};

//Header navigation bar icon
var headerNavIcon = document.querySelector('#header-nav-icon');
headerNavIcon.addEventListener('click', function() {
  document.querySelector('#header-nav-menu').classList.toggle('visible');
  headerNavIcon.classList.toggle('open');
});

//Banner registration button
document.querySelector('#banner-registration-button').addEventListener('click', function() {
  try {
  window.scrollTo({
  top: document.querySelector('#registration-section').offsetTop,
  behavior: 'smooth'
})
} catch(error) {
  window.scrollTo(0, document.querySelector('#registration-section').offsetTop)
}});

//Gallery images enlarging
var imageContainer = document.querySelector('#gallery-photos-container');
var fullScreenContainer = document.querySelector('#full-screen-container');
var fullScreenImage = document.querySelector('#full-screen-image');
var imageArray = [];
for(var i = 0; i < imageContainer.children.length; i++) {
  imageArray.push(imageContainer.children[i]);
}

var currentImageIndex = 0;

imageContainer.addEventListener('click', function(event) {
  if (event.target.tagName === 'IMG') {
      currentImageIndex = imageArray.indexOf(event.target);
      fullScreenImage.src = event.target.src;
      fullScreenContainer.style.display = 'block';
  }
});

fullScreenContainer.addEventListener('click', function(event) {
  if (event.target === fullScreenContainer) {
      fullScreenContainer.style.display = 'none';
  }
});

document.querySelector('#prev-button').addEventListener('click', function() {
  currentImageIndex = (currentImageIndex + imageContainer.children.length - 1) % imageContainer.children.length;
  fullScreenImage.src = imageContainer.children[currentImageIndex].src;
});

document.querySelector('#next-button').addEventListener('click', function() {
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
      slides[i].style.display = 'none';
      dots[i].classList.remove('active');
  }
      
  slides[slideIndex-1].style.display = 'block';
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
  })(i);
}

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

select.addEventListener('click', toggleDropdown);

document.body.addEventListener('click', closeDropdownFromOutside);

for(var i = 0; i < dropdownOptions.length; i++) {
  dropdownOptions[i].addEventListener('click', selectOption);
}

//Email sending on registration
var form = document.querySelector('#registration-form');

var successModal = document.querySelector('#success-modal');
var errorModal = document.querySelector('#error-modal');

var modalCloseButtons = document.querySelectorAll('.modal-close-button');

var sendEmail = function() {
  var name = document.querySelector('#name').value;
  var email = document.querySelector('#email').value;
  var phone = document.querySelector('#phone').value;
  var visitDate = document.querySelector('#date').value;
  var procedure = document.querySelector('#procedure').value;
  var message = document.querySelector('#message').value;
  var notification = 'Registracijos procedūrai užklausa: <br><br>Vardas:  '+ name + '<br>El. paštas:  ' + email + '<br>Telefonas:  ' + phone + '<br>Data:  ' + visitDate + '<br>Procedūra:  ' + procedure + '<br>Žinutė:  ' + message;
  
  Email.send({
      SecureToken: '90677d85-8654-4537-91d0-eacde4cbff0d',
      To : 'dmichailovskij@gmail.com',
      From : 'dmichailovskij@gmail.com',
      Subject : 'Registracijos Procedūrai Užklausa',
      Body : notification
  }).then(function(message) {
    if (message === 'OK') {
      successModal.style.display = 'flex';
    } else {
      throw new Error('Email was not sent');
    }
  })
  .catch(function(error) {
    errorModal.style.display = 'flex';
  });
}

var closeModal = function() {
  successModal.style.display = 'none';
  errorModal.style.display = 'none';
}

var closeModalFromOutside = function(event) {
  if (event.target === successModal || event.target === errorModal) {
    closeModal();
  }
}

for(var i = 0; i < modalCloseButtons.length; i++) {
  modalCloseButtons[i].addEventListener('click', closeModal);
}

document.body.addEventListener('click', closeModalFromOutside);

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