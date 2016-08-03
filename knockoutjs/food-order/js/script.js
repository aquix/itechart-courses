/* global ko */

function MainViewModel() {
    var self = this;

    self.dishes = [];
    self.cart = ko.observableArray([]);
    self._totalPrice = ko.observable(0);
    self.totalPrice = ko.pureComputed(function () {
        return self._totalPrice().toFixed(2);
    });

    self.totalCount = ko.pureComputed(function () {
        var totalCount = 0;

        self.cart().forEach(function(item) {
            totalCount += item.countInCart();
        }, self);

        return totalCount;
    });

    self.isCartEmpty = ko.pureComputed(function () {
        return self.cart().length === 0;
    });

    self.addToCart = function (dish) {
        if (self.cart.indexOf(dish) === -1) {
            self.cart.push(dish);
        }

        dish.countInCart(dish.countInCart() + dish.selectedCount());
        self._totalPrice(parseFloat(self._totalPrice()) +
            dish.dishInfo.price * dish.selectedCount());

        dish.selectedCount(1);

        showNotification(dish.dishInfo.name + ' добавлен в корзину');
    };

    self.removeFromCart = function (dish) {
        var removeIndex = self.cart.indexOf(dish);
        if (removeIndex === -1) {
            return;
        }

        if (self.cart()[removeIndex].countInCart() === 1) {
            self.cart.remove(dish);
        }

        dish.countInCart(dish.countInCart() - 1);
        self._totalPrice(parseFloat(self._totalPrice()) - dish.dishInfo.price);

        showNotification(dish.dishInfo.name + ' удалён из корзины', 'danger');
    };

    self.removeAllFromCart = function (dish) {
        var count = dish.countInCart();
        self.cart.remove(dish);
        dish.countInCart(0);
        self._totalPrice(parseFloat(self._totalPrice()) - dish.dishInfo.price * count);

        showNotification(dish.dishInfo.name + 'полностью удалён из корзины', 'danger');
    };

    self.clearCart = function () {
        self.cart().forEach(function(item) {
            item.countInCart(0);
        }, self);

        self.cart.removeAll();
        self._totalPrice(0);
    };

    self.buy = () => {
        self.clearCart();
        showNotification('Спасибо за заказ. Скоро мы доставим вашу еду!');
    };
}

function DishViewModel(dishInfo) {
    var self = this;

    self.dishInfo = dishInfo;
    self.countInCart = ko.observable(0);
    self.selectedCount = ko.observable(1);
    self.isInCart = ko.computed(() => self.countInCart() > 0);

    self.fullCostPerItem = ko.computed(() => {
        let count = self.countInCart();
        let price = self.dishInfo.price;

        if (count > 1) {
            return count + ' x ' + price + ' = ' + (count * price);
        }

        return (count * price).toString();
    });
}

var mainViewModel = new MainViewModel();

fetch('/data/food-data.json')
    .then(res => {
        return res.json();
    })
    .then(data => {
        initCatalog(data);
    });

function initCatalog(data) {
    let dishes = [];

    data.forEach(function(item) {
        dishes.push(new DishViewModel(item));
    });

    mainViewModel.dishes = dishes;
    mainViewModel.cart = ko.observableArray([]);
    ko.applyBindings(mainViewModel);
}
