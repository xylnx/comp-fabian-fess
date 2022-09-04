// Detect screen size and apply nav styles accordingly
let winWith = $(window).innerWidth();

// Small screens
if (winWith < 768) {
  $('.navbar-expand-md').addClass('navbar-colored');
} else {
// Larger screens
  $(window).on('scroll', function () {
    const pixels = 50;
    let pixelsScrolled = $(window).scrollTop();
    if (pixelsScrolled > pixels) {
      // Remove hero branding, add color to nav bar
      $('.branding-box__logo').addClass('transparent');
      $('.navbar-expand-md').addClass('navbar-colored');
      $('.navbar-expand-md').removeClass('navbar-trans');
      $('.brand-img').attr('src', 'img/hands_black.png');

      // Add hero branding, remove color from nav bar
    } else {
      $('.branding-box__logo').removeClass('transparent');
      $('.navbar-expand-md').removeClass('navbar-colored');
      $('.navbar-expand-md').addClass('navbar-trans');
      $('.brand-img').attr('src', 'img/hands_white.png');
    }
  });
}

// Add smooth scrolling to links with a class of .smooth
$('.smooth').on('click', function(e){
  e.preventDefault();
  var href = $(this).attr('href');

  $('html, body').animate({
    scrollTop:$(href).offset().top - 10
  },'slow');
});

// Close responsive menu when a link is clicked
$('a').click(function() {
  $('.navbar-collapse').collapse('hide');
});

// Collapse mobile nav with vanila js
// document.querySelector('.navbar').addEventListener('click', collapseNav);

// function collapseNav(e) {
//   console.log('Whee');
//   if (e.target.classList.contains('nav-link')) {
//     console.log('contains');
//     document.querySelector('.navbar-collapse').classList.toggle('show');
//   }
// }
