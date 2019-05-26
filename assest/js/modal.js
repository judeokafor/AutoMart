const modal = document.querySelector('#modal');
const modalOverlay = document.querySelector('#modal-overlay');
const closeButton = document.querySelector('#close-button');
const openButton = document.querySelector('#open-button');
// extra modal stuffs
const modal2 = document.querySelector('#modal2');
const modalOverlay2 = document.querySelector('#modal-overlay2');
const closeButton2 = document.querySelector('#close-button2');
const openButton2 = document.querySelector('#open-button2');
const modal3 = document.querySelector('#modal3');
const modalOverlay3 = document.querySelector('#modal-overlay3');
const closeButton3 = document.querySelector('#close-button3');
const openButton3 = document.querySelector('#open-button3');

closeButton.addEventListener('click', () => {
  modal.classList.toggle('closed');
  modalOverlay.classList.toggle('closed');
});

openButton.addEventListener('click', () => {
  modal.classList.toggle('closed');
  modalOverlay.classList.toggle('closed');
});
closeButton2.addEventListener('click', () => {
  modal2.classList.toggle('closed');
  modalOverlay2.classList.toggle('closed');
});

openButton2.addEventListener('click', () => {
  modal2.classList.toggle('closed');
  modalOverlay2.classList.toggle('closed');
});
closeButton3.addEventListener('click', () => {
  modal3.classList.toggle('closed');
  modalOverlay3.classList.toggle('closed');
});

openButton3.addEventListener('click', () => {
  modal3.classList.toggle('closed');
  modalOverlay3.classList.toggle('closed');
});
