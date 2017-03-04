<?php
@extract($_POST);
$name = stripslashes($name);
$email = stripslashes($email);
$subject = stripslashes($subject);
$text = stripslashes($text);
mail('website@bartold.com',$subject,$text,"From: $name <$email>");
header("location:thanks.html");
?>
