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

// catalog-widget + filter
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

// data-products
(function() {
  //index
  var productLatestContainer = document.querySelector('.latest-products__content');
  var featuredProductContent = document.querySelector('.featured-products__content');
  var ratedProductList = document.querySelector('.rated-products__list');
  var otherProduceContainer = document.querySelector('.other-produce__container');
  var produceWrapper = document.querySelector('.produce-wrapper');

  var filtersLatestProducts = document.querySelectorAll('.latest-products__label');
  var filtersFeaturedProducts = document.querySelectorAll('.featured-products__label');

  //catalog
  var productCatalogContainer = document.querySelector('.products__content');

  var templateCardProduct = null;
  var templateRatingProduct = null;
  var templateTopRatingProduct = null;
  var templateProduceTemplate = null;

  var fragment = document.createDocumentFragment();

  var CURRENY_RU = ' Руб.';
  var PRODUCT_LINK = 'product.html?id=';

  var xhr = new XMLHttpRequest();

  /**
    * Добавляет звёздочки, количество берётся из массива карточки
    * @param {Object} item текущая карточка
    */
  function calculateStars(item) {
    var collectionStars = [];
    var starsHTML = null;
    for (var i = 0; i < item.stars; i++) {
      collectionStars.push('<span class="star__item"></span>');
    }

    starsHTML = collectionStars.join('');
    return starsHTML;
  }

  /**
    * Добавляет элементы в контейнер
    * @param {Object} items Массив элементов
    * @param {Object} container Контейнер, куда добавляем элементы
    * @param {Number} howMany сколько элементов добавляем
    */
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
      element.querySelector('.card-product__bar-link--detail').href = PRODUCT_LINK + item.id;
      element.querySelector('.card-product__bar-link--buy').textContent = 'В корзину';


      fragment.appendChild(element);
    }

    container.appendChild(fragment);
  }

  /**
    * Добавляет рейтинговые элементы в контейнер
    * @param {Object} items Массив элементов
    * @param {Object} container Контейнер, куда добавляем элементы
    * @param {Number} howMany сколько элементов добавляем
    */
  function addRatingProduct(items, container, howMany) {
    var item = null;
    var timeLists = [];
    templateRatingProduct = document.querySelector('#rating-product-template').content;

    for (var j = 0; j < items.length; j++) {
      var timeItems = items[j].date_added.split('/');
      var time = new Date(timeItems[2], timeItems[1], timeItems[0]) / 1000;

      timeLists.push(time);
    }

    for (var i = 0; i < items.length && i < howMany; i++) {
      var element = templateRatingProduct.cloneNode(true);
      item = items[i];

      element.querySelector('.rating-product').setAttribute('data-categories', item.type);
      element.querySelector('.rating-product').setAttribute('data-id', item.id);
      element.querySelector('.rating-product').setAttribute('data-stars', item.stars);
      element.querySelector('.rating-product').setAttribute('data-added', item.date_added);
      element.querySelector('.rating-product').setAttribute('data-seconds', timeLists[i]);
      element.querySelector('.rating-product').setAttribute('data-sale', item.sale);

      element.querySelector('.rating-product').href = PRODUCT_LINK + item.id;
      element.querySelector('.rating-product__img').src = item.photos[0];
      element.querySelector('.rating-product__name').textContent = item.title;
      element.querySelector('.rating-product__price').textContent = item.price + CURRENY_RU;

      fragment.appendChild(element);
    }

    container.appendChild(fragment);
  }

  /**
    * Добавляет топ элементы в контейнер
    * @param {Object} items Массив элементов
    * @param {Object} container Контейнер, куда добавляем элементы
    * @param {Number} howMany сколько элементов добавляем
    */
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

  /**
    * Добавляет product карточку с внесёнными данными из хеша
    * @param {Object} items Массив элементов
    * @param {Object} container Контейнер, куда добавляем элемент
    */
  function addDetailProduct(items, container) {
    var checMoreThanZero = location.search.split('?id=')[1] >= 0;
    var checkSearchItem = location.search.split('=')[0] === '?id';
    var checkLengthSearchItem = (location.search.length > 0) && (location.search.split('?id=')[1] < items.length);

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
           element.querySelectorAll('.produce__quarter-img')[i].style.display = 'block';
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

      document.querySelector('.current-page__title').textContent = currentDataItem.title;
      document.querySelector('.current-page__breadcrumbs-item--active').textContent = currentDataItem.title;

      fragment.appendChild(element);
      container.appendChild(fragment);
    } else {
      window.location.href = '404.html';
    }
  }

  /**
    * Шаблон сортировки LatestProduct
    * @param {Object} listCards Конейнер с карточками
    * @param {String} currentFilter Текущий выбранный фильтр
    */
  function sortLatestProduct(listCards, currentFilter) {
    for (var j = 0; j < listCards.children.length; j++) {
      listCards.children[j].style.display = 'flex';
      if (listCards.children[j].dataset.categories !== currentFilter) {
        listCards.children[j].style.display = 'none';
      }
    }
  }

  /**
    * Шаблон сортировки LatestProduct
    * @param {String} filters Список фильтров
    * @param {Object} listCards Контейнер с карточками
    */
  function toggleLatestProduct(filters, listCards) {
    var filter = null;

    for (var i = 0; i < filters.length; i++) {
      filters[i].addEventListener('click', function(evt) {
        var filter = evt.target.htmlFor.split('latest-products-')[1];

        switch (filter) {
          case 'all':
            for (var j = 0; j < listCards.children.length; j++) {
              listCards.children[j].style.display = 'flex';
            }
            break;
          case 'pizza':
            sortLatestProduct(listCards, 'pizza');
            break;
          case 'burgers':
            sortLatestProduct(listCards, 'burgers');
            break;
          case 'icecream':
            sortLatestProduct(listCards, 'icecream');
            break;
          case 'drink':
            sortLatestProduct(listCards, 'drink');
            break;
          case 'snack':
            sortLatestProduct(listCards, 'snack');
            break;
        }
      });
    }
  }

  /**
    * Показываем популярные карточки
    * @param {String} dataSet
    * @param {Object} listCards Контейнер с карточками
    */
  function showFeaturedProducts(dataSet, listCards) {
    var lists = [];

    for (var j = 0; j < listCards.children.length; j++) {
      lists.push(listCards.children[j]);
    }

    lists.sort(function(a, b) {
      return Number(b.dataset[dataSet]) - Number(a.dataset[dataSet]);
    });

    listCards.innerHTML = '';

    for (var k = 0; k < lists.length; k++) {
      fragment.appendChild(lists[k]);
    }

    listCards.appendChild(fragment);
  }

  /**
    * Переключаем показ карточек по фильтрам
    * @param {Object} data объект с карточками
    * @param {Object} filters Список фильтров
    * @param {Object} listCards Контейнер с карточками
    */
  function toggleFeaturedProduct(data, filters, listCards) {
    var filter = null;

    showFeaturedProducts('stars', listCards);
    for (var i = 0; i < filters.length; i++) {
      filters[i].addEventListener('click', function(evt) {
        var filter = evt.target.htmlFor.split('featured-products-')[1];

        switch (filter) {
          case 'popular':
            showFeaturedProducts('stars', listCards);
            break;
          case 'new':
            showFeaturedProducts('seconds', listCards);
            break;
          case 'sale':
            showFeaturedProducts('sale', listCards);
            break;
        }
      });
    }
  }



  xhr.addEventListener('load', function() {
    var data = JSON.parse(xhr.response);

    switch (location.pathname) {
      case '/index.html':
        addCardElements(data, productLatestContainer, 10);
        addRatingProduct(data, featuredProductContent, 12);
        toggleLatestProduct(filtersLatestProducts, productLatestContainer);
        toggleFeaturedProduct(data, filtersFeaturedProducts, featuredProductContent);
        break;
      case '/':
        addCardElements(data, productLatestContainer, 10);
        addRatingProduct(data, featuredProductContent, 12);
        toggleLatestProduct(filtersLatestProducts, productLatestContainer);
        break;
      case '/catalog.html':
        addCardElements(data, productCatalogContainer, 12);
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
      years: 2017,
      months: 12,
      days: 31,
      hours: 20,
      minutes: 00,
      seconds: 00
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