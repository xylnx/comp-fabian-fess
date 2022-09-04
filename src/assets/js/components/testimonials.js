var testimonials = require('../data/dataTestimonials');

var model = (function() {
  var slides = {
    total: testimonials.length,
    currentSlide: 0,
  };

  // Use when dot is clicked to determine slide to display
  function getID(eventTarget) {
      var ID = eventTarget.getAttribute('id');
      return parseInt(ID, 10);  
  };

  return {
    getSlides: function() {
      return slides;
    },

    updateCurrentSlide: function(clicked, eventTarget) {
      if (clicked === 'right') {
        if (slides.currentSlide < slides.total - 1) {
          slides.currentSlide += 1;
        } else {
          slides.currentSlide = 0
        }
      } else if (clicked === 'left') {
        if (slides.currentSlide > 0) {
          slides.currentSlide -= 1;
        } else {
          slides.currentSlide = slides.total - 1;
        }
      } else if (clicked === 'dot') {
        slides.currentSlide = getID(eventTarget)
      } else {
        slides.currentSlide = 0;
      }
    }

  }

})();


var view = (function(model) {

  var DOMStrings = {
    dotsDiv: document.querySelector('.dots'),
    arrowRight: document.querySelector('.arrow--right'),
    arrowLeft: document.querySelector('.arrow--left'),
    testimonialDiv: document.querySelector('.testimonial'),
    testimonialsContainer: document.querySelector('.testimonials-container'),
  }

  return {
    getDOMStrings: function() {
      return DOMStrings;
    },

    // Add testimonial markup to testimonials div
    loadTestimonial: function(slide) {
      testimonial = document.querySelector('.testimonial');
      var markup = this.createMarkup(slide);
      testimonial.innerHTML = markup;
      // listenForQuoteToggle()
    },

    // Change active state of the dots to current slide
    changeActiveState: function(slide) {
      var dots = DOMStrings.dotsDiv.querySelectorAll('.dot');
      var current = document.getElementsByClassName('dot--active');
      current[0].className = current[0].className.replace(' dot--active', '');
      dots[slide].className += ' dot--active';
    },

    // Create and add dots (representing available slides) at page load
    createIndicators: function() {
      var html = '<div class="dot dot--active" id="0"></div>'
      for(i = 1; i < testimonials.length; i++) {
        html += `<div class="dot" id="${i}"></div>`
      };
      DOMStrings.dotsDiv.innerHTML = html;
    },

    // Create testimonial markup
    createMarkup: function(i) {
      var markup = `
        <div class="testimonial__container fade fading" data-toggle="modal" data-target="#myModal">
          <img class="testimonial__image" src=${testimonials[i].imgURL} alt="">
          <div class="testimonial__text">
            <div class="testimonial__quote">${testimonials[i].quoteShort}</div>
            <div class="testimonial__read-more fade fading">Read more</div>
            <div class="testimonial__id">
            <div class="testimonial__name">${testimonials[i].name}</div>
            <div class="testimonial__title">${testimonials[i].title}</div>
            <div class="testimonial__title-short">${testimonials[i].titleShort}</div>
          </div>
        </div>
        </div>
     
        <!-- The Modal -->
        <div class="modal" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">

              <!-- Modal Header -->
              <div class="modal-header">
                <h4 class="modal-title lead">${testimonials[i].quoteLong}</h4>
                <button type="button" id="modal-close" class="close" data-dismiss="modal">&times;</button>
              </div>

              <!-- Modal body -->
              
              <div class="modal-body">
                <div class="row">
                  <div class="col-6">
                    <img style="width:50%" class="testimonial__image rounded-circle" src=${testimonials[i].imgURL} alt="">
                  </div>
                  <div class="col-6 text-left pt-2">
                    <div class="font-weight-bold">${testimonials[i].name}</div>
                    <div class="font-weight-light">${testimonials[i].title}</div>
                  </div>
                </div>
              </div>

              <!-- Modal footer -->
              <div class="modal-footer">
                <button id="modal-btn" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>

            </div>
          </div>
        </div>
      `
      return markup;
    }
  }
 
})(model);


var controller = (function(view, model) {

  var slides = model.getSlides();
  var DOMStrings = view.getDOMStrings();
  
  function listenForEvents() {
    // Listen for click on a dot
    DOMStrings.dotsDiv
    .addEventListener('click', function(e){buildTestimonial('dot', e.target)});
    // Listen for click on right arrow
    DOMStrings.arrowRight
    .addEventListener('click', function(){buildTestimonial('right')});
    // Listen for click on left arrow --> load previous testimonial
    DOMStrings.arrowLeft
    .addEventListener('click', function(){buildTestimonial('left')});
  };
  
  function buildTestimonial(clicked, eventTarget) {
    // Check if click did not just got to dots div without hiting a dot
    if (eventTarget && eventTarget.classList.contains('dots')) {
      return;
    } else {
        model.updateCurrentSlide(clicked, eventTarget);
        var slides = model.getSlides();
        view.loadTestimonial(slides.currentSlide);
        view.changeActiveState(slides.currentSlide);
    }
  };

  return {
    // Set up slider on page load
    init: function() { 
      // Load first Testimonial
      view.loadTestimonial(slides.currentSlide);
      // Create dots representing the slides
      view.createIndicators();
      // Listen for clicks on chevrons and dots
      listenForEvents()
    }
  };

})(view, model);

controller.init();
