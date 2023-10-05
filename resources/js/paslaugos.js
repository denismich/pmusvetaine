"use strict";

//Header height for scrolling/links to elements
var headerHeight = document.querySelector('header').clientHeight;

//Adjusting procedure container position when redirected from links
var procedureDescriptionContainers = document.querySelectorAll('.procedure-description-container');

window.addEventListener('DOMContentLoaded', function() {
    var targetId = window.location.hash.substring(1);
    if (targetId !== '') {
        var target = document.querySelector('#' + targetId);
        setTimeout(function() {window.scrollBy(0, target.getBoundingClientRect().top - headerHeight);}, 100);
        target.focus();
    }
});

for (var i = 0; i < procedureDescriptionContainers.length; i++) {
  (function (element) {
    element.addEventListener('focus', function() {
      setTimeout(function() {window.scrollBy(0, element.getBoundingClientRect().top - headerHeight);}, 100);
    }); 
  })(procedureDescriptionContainers[i]);
};

//Registration buttons
var registrationSection = document.querySelector('#registration-section-old');

var registrationButtons = document.querySelectorAll('.registration-button');

window.addEventListener('load', function() {
  if (typeof Calendly === 'undefined' || (firefoxVersion && firefoxVersion[1] >= 72 && firefoxVersion[1] <= 73)) {
    for (var i = 0; i < registrationButtons.length; i++) {
      registrationButtons[i].style.display = 'inline-block';
      registrationButtons[i].addEventListener('click', function() {
          window.scrollBy(0, registrationSection.getBoundingClientRect().top - headerHeight);
          setTimeout(function() {
            document.querySelector('#name').focus();
            window.scrollBy(0, registrationSection.getBoundingClientRect().top - headerHeight);
          }, 100);
      })
  }
  }
});