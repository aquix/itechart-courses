/* global ko */

class ViewModel {
    constructor() {
        this.phones = ko.observableArray();
        this.cart = ko.observableArray([]);
        this.totalPrice = ko.observable(0);

        this.isCartEmpty = ko.computed(() => this.cart().length === 0);

        this.addToCart = phone => {
            if (this.cart.indexOf(phone) === -1) {
                this.cart.push(phone);
            }

            phone.countInCart(phone.countInCart() + 1);

            this.totalPrice(parseFloat(this.totalPrice()) + phone.phoneInfo.price);

            showNotification(phone.phoneInfo.name + ' added to cart');
        };

        this.removeFromCart = (phone) => {
            let removeIndex = this.cart.indexOf(phone);
            if (removeIndex === -1) {
                return;
            }

            if (this.cart()[removeIndex].countInCart === 1) {
                this.cart.remove(phone);
            }

            phone.countInCart(phone.countInCart() - 1);
            this.totalPrice(parseFloat(this.totalPrice()) - phone.phoneInfo.price);

            showNotification(phone.phoneInfo.name + ' removed from cart', 'danger');
        };

        this.removeAllFromCart = phone => {
            let count = phone.countInCart();
            this.cart.remove(phone);
            phone.countInCart(0);
            this.totalPrice(parseFloat(this.totalPrice()) - phone.phoneInfo.price * count);

            showNotification(`All items of ${phone.phoneInfo.name} removed from cart`, 'danger');
        };

        this.isInCart = phone => {
            return this.cart().indexOf(phone) !== -1;
        };

        this.clearCart = () => {
            for(let phone of this.cart()) {
                phone.countInCart(0);
            }

            this.cart.removeAll();
            this.totalPrice(0);
        };

        this.buy = () => {
            this.clearCart();
            showNotification(`You've successfully bought this phones.`);
        };
    }
}

class PhoneViewModel {
    constructor(phoneInfo) {
        this.isInCart = ko.computed(() => this.countInCart > 0);
        this.phoneInfo = phoneInfo;
        this.countInCart = ko.observable(0);

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

$(".modal-transparent").on('show.bs.modal', function () {
  setTimeout( function() {
    $(".modal-backdrop").addClass("modal-backdrop-transparent");
  }, 0);
});
$(".modal-transparent").on('hidden.bs.modal', function () {
  $(".modal-backdrop").addClass("modal-backdrop-transparent");
});