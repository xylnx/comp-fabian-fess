// Initilize jsEnabled
// Use in contact.php to prevent no-js fallback behavior
var jsEnabled = true;

// Initilize Global DOMStrings Object to access DOM
var DOMStrings = {
  'submitBtn': document.getElementById('submit'),
  'form': document.getElementById('contact-form'),
  'formName': document.getElementById('name'),
  'formEmail': document.getElementById('email'),
  'formMessage': document.getElementById('message'),
  'formInfo': document.getElementById('form__info')
}

// Use helper to capitalize strings
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Remove form action and method
// No need: js will handle form submit not PHP!
function removeFormAction() {
  DOMStrings.form.removeAttribute('action');
  DOMStrings.form.removeAttribute('method');
}
removeFormAction();

// Get form values
function getFormValues(e) {
  var formValues = {
    'name': DOMStrings.formName.value,
    'email': DOMStrings.formEmail.value,
    'message': DOMStrings.formMessage.value,
    'missingData': [],
  }
  // Check if all required data was submitted
  for (key in formValues) {
    if(formValues[key] === '') {
      formValues.missingData.push(key);
    }    
  }
  e.preventDefault();
  return formValues;
}

// Submit form
function submitForm(formValues, jsEnabled = true) {
  this.name = formValues.name;
  this.email = formValues.email;
  this.message = formValues.message;
  this.jsEnabled = jsEnabled;

  if(name && email && message) {
    console.log(this.name, this.email, this.message);

    console.log('posting ...');

    $.ajax({
      type: "POST",
      url: "contact.php",
      data: "name=" + name + "&email=" + email + "&message=" + message +"&jsEnabled=" + jsEnabled,
      success: function(messageFromContactPHP){
        if (messageFromContactPHP == 'message sent successfully'){
            formSuccess(formValues);
            // console.log(text);
        } else {
          formError(formValues);
          console.log('Something went wrong: ' + messageFromContactPHP);
        }
      } 
    });
  } else {
    formError(formValues);
    console.log('Form could not be sent');
  }
}

// Generate info messages
// Status is either 1 or 0 (true or false)
// 1 when formSuccess is called
// 0 when formError is called
function getInfoMessages(status, formValues){
  var markup;
  if (status) {
    markup = '\
      <div class="alert alert-success">\
        <p><strong>Thank you for your message. It has been sent successfully.</strong></p>\
        <p><strong>Name:</strong> ' + formValues.name + '</p>\
        <p><strong>Email:</strong> ' + formValues.email + '</p>\
        <p><strong>Message:</strong> ' + formValues.message + '</p>\
      </div>'
  } else {
      var list = 'Something went wrong.';
      formValues.missingData.forEach(function(key) {
        list += '<p>' + capitalize(key) + ' is required.</p>';
      })
      markup = '\
        <div class="alert alert-danger">'
          + list +
        '</div>';
  }
  return markup;
}

function formSuccess(formValues) {
  var markup;
  var form = DOMStrings.form;
  var formInfo = DOMStrings.formInfo;
  markup = getInfoMessages(1, formValues);
  
  form.innerHTML = '';
  formInfo.innerHTML = markup;
}

function formError(formValues){
  var markup;
  var formInfo = DOMStrings.formInfo;
  markup = getInfoMessages(0, formValues);
    
  formInfo.innerHTML = markup;
}

function formController(e) {
  // Disable submit btn after submit
  DOMStrings.submitBtn.disabled = true;
  DOMStrings.submitBtn.style.cursor = 'not-allowed';
  var formValues = getFormValues(e);
  submitForm(formValues, jsEnabled);
}

// Listen for form submit
DOMStrings.form.addEventListener('submit', formController);
