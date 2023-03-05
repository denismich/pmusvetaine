//Header navigation bar icon
const headerNavIcon = document.querySelector('#header-nav-icon');
headerNavIcon.addEventListener('click', () => {
  document.querySelector('#header-nav-menu').classList.toggle('visible');
  headerNavIcon.classList.toggle('open');
});

//Banner registration button
document.querySelector('#banner-registration-button').addEventListener('click', () => window.scrollTo({
  top: document.querySelector('#registration-section').offsetTop,
  behavior: 'smooth'
}));

//Gallery images enlarging
const imageContainer = document.querySelector('#gallery-photos-container');
const fullScreenContainer = document.querySelector('#full-screen-container');
const fullScreenImage = document.querySelector('#full-screen-image');

let currentImageIndex = 0;

imageContainer.addEventListener('click', (event) => {
  if (event.target.tagName === 'IMG') {
      currentImageIndex = Array.from(imageContainer.children).indexOf(event.target);
      fullScreenImage.src = event.target.src;
      fullScreenContainer.style.display = 'block';
  }
});

fullScreenContainer.addEventListener('click', (event) => {
  if (event.target === fullScreenContainer) {
      fullScreenContainer.style.display = 'none';
  }
});

document.querySelector('#prev-button').addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + imageContainer.children.length - 1) % imageContainer.children.length;
  fullScreenImage.src = imageContainer.children[currentImageIndex].src;
});

document.querySelector('#next-button').addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % imageContainer.children.length;
  fullScreenImage.src = imageContainer.children[currentImageIndex].src;
});

//Testimonials slides
const dots = document.getElementsByClassName('dot');

let slideIndex = 1;
let myTimer;

const showSlides = n => {
  clearInterval(myTimer);
  myTimer = setInterval(() => showSlides(slideIndex += 1), 4000);

  const slides = document.getElementsByClassName('slide');
  
  n > slides.length && (slideIndex = 1);
  n < 1 && (slideIndex = slides.length);

  for (const slide of slides) {
      slide.style.display = 'none';
  }
  for (const dot of dots) {
      dot.classList.remove('active');
  }
  slides[slideIndex-1].style.display = 'block';
  dots[slideIndex-1].className += ' active';
}

const pause = () => clearInterval(myTimer);
const resume = () => myTimer = setInterval(() => showSlides(slideIndex += 1), 4000);

window.addEventListener('load', () => {
  showSlides(slideIndex);

  const slideshowContainer = document.querySelector('#slideshow-container');

  slideshowContainer.addEventListener('mouseenter', pause)
  slideshowContainer.addEventListener('mouseleave', resume)
});

for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener('click', () => showSlides(slideIndex = i + 1));
}

//Registration form select dropdown
const select = document.querySelector('#procedure');
const dropdown = document.querySelector('#custom-dropdown');
const dropdownOptions = document.querySelectorAll('#custom-dropdown .option');

const toggleDropdown = () => {
  dropdown.classList.toggle('opened');

  if (dropdown.classList.contains('opened')) {
    dropdown.style.top = '0';
    
    const selectRect = select.getBoundingClientRect();
    const dropdownRect = dropdown.getBoundingClientRect();
    const spaceBelow = document.documentElement.clientHeight - selectRect.bottom;
    const spaceAbove = selectRect.top;
    const distanceDownward = selectRect.bottom - dropdownRect.top;
    const distanceUpward = selectRect.top - dropdownRect.bottom;
    
    dropdown.style.top = ((spaceBelow >= dropdownRect.height || spaceAbove < dropdownRect.height) ? distanceDownward : distanceUpward) + 'px';
  }
}
const closeDropdownFromOutside = event => event.target !== select && dropdown.classList.remove('opened');

const selectOption = event => select.value = event.currentTarget.textContent;

select.addEventListener('mousedown', event => event.preventDefault());

select.addEventListener('click', toggleDropdown);

document.body.addEventListener('click', closeDropdownFromOutside);

dropdownOptions.forEach(option => option.addEventListener('click', selectOption));

//Email sending on registration
const form = document.querySelector('#registration-form');

const successModal = document.querySelector('#success-modal');
const errorModal = document.querySelector('#error-modal');

const modalCloseButtons = document.querySelectorAll('.modal-close-button');

const sendEmail = () => {
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const phone = document.querySelector('#phone').value;
  const visitDate = document.querySelector('#date').value;
  const procedure = document.querySelector('#procedure').value;
  const message = document.querySelector('#message').value;
  const notification = `Registracijos procedūrai užklausa: <br><br>Vardas:  ${name} <br>El. paštas:  ${email} <br>Telefonas:  ${phone} <br>Data:  ${visitDate} <br>
    Procedūra:  ${procedure} <br>Žinutė:  ${message}`;

  Email.send({
      SecureToken: '90677d85-8654-4537-91d0-eacde4cbff0d',
      To : 'dmichailovskij@gmail.com',
      From : 'dmichailovskij@gmail.com',
      Subject : 'Registracijos Procedūrai Užklausa',
      Body : notification
  }).then(message => {
    if (message === 'OK') {
      successModal.style.display = 'block';
    } else {
      throw new Error('Email was not sent');
    }
  })
  .catch(error => {
    errorModal.style.display = 'block';
  });
}

const closeModal = () => {
  successModal.style.display = 'none';
  errorModal.style.display = 'none';
}

const closeModalFromOutside = event => {
  if (event.target === successModal || event.target === errorModal) {
    closeModal();
  }
}

modalCloseButtons.forEach(button => button.addEventListener('click', closeModal));

document.body.addEventListener('click', closeModalFromOutside);

//Button for scrolling to top
const scrollToTopButton = document.querySelector('#scroll-to-top-button');

window.addEventListener("scroll", () => window.scrollY > 1000 ? scrollToTopButton.classList.add("show") : scrollToTopButton.classList.remove("show"));

scrollToTopButton.addEventListener('click', () => window.scrollTo({
  top: 0,
  behavior: 'smooth'
}));