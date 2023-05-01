//Header height for scrolling/links to elements
var headerHeight = document.querySelector('header').clientHeight;

//Adjusting procedure container position when redirected from links
window.addEventListener('DOMContentLoaded', function() {
    const targetId = window.location.hash.slice(1);
    if (targetId) {
      const target = document.getElementById(targetId);
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, targetTop - headerHeight);
    }
  });

//Registration buttons
var registrationSection = document.querySelector('#registration-section');
window.addEventListener('load', function() {
  if (typeof Calendly === 'undefined') {
    registrationSection = document.querySelector('#registration-section-old');
  }
});

var registrationButtons = document.querySelectorAll('.registration-button');

for (var i = 0; i < registrationButtons.length; i++) {
    registrationButtons[i].addEventListener('click', function() {
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollBy({top: registrationSection.getBoundingClientRect().top - headerHeight, behavior: 'smooth'});
        } else {
            window.scrollBy(0, registrationSection.getBoundingClientRect().top - headerHeight);
        }
        setTimeout(function() {
          if (typeof Calendly !== 'undefined') {
            document.querySelector('#registration-board').focus();
          } else {
            document.querySelector('#name').focus();
          }
        }, 500);
    })
}