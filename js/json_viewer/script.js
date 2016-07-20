(function () {
    'use strict';
    /*jslint browser:true */
    /*jslint plusplus: true */

    function drawInvalidJson() {
        var warningDiv = document.createElement('div');
        warningDiv.classList.add('warning-message');
        warningDiv.innerHTML = "Invalid JSON";

        document.getElementById('json-obj').appendChild(warningDiv);
    }

    function buildHeadView(content, type) {
        var div = document.createElement('div'),
            divIndicator = document.createElement('div'),
            divContent = document.createElement('div'),
            spoiler;

        div.classList.add('clearfix', 'node-head');
        divIndicator.classList.add('type-indicator', type);
        divContent.classList.add('content');
        divContent.innerHTML = content;

        if (type === 'object' || type === 'array') {
            spoiler = document.createElement('span');
            spoiler.classList.add('spoiler');
            div.appendChild(spoiler);
        }

        div.appendChild(divIndicator);
        div.appendChild(divContent);
        return div;
    }

    function buildPrimitiveView(key, value) {
        var valueType;
        if (value === null) {
            valueType = 'null';
        } else {
            valueType = typeof value;
        }

        return buildHeadView(key + ": " + value, valueType);
    }

    function buildJsonTree(obj, key) {
        if (key === undefined) {
            key = 'JSON';
        }

        var div = document.createElement('div'),
            divChildren = document.createElement('div'),
            type,
            child,
            i,
            prop,
            margin;

        div.classList.add('expandable');

        if (Array.isArray(obj)) {
            for (i = 0; i < obj.length; i++) {
                child = obj[i];
                if (typeof child === 'object') {
                    divChildren.appendChild(buildJsonTree(obj[i], i));
                } else {
                    divChildren.appendChild(buildPrimitiveView(i, obj[i]));
                }
            }

            type = 'array';
        } else {
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    child = obj[prop];
                    if (typeof child === 'object') {
                        divChildren.appendChild(buildJsonTree(obj[prop], prop));
                    } else {
                        divChildren.appendChild(buildPrimitiveView(prop, obj[prop]));
                    }
                }
            }

            type = 'object';
        }

        divChildren.classList.add('children');

        // Add more indent for children
        margin = parseFloat(divChildren.style.marginLeft) || 0;
        divChildren.style.marginLeft = (margin + 15) + "px";

        div.appendChild(buildHeadView(key, type));
        div.appendChild(divChildren);

        return div;
    }

    // Bind listeners
    document.getElementById('view-btn').onclick = function () {
        var jsonText = document.getElementById('json-text').value,
            jsonObjElement = document.getElementById('json-obj'),
            obj,
            objTree,
            expandables,
            elem,
            i;

        jsonObjElement.innerHTML = "";

        try {
            obj = JSON.parse(jsonText);
        } catch (e) {
            if (e instanceof SyntaxError) {
                drawInvalidJson();
                return;
            }
        }

        objTree = buildJsonTree(obj);
        jsonObjElement.appendChild(objTree);

        expandables = document.getElementsByClassName('expandable');
        for (i = 0; i < expandables.length; i++) {
            elem = expandables[i];
            (function (elem) {
                elem.getElementsByClassName('spoiler')[0].onclick = function () {
                    if (elem.classList.contains('minimized')) {
                        elem.classList.remove('minimized');
                    } else {
                        elem.classList.add('minimized');
                    }
                };
            }(elem));
        }
    };
}());

