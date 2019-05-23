const modal = document.querySelector('#modal');
const modalOverlay = document.querySelector('#modal-overlay');
const closeButton = document.querySelector('#close-button');
const openButton = document.querySelector('#open-button');

closeButton.addEventListener('click', () => {
  modal.classList.toggle('closed');
  modalOverlay.classList.toggle('closed');
});

openButton.addEventListener('click', () => {
  modal.classList.toggle('closed');
  modalOverlay.classList.toggle('closed');
});
