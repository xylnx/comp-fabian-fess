<?php
// prevent html tags to be inserted through the form
// escape html tags with following e function

function e($string) {
  return htmlentities($string, ENT_QUOTES, 'UTF-8', false);
}

?>
