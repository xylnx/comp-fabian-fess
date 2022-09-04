// Add parallax effect for iOS devices

// Since ios 13 this does not detect ipads anymore :(
// var iOS = /iPhone|iPod|iPad/.test(navigator.userAgent) && !window.MSStream;

// Detect ios devices
let isIOS = (/iPad|iPhone|iPod/.test(navigator.platform) ||
(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
!window.MSStream

if(isIOS) {
  // console.log("It's iOS!");

  let parallaxClasses = document.querySelectorAll('.parallax');
  for (i = 0; i < parallaxClasses.length; i++) {
    parallaxClasses[i].className += ' parallax--ios';
  }

  // Parallax Effect with javascript
  const parallaxAbout = document.getElementById('parallax-1');
  const parallaxWork = document.getElementById('parallax-2');
  const parallaxTestimonials = document.getElementById('parallax-3');
  const parallaxContact = document.getElementById('contact');

  function parallaxEffect(parallaxName, osMod) {
    window.addEventListener("scroll", function() {
      let offset = window.pageYOffset;
      // console.log('window.pageYOffset:' + offset);
      parallaxName.style.backgroundPositionY = (offset - osMod) * .15 + 'px';
    });
  }

  parallaxEffect(parallaxAbout, 2000);
  parallaxEffect(parallaxWork, 3000);
  parallaxEffect(parallaxTestimonials, 4500);
  parallaxEffect(parallaxContact, 3800);
}
