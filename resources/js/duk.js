"use strict";

var faqToggles = document.querySelectorAll('.question-container');
var answers = document.querySelectorAll('.answer');

for (var i = 0; i < faqToggles.length; i++) {
  (function(index) {
    faqToggles[index].addEventListener('click', function() {
      answers[index].classList.toggle('open');
      answers[index].toggleAttribute(ariaHidden);
    });
    faqToggles[index].addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
        answers[index].classList.toggle('open');
        answers[index].toggleAttribute(ariaHidden);
      }
    });
  })(i);
}