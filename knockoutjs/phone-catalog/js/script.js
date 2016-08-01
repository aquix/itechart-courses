fetch('/data/phones-info.json')
    .then(res => {
        return res.json();
    })
    .then(data => {
        initCatalog(data);
    });

let shoppingCart = {
    count: 0,
    phones: ko.observableArray(),
    totalPrice: 0
};

let phone = {
    name: ko.observable(),
    infoLink: ko.observable(),
    imgLink: ko.observable(),
    description: ko.observable(),
    price: ko.observable()
};

let viewModel = {
    phones: ko.observableArray(),
    shoppingCart: shoppingCart
};


function initCatalog(data) {
    viewModel.phones = ko.observableArray(data);
    ko.applyBindings(viewModel);
}