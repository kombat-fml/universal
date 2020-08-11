document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const body = document.querySelector('body');
  let clientWidth = document.documentElement.clientWidth;
  const menuButton = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.menu-wrapper');

  window.addEventListener('resize', function () {
    clientWidth = document.documentElement.clientWidth;
  });

  let count = -130;
  const animateMenu = () => {
    mobileMenu.style.top = count + '%';
    count += 3;

    if (count < 0) {
      requestAnimationFrame(animateMenu);
    } else {
      count = -130;
    }
  };

  //открытие и закрытие мобильного меню
  menuButton.addEventListener('click', () => {
    if (clientWidth < 768) {
      mobileMenu.classList.toggle('menu-wrapper--visible');
      count = -130;
      mobileMenu.style.top = count + '%';
      requestAnimationFrame(animateMenu);
      // Убираем скрол при открытом мобильном меню
      body.classList.toggle('no-scroll');

      menuButton.classList.toggle('burger--active');
    } else {
      mobileMenu.classList.toggle('menu-wrapper--desktop');
      count = -50;
      mobileMenu.style.top = count + '%';
      requestAnimationFrame(animateMenu);
      menuButton.classList.toggle('burger--active');
    }
  });

  //табы
  const tabs = document.getElementsByClassName('tabs__card');
  const content = document.getElementsByClassName('window__wrapper');

  [...tabs].forEach((tab) => tab.addEventListener('click', tabClick));

  function tabClick(event) {
    if (clientWidth > 767) {
      if (!event.target.closest('.tabs__icon')) {
        event.preventDefault();
        const tabId = event.target.closest('.tabs__card').dataset.id;

        [...tabs].forEach((tab, i) => {
          tab.classList.remove('tabs__card--active');
          content[i].classList.remove('window__wrapper--active');
        });

        tabs[tabId - 1].classList.add('tabs__card--active');
        content[tabId - 1].classList.add('window__wrapper--active');
      }
    } else {
      if (!event.target.closest('.tabs__icon')) {
        window.location.href = 'firstpost.html';
      }
    }
  }
});
