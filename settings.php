<?php 
  // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'informativpeople@gmail.com'; // Логин на почте
    $mail->Password   = 'wjoyqbevnoesvtlu'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('informativpeople@gmail.com', 'Антон Шахов'); // Адрес самой почты и имя отправителя
?>