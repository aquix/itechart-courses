/* global ko */

class MainViewModel {
    constructor() {
        this.phones = [];
        this.cart = ko.observableArray([]);
        this._totalPrice = ko.observable(0);
        this.totalPrice = ko.pureComputed(() => {
            return this._totalPrice().toFixed(2);
        });

        this.totalCount = ko.pureComputed(() => {
            let totalCount = 0;
            for(let item of this.cart()) {
                totalCount += item.countInCart();
            }

            return totalCount;
        });

        this.isCartEmpty = ko.pureComputed(() => {
            return this.cart().length === 0;
        });

        this.addToCart = phone => {
            if (this.cart.indexOf(phone) === -1) {
                this.cart.push(phone);
            }

            phone.countInCart(phone.countInCart() + phone.selectedCount());
            this._totalPrice(parseFloat(this._totalPrice()) +
                phone.phoneInfo.price * phone.selectedCount());

            phone.selectedCount(1);

            showNotification(phone.phoneInfo.name + ' added to cart');
        };

        this.removeFromCart = phone => {
            let removeIndex = this.cart.indexOf(phone);
            if (removeIndex === -1) {
                return;
            }

            if (this.cart()[removeIndex].countInCart() === 1) {
                this.cart.remove(phone);
            }

            phone.countInCart(phone.countInCart() - 1);
            this._totalPrice(parseFloat(this._totalPrice()) - phone.phoneInfo.price);

            showNotification(phone.phoneInfo.name + ' removed from cart', 'danger');
        };

        this.removeAllFromCart = phone => {
            let count = phone.countInCart();
            this.cart.remove(phone);
            phone.countInCart(0);
            this._totalPrice(parseFloat(this._totalPrice()) - phone.phoneInfo.price * count);

            showNotification(`All items of ${phone.phoneInfo.name} removed from cart`, 'danger');
        };

        this.clearCart = () => {
            for(let phone of this.cart()) {
                phone.countInCart(0);
            }

            this.cart.removeAll();
            this._totalPrice(0);
        };

        this.buy = () => {
            this.clearCart();
            showNotification(`You've successfully bought this phones.`);
        };
    }
}

class PhoneViewModel {
    constructor(phoneInfo) {
        this.phoneInfo = phoneInfo;
        this.countInCart = ko.observable(0);
        this.selectedCount = ko.observable(1);
        this.isInCart = ko.computed(() => this.countInCart() > 0);

        this.fullCostPerItem = ko.computed(() => {
            let count = this.countInCart();
            let price = this.phoneInfo.price;

            if (count > 1) {
                return `${count} x ${price} = ${count * price}`;
            } else {
                return (count * price).toString();
            }
        });
    }
}

let mainViewModel = new MainViewModel();

fetch('/data/phones-info.json')
    .then(res => {
        return res.json();
    })
    .then(data => {
        initCatalog(data);
    });

function initCatalog(data) {
    let phones = [];

    for(let item of data) {
        phones.push(new PhoneViewModel(item));
    }

    mainViewModel.phones = phones;
    mainViewModel.cart = ko.observableArray([]);
    ko.applyBindings(mainViewModel);
}
