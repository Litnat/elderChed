// cart-widget
(function() {
  var openCartButton = document.querySelector('.cart-widget__toggle-btn');
  var cartContent = document.querySelector('.cart-widget__content');
  var topButtonCart = document.querySelector('.cart__item');
  var closeCartButton = document.querySelector('.cart-widget__close-btn');
  var continueShopping = document.querySelector('.cart-widget__continue-product');

  /**
   * Переключает состояние Корзины в зависимости от текущего состояния
   * @param {String} actionFirst состояние переключателя 'Корзины'
   * @param {String} actionSecond состояние 'Корзины'
   */
  function togglCartWidget(actionFirst, actionSecond) {
    openCartButton.classList.remove('cart-widget__toggle-btn--' + actionFirst);
    cartContent.classList.remove('cart-widget__content--' + actionFirst);

    openCartButton.classList.add('cart-widget__toggle-btn--' + actionSecond);
    cartContent.classList.add('cart-widget__content--' + actionSecond);
  }

  function handlerCartWidget() {
    var isActiveButton = openCartButton.classList.contains('cart-widget__toggle-btn--active');
    var isActiveCartContent = cartContent.classList.contains('cart-widget__content--active');

    if (isActiveButton && isActiveCartContent) {
      togglCartWidget('active', 'hide');
    } else {
      togglCartWidget('hide', 'active');
    }
  }

  openCartButton.addEventListener('click', handlerCartWidget);
  topButtonCart.addEventListener('click', handlerCartWidget);

  closeCartButton.addEventListener('click', function() {
    togglCartWidget('active', 'hide');
  });

  continueShopping.addEventListener('click', function() {
    togglCartWidget('active', 'hide');
  });
})();

// menu-widget
(function() {
  var menuButton = document.querySelector('.page-nav__toggle-button');
  var listNavigation = document.querySelector('.page-nav__list');

  function handlerStateNavigation() {
    var stateActiveButton = menuButton.classList.contains('page-nav__toggle-button--close');
    var stateActiveList = listNavigation.classList.contains('page-nav__list--open');

    if (stateActiveButton && stateActiveList) {
      menuButton.classList.remove('page-nav__toggle-button--close');
      menuButton.classList.add('page-nav__toggle-button--open');

      listNavigation.classList.remove('page-nav__list--open');
    } else {
      menuButton.classList.remove('page-nav__toggle-button--open');
      menuButton.classList.add('page-nav__toggle-button--close');

      listNavigation.classList.add('page-nav__list--open');
    }
  }

  menuButton.addEventListener('click', handlerStateNavigation);
})();

// FAQ-acc
(function() {
  var question = document.querySelectorAll('.faq__item-title');

  /**
   * Устанавливает переданные параметры в элемент
   * @param {String} mh Максимальная высота элемента
   * @param {Number} opac Прозрачность элемента
   * @param {Number} time Время анимации
   * @param {Object} element Текущий элемент
   */
  function setSizes(mh, opac, time, element) {
    setTimeout(function() {
      element.style.maxHeight = mh;
      element.style.opacity   = opac;
    }, time);
  }

  function slide(element) {
    if (element.style.maxHeight === '1000px') {
      setSizes('0', '1', 0, element);
    } else {
      setSizes('1000px', '1', 30, element);
    }
  }

  for (var i = 0; i < question.length; i++) {
    question[i].addEventListener('click', function(evt) {
      slide(evt.target.nextElementSibling);
    });
  }
})();

// catalog-filter animate-mobile
(function() {

  /**
   * Устанавливает переданные параметры в элемент
   * @param {String} mh Максимальная высота элемента
   * @param {Number} opac Прозрачность элемента
   * @param {Number} time Время анимации
   * @param {Object} element Текущий элемент
   */
  function setSizes(mh, opac, time, element) {
    setTimeout(function() {
      element.style.maxHeight = mh;
      element.style.opacity   = opac;
    }, time);
  }

  function slide(element) {
    if (element.style.maxHeight === '1000px') {
      setSizes('0', '1', 0, element);
    } else {
      setSizes('1000px', '1', 30, element);
    }
  }

  /**
   * @param {Object} mediaMobile текущий вьюпорт
   */
  function widthChange(mediaMobile) {
    if (mediaMobile.matches) {
      var catalogFilterTitle = document.querySelectorAll('.catalog__controlls-title');

      for (var i = 0; i < catalogFilterTitle.length; i++) {
        catalogFilterTitle[i].addEventListener('click', function(evt) {
          slide(evt.target.nextElementSibling);
        });
      }
    } else {
      return false;
    }
  }

  if (matchMedia) {
    var mediaMobile = window.matchMedia('(max-width: 736px)');

    mediaMobile.addListener(widthChange);
    widthChange(mediaMobile);
  }
})();

// timer
(function() {
  if ((location.pathname === '/index.html') || (location.pathname === '/')) {
    var currentTimerDays = document.querySelector('.sale__timer-num[data-timer="days"]');
    var currentTimerHours = document.querySelector('.sale__timer-num[data-timer="hours"]');
    var currentTimerMinutes = document.querySelector('.sale__timer-num[data-timer="minutes"]');
    var currentTimerSeconds = document.querySelector('.sale__timer-num[data-timer="seconds"]');

    var currentDate = new Date();
    var timer;
    var lastDate;

    var last = {
      years: 2019,
      months: 1,
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0
    }

    last.months = last.months - 1;
    lastDate = new Date(last.years, last.months, last.days, last.hours, last.minutes, last.seconds);

    var commonQuantitySeconds = parseInt((lastDate - currentDate) / 1000);

    function setTimer(quantitySeconds) {
      if (quantitySeconds > 0) {
        currentTimerDays.innerHTML = parseInt((quantitySeconds/3600)/24);
        currentTimerHours.innerHTML = parseInt((quantitySeconds/3600)%24);
        currentTimerMinutes.innerHTML = parseInt((quantitySeconds%3600)/60);
        currentTimerSeconds.innerHTML = parseInt((quantitySeconds%3600)%60);
      }
    }

    setTimer(commonQuantitySeconds);
    commonQuantitySeconds = commonQuantitySeconds - 1;

    setInterval(function() {
      setTimer(commonQuantitySeconds);
      commonQuantitySeconds = commonQuantitySeconds - 1;
    }, 1000);
  }
})();
