/* global ko */

ko.bindingHandlers.highlight = {
    update: function(element, valueAccessor) {
        if (ko.unwrap(valueAccessor())) {
            element.classList.add('highlighted');
        } else {
            element.classList.remove('highlighted');
        }
    }
};
