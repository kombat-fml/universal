document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const body = document.querySelector('body');
  let clientWidth = document.documentElement.clientWidth;
  const menuButton = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.menu-wrapper');

  window.addEventListener('resize', function () {
    clientWidth = document.documentElement.clientWidth;
  });

  //открытие и закрытие мобильного меню
  menuButton.addEventListener('click', () => {
    if (clientWidth < 768) {
      mobileMenu.classList.toggle('menu-wrapper--visible');
      requestAnimationFrame(animateMenu);
      // Убираем скрол при открытом мобильном меню
      body.classList.toggle('no-scroll');

      menuButton.classList.toggle('burger--active');
    }
  });

  let count = -130;
  mobileMenu.style.top = count + '%';
  const animateMenu = () => {
    mobileMenu.style.top = count + '%';
    count += 3;

    if (count < 0) {
      requestAnimationFrame(animateMenu);
    } else {
      count = -130;
    }
  };
});
