const mainNav = document.querySelector('#js-menu');
const navBarToggle = document.querySelector('#js-navbar-toggle');

navBarToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active-nav');
});
