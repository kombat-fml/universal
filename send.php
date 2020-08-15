<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$message = $_POST['message'];
$email = $_POST['email'];
$form = $_POST['form']; 


if ($form == 'subscribe') {
  $title = "Новая подписка на сайте Universal";
  $body = "
  <h2>Новая подписка</h2>
  <b>E-mail:</b><br>$email
  ";
  $request = 'subscribe';
} elseif ($form == 'sendmsg') {
  $title = "Новое сообщение на сайте Universal";
  $body = "
  <h2>Новое сообщение</h2>
  <b>Сообщение:</b><br>$message
  ";
  $request = 'sendmsg';
}
;


// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
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

    //header('Location: index.html');