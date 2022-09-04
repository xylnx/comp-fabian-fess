<?php
// This script sends a contact form using ajax and phpmailer
// If javascript is disabled it falls back to a pure php
// It requires jquery to perform the ajax call

// Start session
session_start();
require_once 'lib/security.php';

// Check if $_SESSION['errors'] is set
// Set $errors to $_SESSION['errors']
// Set $errors to an empty array, if $_SESSION['errors'] is not set
$errors = isset($_SESSION['errors']) ? $_SESSION['errors'] : [];

// Same for fields
$fields = isset($_SESSION['fields']) ? $_SESSION['fields'] : [];

// Check if $_SESSION['sucess'] is set
// Set $success to $_SESSION['success']
// Set $success to false if $_SESSION['success'] is not set
$success = isset($_SESSION['success']) ? $_SESSION['success'] : false;
?>

<!doctype html>
<html lang="en">
  <head>
    <title>Fabian Fess | Filmmaker</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Documentaries, corporate videos and image films for science and research. My clients are universities, research organizations, museums and private companies.">

    <!-- Favicons -->
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="icon" type="image/png" href="favicon.png" sizes="32x32">
    <link rel="icon" type="image/png" href="favicon96.png" sizes="96x96">
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="mstile-144x144.png">
    
    <!-- Styles -->
    <link rel="stylesheet" href="assets/css/bundle.css">
  </head>
  <body data-spy="scroll" data-target=".navbar" data-offset="50" id="page-top" style="margin:0;" onload="loader()" style="margin:0;">
    
  <div id="loader"></div>

  <!-- Disable loader for testing -->
  <!-- <body data-spy="scroll" data-target=".navbar" data-offset="50" id="page-top" style="margin:0;" style="margin:0;"> -->

  <!-- scroll-up button -->
  <div class="scroll-up-btn__container">
    <a class="scroll-up-btn__link smooth" href="#page-top">
      <svg class="scroll-up-btn__svg bi bi-chevron-up" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
      </svg>
    </a>
  </div>