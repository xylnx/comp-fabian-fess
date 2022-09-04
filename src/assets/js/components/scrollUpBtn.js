const btn = document.querySelector('.scroll-up-btn__container');
const scrollPos = 200;
let pxScrolled;

// Hide btn
btn.style.visibility = 'hidden';

// Unhide and hide btn on scroll position
window.addEventListener('scroll', () => {
  pxScrolled = window.scrollY;  
  (pxScrolled < scrollPos) ? btnHide() : btnVisible();
});

// Hide btn when modal is opened
document.querySelector('.testimonial').addEventListener('click', () => {
  btnHide();
})

// Unhide btn when modal is closed
document.addEventListener('click', e => {
  if(e.target && e.target.id === 'modal-btn'){
    btnVisible();
  }
  if(e.target && e.target.id === 'myModal'){
    btnVisible();
  }
  if(e.target && e.target.id === 'modal-close'){
    btnVisible();
  }
});

// Make Btn visible on certain scroll position
function btnVisible() {
  btn.style.visibility = 'visible';
}

// Remove visibility on certain scroll position
function btnHide() {
  btn.style.visibility = 'hidden';
}
