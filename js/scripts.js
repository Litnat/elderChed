// cart-widget
(function() {
  var openCartButton = document.querySelector('.cart-widget__toggle-btn');
  var cartContent = document.querySelector('.cart-widget__content');
  var topButtonCart = document.querySelector('.cart__item');
  var closeCartButton = document.querySelector('.cart-widget__close-btn');

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

// catalog-widget
(function() {
  var btnFilterCards = document.querySelector('.products__filter-btn--cards');
  var btnFilterColumns = document.querySelector('.products__filter-btn--columns');


  /**
   * @param {Object} oppositeBtn Активный фильтр
   * @param {Object} btnFirst Предыдущая кнопка с фильтром
   * @param {Object} btnSecond Новая кнопка с фильтром
   * @param {String} grid
   * @param {String} filterFirst2
   * @param {String} filterSecond
   */
  function toggleCatalogFilter(oppositeBtn, btnFirst, btnSecond, grid, filterFirst, filterSecond) {
    var btnFilter = oppositeBtn;
    var oldFilter = btnFirst;
    var newFilter = btnSecond;
    var stateActiveFilter = btnFilter.classList.contains('products__filter-btn--' + grid + '-active');

    if (stateActiveFilter) {
      oldFilter.classList.remove('products__filter-btn--' + filterFirst + '-active');
      newFilter.classList.add('products__filter-btn--' + filterSecond + '-active');
    }
  }

  if ((btnFilterCards !== null) && (btnFilterColumns !== null)) {
    btnFilterColumns.addEventListener('click', function() {
      toggleCatalogFilter(btnFilterCards, btnFilterCards, btnFilterColumns,'cards', 'cards', 'columns');
    });

    btnFilterCards.addEventListener('click', function() {
      toggleCatalogFilter(btnFilterColumns, btnFilterColumns, btnFilterCards,'columns', 'columns', 'cards');
    });
  }
})();

// FAQ-acc
(function() {
  var question = document.querySelectorAll('.faq__item-title');

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
