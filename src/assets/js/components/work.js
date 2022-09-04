var workSamples = require('../data/dataWork');

let markup = ''
for (var i = 0; i < workSamples.length; i++) {
markup += "\
  <div class='work-card'>\
    <div class='content-box'>\
      <div class='content'>\
        <div class='content__vid'>\
          <div class='iframe-container'>\
            <iframe src=" + workSamples[i].url +  " width='640' height='480' frameborder='0'webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\
          </div>\
        </div>\
        <div class='content__text'>\
          <p class='category-heading'>" + workSamples[i].type + " | " + workSamples[i].client + "</p>\
          <h4>" + workSamples[i].title + "</h4>\
          <p class='vid-description'>" + workSamples[i].description + "</p>\
        </div>\
      </div>\
    </div>\
  </div>\
";
}
document.querySelector('#cards').innerHTML = markup;


// Scroll work examples when button is clicked
const workCards = document.getElementsByClassName('work-card');
const buttonLeft = document.getElementById('scroll-left');
const buttonRight = document.getElementById('scroll-right');
const container = document.querySelector('.card-container')

buttonLeft.onclick = function() {
  container.scrollBy({
    top: 0,
    left: -workCards[0].scrollWidth * 2,
    behavior: 'smooth'
  });
};

buttonRight.onclick = function() {
  container.scrollBy({
    top: 0,
    left: workCards[0].scrollWidth * 2,
    behavior: 'smooth'
  });
};