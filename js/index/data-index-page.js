(function() {
  //index
  var productLatestContainer = document.querySelector('.latest-products__content');
  var featuredProductContent = document.querySelector('.featured-products__content');
  var ratedProductList = document.querySelector('.rated-products__list');
  var otherProduceContainer = document.querySelector('.other-produce__container');
  var produceWrapper = document.querySelector('.produce-wrapper');

  var filtersLatestProducts = document.querySelectorAll('.latest-products__label');
  var filtersFeaturedProducts = document.querySelectorAll('.featured-products__label');

  var fragment = document.createDocumentFragment();

  var CURRENY_RU = ' Руб.';
  var PRODUCT_LINK = 'product.html?id=';

  var xhr = new XMLHttpRequest();

  function setDefaultHash(currentHash, hash) {
    var collectionFilterItems = currentHash.split('?');
    var categoryFilter = collectionFilterItems[1];
    var ratingFilter = collectionFilterItems[2];
    var pageHash = collectionFilterItems[1];
    var categories;

    if (!pageHash && !categoryFilter && !ratingFilter) {
      location.href = hash;
    }

    collectionFilterItems = location.hash.split('?');
    categories = collectionFilterItems[1].split('=');
  }

  function createCardElement(items, i) {
    var element = templateCardProduct.cloneNode(true);

    items.sort(function(a, b) {
      return a.id - b.id;
    });

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

    return element;
  }

  /**
    * Добавляет элементы в контейнер
    * @param {Object} items Массив элементов
    * @param {Object} container Контейнер, куда добавляем элементы
    * @param {Number} howMany сколько элементов добавляем
    */
  function addCardElements(items) {
    var item = null;
    templateCardProduct = document.querySelector('#card-product-template').content;

    productLatestContainer.innerHTML = '';

    items.sort(function(a, b) {
      return a.id - b.id;
    });

    for (var i = 0; i < items.length && i < 10; i++) {

      element = createCardElement(items, i);

      fragment.appendChild(element);
    }

    productLatestContainer.appendChild(fragment);
  }

  function getFilters(data, currentHash, filters) {
    var categories = currentHash.split('?')[1].split('=')[1];

    switch (categories) {
      case 'all':
        addCardElements(data);
        break;
    }
  }

  function toggleProductFilter(data, filtersButtons) {
    for (var i = 0; i < filtersButtons.length; i++) {
      filtersButtons[i].addEventListener('click', function() {
        var hash = location.hash.split('?');
        location.href = hash[0] + '?catagories=' + this.dataset.categoriesItem + '?' + hash[2];
      });
    }
  }

  function showIndexPage(data) {
    setDefaultHash(location.hash, '#main?categories=all?rating=popular');
    getFilters(data, location.hash, filtersLatestProducts);
    toggleProductFilter(data, filtersLatestProducts);
  }

  xhr.addEventListener('load', function() {
    var data = JSON.parse(xhr.response);

    showIndexPage(data);
  });

  xhr.open('GET', 'js/data.json');
  xhr.send();
})();
