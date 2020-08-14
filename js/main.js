document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const body = document.querySelector('body');
  let clientWidth = document.documentElement.clientWidth;
  const menuButton = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.menu-wrapper');
  const desctopMenu = document.querySelector('.menu-desktop');

  window.addEventListener('resize', function () {
    clientWidth = document.documentElement.clientWidth;
  });

  let count = -100;
  const animateMenu = () => {
    mobileMenu.style.top = count + '%';
    count += 3;

    if (count < 0) {
      requestAnimationFrame(animateMenu);
    } else {
      count = -100;
    }
  };

  //открытие и закрытие мобильного меню
  menuButton.addEventListener('click', () => {
    if (clientWidth < 768) {
      mobileMenu.classList.toggle('menu-wrapper--visible');
      if (mobileMenu.classList.contains('menu-wrapper--visible')) {
        count = -100;
        mobileMenu.style.top = count + '%';
        requestAnimationFrame(animateMenu);
      }
      // Убираем скрол при открытом мобильном меню
      body.classList.toggle('no-scroll');

      menuButton.classList.toggle('burger--active');

      // Убираем скрол при открытом мобильном меню
      body.classList.toggle('no-scroll');
    } else {
      desctopMenu.classList.toggle('menu-desktop--active');

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

  var descSlider = new Swiper('.desc-slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    autoplay: {
      delay: 3000,
    },

    // If we need pagination
    pagination: {
      el: '.desc-slider__pagination',
      type: 'bullets',
      clickable: 'true',
      bulletClass: 'desc-slider__bullet',
      bulletActiveClass: 'desc-slider__bullet--active',
    },
  });

  var articleSlider = new Swiper('.article-swiper__container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.article-swiper__button--next',
      prevEl: '.article-swiper__button--prev',
    },
  });

  const like = document.querySelector('.like');
  const likeCount = document.querySelector('.like__count');
  like.addEventListener('click', (event) => {
    event.preventDefault();
    if (like.classList.contains('like--active')) {
      likeCount.textContent = Number(likeCount.textContent) - 1;
    } else {
      likeCount.textContent = Number(likeCount.textContent) + 1;
    }
    like.classList.toggle('like--active');
  });
});
