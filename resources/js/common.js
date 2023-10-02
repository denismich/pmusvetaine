"use strict";

// Event keycode variable
var keyCode = "code";
if (KeyboardEvent.code === undefined) {
  keyCode = "keyCode";
}

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

//Fonts observer
const openSansObserver = new FontFaceObserver('Open Sans');
const playfairDisplayObserver = new FontFaceObserver('Playfair Display');
const ralewayObserver = new FontFaceObserver('Raleway');

Promise.all([
  openSansObserver.load(),
  playfairDisplayObserver.load(),
  ralewayObserver.load()
]).then(function(){
  document.documentElement.className += ' fonts-loaded';
});

//Passive detector for event listeners
var supportsPassive = false;
var passiveArgument = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener('testPassive', null, opts);
  window.removeEventListener('testPassive', null, opts);
} catch (e) {};

if (supportsPassive === true) {
  passiveArgument = { passive: true };
};

//Header navigation bar icon
var headerNavIcon = document.querySelector('#header-nav-icon');
var headerNavMenu = document.querySelector('#header-nav-menu');

headerNavIcon.addEventListener('click', function() {
  headerNavMenu.classList.toggle('visible');
  headerNavIcon.classList.toggle('open');
});
var navLinks = document.querySelectorAll('.nav-link');

headerNavIcon.addEventListener('keydown', function(event) {
  if (event[keyCode] === 13 || event[keyCode] === 32) {
    event.preventDefault();
    headerNavIcon.click();
  }
  if (headerNavIcon.classList.contains('open')) {
    if (event[keyCode] === 9) {
      event.preventDefault();
    }
    if (event[keyCode] === 27) {
      headerNavIcon.classList.remove('open');
      headerNavMenu.classList.remove('visible');
    }
    if (event[keyCode] === 38) {
      event.preventDefault();
      navLinks[navLinks.length-1].focus();
    }
    if (event[keyCode] === 40) {
      event.preventDefault();
      navLinks[0].focus();
    }
    for(var i = 0; i < navLinks.length; i++) {
      (function(index) {
        navLinks[index].addEventListener('keydown', function(event) {
          if (event[keyCode] === 9 || event[keyCode] === 32) {
            event.preventDefault();
          }
          if (event[keyCode] === 27) {
            headerNavIcon.classList.remove('open');
            headerNavMenu.classList.remove('visible');
            headerNavIcon.focus();
          }
          if(event[keyCode] === 38) {
            event.preventDefault();
            if (index !== 0) {
              navLinks[index-1].focus();
            } else {
              navLinks[navLinks.length-1].focus();
            }
          }
          if (event[keyCode] === 40) {
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

//Registration section appearance/main registration button
var registrationSectionOld = document.querySelector('#registration-section-old');
var mainRegistrationButton = document.querySelector('#main-registration-button');
var initCalendlyPopupWidget = function() {
  Calendly.initPopupWidget({url: 'https://calendly.com/indre-ivanovaite'});
  return false;
};

if (mainRegistrationButton !== null) {
  mainRegistrationButton.addEventListener('click', initCalendlyPopupWidget);
}

window.addEventListener('load', function() {
  if (typeof Calendly === 'undefined' && mainRegistrationButton !== null) {
    mainRegistrationButton.style.display = 'none';
    registrationSectionOld.style.display = 'block';
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

if (select !== null) {
  select.addEventListener('mousedown', function(event) {event.preventDefault()});
select.addEventListener('keydown', function(event) {
  if (event[keyCode] === 13 || event[keyCode] === 32) {
    event.preventDefault();
    toggleDropdown();
  }
  if (event[keyCode] === 27) {
    dropdown.classList.remove('opened');
  }
  if (event[keyCode] === 38) {
    event.preventDefault();
    dropdownOptions[dropdownOptions.length-1].focus();
  }
  if (event[keyCode] === 40) {
    event.preventDefault();
    dropdownOptions[0].focus();
  }
});

select.addEventListener('click', toggleDropdown);
}

document.body.addEventListener('click', closeDropdownFromOutside);

for(var i = 0; i < dropdownOptions.length; i++) {
  dropdownOptions[i].addEventListener('click', selectOption);
  (function(index) {
    dropdownOptions[index].addEventListener('keydown', function(event) {
      if (event[keyCode] === 9 || event[keyCode] === 32) {
        event.preventDefault();
      }
      if (event[keyCode] === 13 || event[keyCode] === 27) {
        selectOption(event);
        closeDropdownFromOutside(event);
        select.focus();
      }
      if(event[keyCode] === 38) {
        event.preventDefault();
        if (index !== 0) {
          dropdownOptions[index-1].focus();
        } else {
          dropdownOptions[dropdownOptions.length-1].focus();
        }
      }
      if (event[keyCode] === 40) {
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
      SecureToken: '90677d85-8654-4537-91d0-eacde4cbff0d',
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

if (form !== null) {
  form.onsubmit = function() {sendEmail(); return false;};
}

document.body.addEventListener('click', closeModalFromOutside);

window.addEventListener('keydown', function(event) {
  if (successModal.style.display === 'block' || errorModal.style.display === 'block' || 
  oldBrowsersErrorModal.style.display === 'block' || validationErrorModal.style.display === 'block') {
    if (event[keyCode] === 32 || event[keyCode] === 38 || event[keyCode] === 40) {
      event.preventDefault();
    }
    if (event[keyCode] === 27) {
      closeModal();
    }
    if (event[keyCode] === 9) {
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
  window.scrollTo(0, 0)
  setTimeout(function() {
    if (headerNavIcon.style.display !== 'none') {
      headerNavIcon.focus();
    } else {
      document.querySelector('#first-link').focus();
    }
  }, 100);
});

// Cookies dialog
var cookiesDialog = document.querySelector('#cookies-dialog');

function find(arr, f) {
  for (var i = 0; i < arr.length; i++) {
    if (f(arr[i]) === true) {
      return arr[i];
    }
  }
}

function setCookie(cookie_name, value) {
    document.cookie = cookie_name + "=" + encodeURIComponent(value) + "; max-age=" + 24*60*60 + "; path=/; Secure";
};

function getCookie(cookie_name) {
  var cookie = find(document.cookie
  .split("; "), function(row) { return row.startsWith(cookie_name+"=") });

  if (cookie === undefined) {
    return "";
  }

  return cookie.split("=")[1];
};


window.addEventListener('DOMContentLoaded', function() {
  if(cookiesDialog !== null && getCookie('show_cookie_message') !== 'no') {
    cookiesDialog.classList.add('displayed');
    cookiesDialog.focus();
  }
});

var cookiesConfirmButton = document.querySelector('#cookies-dialog-confirm-button');

if (cookiesDialog !== null) {
  cookiesConfirmButton.addEventListener('click', function() {
    cookiesDialog.classList.remove('displayed');
    setCookie('show_cookie_message','no');
  });
}