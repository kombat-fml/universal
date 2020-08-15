<?php

$recepient = "informativpeople@gmail.ru";
$siteName = "Ajax-форма";

$email = trim($_POST["email"]);
$message = "E-mail: $email";

$pagetitle = "Заявка с сайта \"$siteName\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>