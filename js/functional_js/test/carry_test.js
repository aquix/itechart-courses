var assert = require('chai').assert;
var carry = require('../src/carry');

function sayHello(name, age, greetPhrase) {
    return `Hello, my name is ${name}. I am ${age}. And I think: '${greetPhrase}'.`;
}

describe('#carry()', function() {
    it('should execute correct', function() {
        let sayHelloCarried = carry(sayHello);
        let phrase = sayHelloCarried('Vlad')(19)('All is good');
        assert.equal(phrase, 'Hello, my name is Vlad. I am 19. And I think: \'All is good\'.');
    });

    it('should return function when carrying is uncomplete  ', function() {
        let sayHelloCarried = carry(sayHello);
        let littleCarried = sayHelloCarried('Vlad');
        let onceMoreCarried = littleCarried(19);
        assert.isFunction(littleCarried);
        assert.isFunction(onceMoreCarried);
    });
});
