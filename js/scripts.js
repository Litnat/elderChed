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

// data-products
(function() {
  //index
  var productLatestContainer = document.querySelector('.latest-products__content');
  var featuredProductContent = document.querySelector('.featured-products__content');
  var ratedProductList = document.querySelector('.rated-products__list');
  var otherProduceContainer = document.querySelector('.other-produce__container');
  var produceWrapper = document.querySelector('.produce-wrapper');

  //catalog
  var productCatalogContainer = document.querySelector('.products__content');

  var templateCardProduct = null;
  var templateRatingProduct = null;
  var templateTopRatingProduct = null;
  var templateProduceTemplate = null;

  var fragment = document.createDocumentFragment();

  var CURRENY_RU = ' Руб.';

  var xhr = new XMLHttpRequest();

  function calculateStars(item) {
    var collectionStars = [];
    var starsHTML = null;
    for (var i = 0; i < item.stars; i++) {
      collectionStars.push('<span class="star__item"></span>');
    }

    starsHTML = collectionStars.join('');
    return starsHTML;
  }

  function addCardElements(items, container, howMany) {
    var item = null;
    templateCardProduct = document.querySelector('#card-product-template').content;

    for (var i = 0; i < items.length && i < howMany; i++) {
      var element = templateCardProduct.cloneNode(true);
      item = items[i];

      element.querySelector('.card-product').setAttribute('data-categories', item.type);
      element.querySelector('.card-product').setAttribute('data-id', item.id);
      element.querySelector('.card-product').style.background = 'url(' + item.photos[0] + ') center no-repeat';
      element.querySelector('.card-product').style.backgroundSize = 'cover';

      element.querySelector('.card-product__name').textContent = item.title;

      if (item.oldPrice > 0) {
        element.querySelector('.card-product__price').innerHTML = '<span class="card-product__sale">'+ item.oldPrice + CURRENY_RU + '</span>' + item.price + CURRENY_RU;
      } else {
        element.querySelector('.card-product__price').innerHTML = item.price + CURRENY_RU;
      }

      element.querySelector('.card-product__bar-link--detail').textContent = 'Показать товар';
      element.querySelector('.card-product__bar-link--buy').textContent = 'В корзину';


      fragment.appendChild(element);
    }

    container.appendChild(fragment);
  }

  function addRatingProduct(items, container, howMany) {
    var item = null;
    templateRatingProduct = document.querySelector('#rating-product-template').content;

    for (var i = 0; i < items.length && i < howMany; i++) {
      var element = templateRatingProduct.cloneNode(true);
      item = items[i];

      element.querySelector('.rating-product').setAttribute('data-categories', item.type);
      element.querySelector('.rating-product').setAttribute('data-id', item.id);

      element.querySelector('.rating-product__img').src = item.photos[0];
      element.querySelector('.rating-product__name').textContent = item.title;
      element.querySelector('.rating-product__price').textContent = item.price + CURRENY_RU;

      fragment.appendChild(element);
    }

    container.appendChild(fragment);
  }

  function addTopRatingProduct(items, container, howMany) {
    var item = null;
    templateTopRatingProduct = document.querySelector('#top-rated-product-template').content;

    for (var i = 0; i < items.length && i < howMany; i++) {
      var element = templateTopRatingProduct.cloneNode(true);
      item = items[i];

      element.querySelector('.top-rated-product').setAttribute('data-categories', item.type);
      element.querySelector('.top-rated-product').setAttribute('data-id', item.id);
      element.querySelector('.top-rated-product__img').src = item.photos[0];
      element.querySelector('.top-rated-product__info-title').textContent = item.title;
      element.querySelector('.top-rated-product__info-price').textContent = item.price + CURRENY_RU;
      element.querySelector('.top-rated-product__info-star').innerHTML = calculateStars(item);

      fragment.appendChild(element);
    }

    container.appendChild(fragment);
  }

  function addDetailProduct(items, container) {
    var checMoreThanZero = location.search.split('?id=')[1] >= 0;
    var checkSearchItem = location.search.split('=')[0] === '?id';
    var checkLengthSearchItem = location.search.length > 0;

    if (checkLengthSearchItem && checkSearchItem && checMoreThanZero) {
      var currentSearchItem = location.search.split('?id=')[1];
      var item = null;
      templateProduceTemplate = document.querySelector('#produce-template').content;
      var element = templateProduceTemplate.cloneNode(true);
      var currentDataItem = items[currentSearchItem];

      element.querySelector('.produce').setAttribute('data-id', currentSearchItem);
      element.querySelector('.produce-full-box-img').src = currentDataItem.photos[0];

      for (var i = 0; i < 4; i++) {
        if (currentDataItem.photos[i]) {
          element.querySelectorAll('.produce__quarter-img')[i].style.backgroundImage = 'url(' + currentDataItem.photos[i] + ')';
        } else {
          element.querySelectorAll('.produce__input')[i].setAttribute('disabled', 'disabled');
        }
      }

      for (var j = 0; j < 4; j++) {
        element.querySelectorAll('.produce__quarter-img')[j].addEventListener('click', function(evt) {
          var url = evt.target.style.backgroundImage.split('"')[1];

          if (url) {
            evt.target.parentElement.previousElementSibling.children["0"].src = url;
          }
        });
      }

      element.querySelector('.produce__info-title').textContent = currentDataItem.title;
      element.querySelector('.produce__info-rating').innerHTML = calculateStars(currentDataItem);
      element.querySelector('.produce__info-price').textContent = currentDataItem.price + CURRENY_RU;
      element.querySelector('.desc-produce__text').textContent = currentDataItem.description;
      element.querySelector('.produce__button').textContent = 'Добавить в корзину';
      element.querySelector('.produce__info-socials-title').textContent = 'Репостнуть запись:';
      element.querySelector('.produce__info-socials-item--vk').textContent = 'VK';

      element.querySelector('.produce__tabs-label--desc').textContent = 'Описание';
      element.querySelector('.produce__tabs-label--info').textContent = 'Информация';
      element.querySelector('.produce__tabs-label--reviews').textContent = 'Отзывы';

      element.querySelector('.produce__tabs-item-text-desc').textContent = currentDataItem.description;
      element.querySelector('.produce__tabs-item-info--title-brand').textContent = 'Повары';
      element.querySelector('.produce__tabs-item-info--brand').textContent = currentDataItem.creator;
      element.querySelector('.produce__tabs-item-info--title-weight').textContent = 'Вес';
      element.querySelector('.produce__tabs-item-info--weight').textContent = currentDataItem.weight;
      element.querySelector('.produce__tabs-item-info--title-calories').textContent = 'Килокалории';
      element.querySelector('.produce__tabs-item-info--calories').textContent = currentDataItem.calories;
      element.querySelector('.produce__tabs-item-reviews').textContent = currentDataItem.reviews;

      fragment.appendChild(element);
      container.appendChild(fragment);
    } else {
      window.location.href = '404.html';
    }
  }

  xhr.addEventListener('load', function() {
    var data = JSON.parse(xhr.response);

    switch (location.pathname) {
      case '/index.html':
        addCardElements(data, productLatestContainer, 10);
        addRatingProduct(data, featuredProductContent, 12);
        break;
      case '/catalog.html':
        addCardElements(data, productCatalogContainer, 15);
        addTopRatingProduct(data, ratedProductList, 3);
        break;
      case '/product.html':
        addDetailProduct(data, produceWrapper);
        addCardElements(data, otherProduceContainer, 3);
        break;
    }
  });

  xhr.open('GET', 'js/data.json');
  xhr.send();
})();
