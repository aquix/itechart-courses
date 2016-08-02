/* global ko */

class ViewModel {
    constructor() {
        this.phones = ko.observableArray();
        this.cart = ko.observableArray([]);
        this.totalPrice = ko.observable(0);

        this.addToCart = phone => {
            this.cart.push(phone);
            phone.isInCart(true);

            showNotification(phone.phoneInfo.name + ' added to cart');
        };

        this.removeFromCart = phone => {
            let removeIndex = this.cart.indexOf(phone);
            if (removeIndex === -1) {
                return;
            }

            this.cart.splice(removeIndex, 1);
            if (this.cart.indexOf(phone) === -1) {
                phone.isInCart(false);
            }

            showNotification(phone.phoneInfo.name + ' removed from cart', 'danger');
        };

        this.isInCart = phone => {
            return this.cart().indexOf(phone) !== -1;
        };
    }
}

class PhoneViewModel {
    constructor(phoneInfo) {
        this.isInCart = ko.observable(false);
        this.phoneInfo = phoneInfo;
    }
}

let viewModel = new ViewModel();

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

    viewModel.phones = ko.observableArray(phones);
    viewModel.cart = ko.observableArray([]);
    ko.applyBindings(viewModel);
}