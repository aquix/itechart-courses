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

class ViewModel {
    constructor() {
        this.phones = ko.observableArray();
        this.cart = ko.observableArray([]);
        this.totalPrice = 0;
    }

    addToCart(phone) {
        this.cart.push(phone);
    }
}

let viewModel = new ViewModel();