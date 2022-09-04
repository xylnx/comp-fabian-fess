<?php
header("Access-Control-Allow-Origin: *");
session_start();

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load composer's autoloader
require 'vendor/autoload.php';

// Load config file
require '.config/config.php';


  ///////////////
 // Variables //
///////////////

$errors = [];
$success = false;

if( isset($_POST['jsEnabled']) ) {
  $js = true;
}

// Check if required fields contain data
if( isset($_POST['name'], $_POST['email'], $_POST['message']) ) {
  $fields = [
    'name' => $_POST['name'],
    'email' => $_POST['email'],
    'message' => $_POST['message'],
  ];

  // Add an error to $errors for every missing field
  foreach ($fields as $field => $data) {
    if( empty($data) ) {
      $errors[] = "{$field} {$error_messages['required']}.";
    }
  }
}

try {
  // Send email if there is no errors
  if( empty($errors) ) {
    
    // Create new PHP Mailer instance
    $mail = new PHPMailer(true);

    // Enable verbose debug output
    // $mail->SMTPDebug = 2;


      /////////////////////
     // SERVER SETTINGS //
    /////////////////////

    // Set mailer to use SMTP
    $mail->isSMTP();
    
    // Specify SMTP server
    $mail->Host = $server['host'];
    // Enable SMTP authentication
    $mail->SMTPAuth = true;
    // Set username
    $mail->Username = $server['username'];
    // Set password
    $mail->Password = $server['password'];
    // Enable TLS encryption
    $mail->SMTPSecure = $server['encryption'];
    // Set TCP port to connect to
    $mail->Port = $server['port'];
    

      ///////////////////
     // COMPOSE EMAIL //
    ///////////////////

    // Set from field
    $mail->setFrom($fields['email'], 'Message via Contact Form from ' . $fields['name']);

    // Add a recipient
    $mail->addAddress($recipient['email'], $recipient['name']);
    
    // Set a reply email
    // For when user clicks on 'reply to' in the client
    // Does not work with all providers
    $mail->addReplyTo($fields['email'], $fields['name']);

    // Set email format to HTML
    $mail->isHTML(true);
    
    // Set email subject
    $mail->Subject = "Request from {$fields['email']} via contact form";
    
    // Compose body for html clients
    $mail->Body    = "<p>{$fields['name']} {$fields['email']} wrote:</p><p>{$fields['message']}</p>";

    // Compose alternative body for non-html clients
    $mail->AltBody = "{$fields['name']} {$fields['email']} wrote:</p><p>{$fields['message']}";


       /////////////////////
      // SEND EMAIL     ///
     // $mail->send(); ///
    /////////////////////

    // Check if email was sent
    if ($mail->send()) {
      
    // TESTING --> comment out if statement ($mail->send())
    // if (true) {

      // Test if script was requested through ajax
      if($js) {
        echo 'message sent successfully';
      } else {
        $success = true;
        
        // Relocate to index.php, contact page or thank you page
        // If thank you page remove alerts from contact page
        header('Location: ' . $relocate['location']);
      }
      
    } else {
      $errors[] = $error_messages['not_sent'];
    }
  } elseif (empty($errors)) {
    $errors[] = $error_messages['generic'];
  };

// Handle Errors
} catch (phpmailerException $e) {
  // echo $e->errorMessage(); // PHPMailer error messages
  $errors[] = $error_messages['generic'];

  // Allow access to $errors array in index.php
  $_SESSION['errors'] = $errors;
  $_SESSION['fields'] = $fields;
  $_SESSION['success'] = $success;

  header('Location: ' . $relocate['location']);

} catch (Exception $e) {
  // echo $e->getMessage(); // Error messages from anything else
  $errors[] = $error_messages['generic'];

  // Allow access to $errors array in index.php
  $_SESSION['errors'] = $errors;
  $_SESSION['fields'] = $fields;
  $_SESSION['success'] = $success;

  // Relocate to the page from where the post was submitted
  header('Location: ' . $relocate['location']);
};

// Allow access to $errors array in index.php
$_SESSION['errors'] = $errors;
$_SESSION['fields'] = $fields;
$_SESSION['success'] = $success;

// Relocate to index.php, contact page or thank you page
// If thank you page remove alerts from contact page
if(!$js) {
  echo 'whoop, whoop';
  header('Location: ' . $relocate['location']);
}

?>
