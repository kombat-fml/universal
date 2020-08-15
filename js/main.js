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

  // слайдер на странице с постом
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

  // добавление лайка на странице с постом
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

  //подгрузка 3х комментариев на странице с постом
  const comments = document.getElementsByClassName('comment--hidden');
  const more = document.querySelector('.comments-body__more');

  more.addEventListener('click', (event) => {
    event.preventDefault();
    [...comments].forEach((comment) =>
      comment.classList.remove('comment--hidden')
    );
  });

  //добавление лайков/дизлайков на странице с постом
  const commentFooterLike = document.querySelectorAll('.comment-footer__like');
  // const commentFooterCounter = document.querySelectorAll(
  //   '.comment-footer__counter'
  // );
  const commentFooterDislike = document.querySelectorAll(
    '.comment-footer__dislike'
  );

  [...commentFooterLike].forEach((like) =>
    like.addEventListener('click', addLike)
  );
  [...commentFooterDislike].forEach((dislike) =>
    dislike.addEventListener('click', addDislike)
  );

  // функция проверки кол-ва лайков и отрисовка числа соответствующего цвета
  function colorCounter(element) {
    if (Number(element.textContent) > 0) {
      element.classList.add('comment-footer__counter--green');
    }
    if (Number(element.textContent) < 0) {
      element.classList.add('comment-footer__counter--red');
    }
    if (Number(element.textContent) == 0) {
      element.classList.remove('comment-footer__counter--red');
      element.classList.remove('comment-footer__counter--green');
    }
  }

  //функция для конкатенации + числу
  function concat(element) {
    if (Number(element.textContent) > 0) {
      element.textContent = '+' + Number(element.textContent);
    }
    if (Number(element.textContent) < 0) {
      element.textContent = Number(element.textContent);
    }
  }

  // нажатие на лайк
  function addLike(event) {
    event.preventDefault();
    const target = event.target;

    const selectorLikes = target
      .closest('.comment-footer__like')
      .parentNode.querySelector('.comment-footer__counter');

    const selectorThumbUp = target
      .closest('.comment-footer__like')
      .parentNode.querySelector('.thumb-up');

    const selectorThumbDown = target
      .closest('.comment-footer__like')
      .parentNode.querySelector('.thumb-down');

    if (selectorThumbUp.classList.contains('thumb--active')) {
      selectorThumbUp.classList.remove('thumb--active');
      selectorLikes.textContent = Number(selectorLikes.textContent) - 1;
      concat(selectorLikes);
      colorCounter(selectorLikes);
    } else {
      if (selectorThumbDown.classList.contains('thumb--active')) {
        selectorThumbDown.classList.remove('thumb--active');
        selectorLikes.textContent = Number(selectorLikes.textContent) + 1;
        concat(selectorLikes);
        colorCounter(selectorLikes);
      }
      selectorThumbUp.classList.add('thumb--active');
      selectorLikes.textContent = Number(selectorLikes.textContent) + 1;
      concat(selectorLikes);
      colorCounter(selectorLikes);
    }
  }

  // нажатие на дизлайк
  function addDislike(event) {
    event.preventDefault();
    const target = event.target;

    const selectorLikes = target
      .closest('.comment-footer__dislike')
      .parentNode.querySelector('.comment-footer__counter');

    const selectorThumbUp = target
      .closest('.comment-footer__dislike')
      .parentNode.querySelector('.thumb-up');

    const selectorThumbDown = target
      .closest('.comment-footer__dislike')
      .parentNode.querySelector('.thumb-down');

    if (selectorThumbDown.classList.contains('thumb--active')) {
      selectorThumbDown.classList.remove('thumb--active');
      selectorLikes.textContent = Number(selectorLikes.textContent) + 1;
      concat(selectorLikes);
      colorCounter(selectorLikes);
    } else {
      if (selectorThumbUp.classList.contains('thumb--active')) {
        selectorThumbUp.classList.remove('thumb--active');
        selectorLikes.textContent = Number(selectorLikes.textContent) - 1;
        concat(selectorLikes);
        colorCounter(selectorLikes);
      }
      selectorThumbDown.classList.add('thumb--active');
      selectorLikes.textContent = Number(selectorLikes.textContent) - 1;
      concat(selectorLikes);
      colorCounter(selectorLikes);
    }
  }
  // Swal.fire({
  //   title: 'Message send!',
  //   text: 'Do you want to continue',
  //   icon: 'success',
  //   confirmButtonText: 'OK',
  // });
});
