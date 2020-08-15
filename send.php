<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$email = $_POST['email'];
$form = $_POST['form']; 


if ($form == 'subscribe') {
  $title = "Новая подписка на сайте Best Tour Plan";
  $body = "
  <h2>Новая подписка</h2>
  <b>E-mail:</b><br>$email
  ";
  $request = 'subscribe';
} elseif ($form == 'sendmsg') {
  $title = "Новое обращение Best Tour Plan";
  $body = "
  <h2>Новое обращение</h2>
  <b>Имя:</b> $name<br>
  <b>Телефон:</b> $phone<br><br>
  <b>Сообщение:</b><br>$message
  ";
  $request = 'sendmsg';
} else {
  $title = "Новое бронирование Best Tour Plan";
  $body = "
  <h2>Новое бронирование</h2>
  <b>Имя:</b> $name<br>
  <b>Телефон:</b> $phone<br><br>
  <b>E-mail:</b> $email<br><br>
  <b>Сообщение:</b><br>$message
  ";
  $request = 'booking';
}
;


// Настройки PHPMailer
//$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    include('settings.php');

    // Получатель письма
    $mail->addAddress('shantonio@mail.ru');  

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;    

    // Проверяем отравленность сообщения
    if ($mail->send()) {$result = "success";} 
    else {$result = "error";}

    } catch (Exception $e) {
        $result = "error";
        $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
    }

    //echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
    // Отображение результата
    if ($request == 'subscribe') {
      header('Location: subscribe.html');
    };
    if ($request == 'sendmsg') {
      header('Location: sendmsg.html');
    };
    if ($request == 'booking') {
      header('Location: booking.html');
    };