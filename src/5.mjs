// Данный код не трогать
// ----------------------------------------
const URLS = {
    navigation: 'navigation',
    user: 'user',
    cart: 'cart',
    checkAvailableCart: 'checkAvailableCart',
    favoriteGoods: 'favoriteGoods',
}

// Функция используется как имитатор запросов
function request(url, cb) {
    setTimeout(() => {
        switch (url) {
            case URLS.navigation:
                cb(['Главная', 'Товары', 'О нас', 'Реклама']);
                break;
            case URLS.user:
                cb({
                    id: '0',
                    firstName: 'Иван',
                    lastName: 'Петров',
                });
                break;
            case URLS.cart:
                cb([
                    {id: '0', name: 'Пылесос'},
                    {id: '1', name: 'Фен'},
                    {id: '2', name: 'Телевизор'},
                    {id: '3', name: 'Радио'},
                ]);
                break;
            case URLS.checkAvailableCart:
                cb(['0', '2']);
                break;
            case URLS.favoriteGoods:
                cb([
                    {id: '4', name: 'Подушки'},
                    {id: '5', name: 'Корм для кота'},
                    {id: '6', name: 'Настольные игры'},
                ]);
                break;
            default:
                cb(new Error('4044'))
        }
    }, 100)
}

// ----------------------------------------

function getPageInformation() {
  const pageInfo = {};

  requestPromise(URLS.navigation)
    .then(navigation => {
      if (navigation) {
        pageInfo.navigation = navigation;
      }
      return requestPromise(URLS.user);
    })
    .then(user => {
      if (user) {
        pageInfo.user = user;

        return requestPromise(URLS.cart);
      }
    })
    .then(cart => {
      if (cart) {
        pageInfo.user.cart = cart;

        return requestPromise(URLS.checkAvailableCart);
      }
    })
    .then(available => {
      if (available) {
        pageInfo.user.cart = pageInfo.user.cart.filter(({ id }) => available.includes(id));
      }
      return requestPromise(URLS.favoriteGoods);
    })
    .then(favoriteGoods => {
      if (favoriteGoods) {
        pageInfo.user.favoriteGoods = favoriteGoods;
      }
    })
    .catch(error => {
      console.error("Error fetching page information:", error);
      return pageInfo;
    });

    return pageInfo;
}

function requestPromise(url) {
  return new Promise((resolve, reject) => {
    request(url, (data) => {
      if (data) {
        resolve(data);
      } else {
        reject(new Error(`Request failed for URL: ${url}`));
      }
    });
  });
}

// должно вывести актуальную информацию страницы
console.log(getPageInformation())
