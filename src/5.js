// Данные код не трогать
// ----------------------------------------
const URLS = {
    navigation: 'navigation',
    user: 'user',
    cart: 'cart',
    checkAvailableCart: 'checkAvailableCart',
    favoriteGoods: 'favoriteGoods',
}


// функция используется как имитатор запросов
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

    request(URLS.navigation, function (navigation) {
        if (navigation) {
            pageInfo.navigation = navigation;
        }
    })

    request(URLS.user, function (user) {
        if (user) {
            pageInfo.user = user;

            request(URLS.cart, function (cart) {
                if (cart) {
                    pageInfo.user.cart = cart;

                    request(URLS.checkAvailableCart, function (available) {
                        if (available) {
                            pageInfo.user.cart = pageInfo.user.cart.filter(({id}) => available.includes(id))
                        }
                    })
                }
            })

            request(URLS.favoriteGoods, function (favoriteGoods) {
                if (favoriteGoods) {
                    pageInfo.user.favoriteGoods = favoriteGoods;
                }
            })
        }
    })

    return pageInfo;
}

// должно вывести актуальную информацию страницы
console.log(getPageInformation())
