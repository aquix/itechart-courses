var jsdom = require('jsdom');
var fs = require('fs');

var url = 'http://www.eda.by/catalog/obed-menu/1/';

jsdom.env({
    url: url,
    done: function (err, window) {
        var items = window.document.querySelectorAll('.catalog tr');

        let results = [];

        for(let item of items) {
            if (item.querySelector('.dishphoto img') === null) {
                continue;
            }

            let result = {};
            let imgLink = item.querySelector('.dishphoto img').src;
            let name = item.querySelector('.dishinfo > h2').innerHTML;
            let textPrice = item.querySelector('.dishinfo > sup').innerHTML;

            let priceMatch = textPrice.match(/\/ (\d+) (\d+)/);
            let price = +(priceMatch[1] + priceMatch[2]) / 10000;
            let text = item.querySelector('.summary').textContent;
            let textMatch = text.match(/(.+)(В \d+ г.+)/);
            let description;
            let compound;

            if (textMatch === null) {
                description = '';
                compound = '';
            } else {
                description = textMatch[1];
                compound = textMatch[2];
            }

            result = {
                imgLink, name, price, description, compound
            };

            results.push(result);
        }

        let jsonData = JSON.stringify(results);

        fs.writeFile('../data/food-data.json', jsonData);
    }
});
