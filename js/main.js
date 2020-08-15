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

  //табы на главной странице
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

  //слайдер на главной странице
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

  // Swal.fire({
  //   title: 'Message send!',
  //   text: 'Do you want to continue',
  //   icon: 'success',
  //   confirmButtonText: 'OK',
  // });

  //плавная прокрутка до блока
  $('a.smoothlink').click(function () {
    $('html, body').animate(
      {
        scrollTop: $($(this).attr('href')).offset().top - 100 + 'px',
      },
      {
        duration: 500,
        easing: 'swing',
      }
    );
    return false;
  });

  // Обработка форм
  $('.form').each(function () {
    $(this).validate({
      errorClass: 'invalid',
      rules: {
        email: {
          required: true,
          email: true,
        },
        message: {
          required: true,
          minlength: 100,
        },
      },
      messages: {
        email: {
          required: 'We need your email address to contact you',
          email: 'Your email address must be in the format of name@domain.com',
        },
        message: {
          required: 'Please, enter your message',
          minlength: 'Your message must be 100 digits',
        },
      },
    });
  });
});
