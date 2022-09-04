// Add smooth scrolling to links with a class of .smooth
// jquery implementation
$('.smooth').on('click', function(e){
  e.preventDefault();
  var href = $(this).attr('href');

  $('html, body').animate({
    scrollTop:$(href).offset().top - 10
  },'slow');
});
