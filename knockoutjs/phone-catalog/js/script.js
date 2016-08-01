/* global ko */

class ViewModel {
    constructor() {
        this.phones = ko.observableArray();
        this.cart = ko.observableArray([]);
        this.totalPrice = 0;

        this.addToCart = phone => {
            this.cart.push(phone);
        };

        this.removeFromCart = phone => {
            let removeIndex = this.cart.indexOf(phone);
            if (removeIndex === -1) {
                return;
            }

            this.cart.splice(removeIndex, 1);
        };

        this.isInCart = phone => {
            return this.cart().indexOf(phone) !== -1;
        };
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
    viewModel.phones = ko.observableArray(data);
    viewModel.cart = ko.observableArray([]);
    ko.applyBindings(viewModel);
}
