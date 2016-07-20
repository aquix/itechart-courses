(function() {
    function drawInvalidJson() {
        var warningDiv = document.createElement('div');
        warningDiv.classList.add('warning-message');
        warningDiv.innerHTML = "Invalid JSON";

        document.getElementById('json-obj').appendChild(warningDiv);
    }

    function buildJsonTree(obj, key) {
        if (key === undefined) {
            key = 'JSON';
        }

        var div = document.createElement('div');
        div.classList.add('expandable');

        var divChildren = document.createElement('div');
        var type;
        var child;
        if (Array.isArray(obj)) {
            for (var i = 0; i < obj.length; i++) {
                child = obj[i];
                if (typeof child === 'object') {
                    divChildren.appendChild(buildJsonTree(obj[i], i));
                } else {
                    divChildren.appendChild(buildPrimitiveView(i, obj[i]));
                }
            }

            type = 'array';
        } else {
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) {
                    continue;
                }

                child = obj[prop];
                if (typeof child === 'object') {
                    divChildren.appendChild(buildJsonTree(obj[prop], prop));
                } else {
                    divChildren.appendChild(buildPrimitiveView(prop, obj[prop]));
                }
            }

            type = 'object';
        }

        divChildren.classList.add('children');

        div.appendChild(buildHeadView(key, type));
        div.appendChild(divChildren);

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

    function buildHeadView(content, type) {
        var div = document.createElement('div');
        div.classList.add('clearfix', 'node-head');

        var divIndicator = document.createElement('div');
        divIndicator.classList.add('type-indicator', type);

        var divContent = document.createElement('div');
        divContent.classList.add('content');
        divContent.innerHTML = content;

        if (type === 'object' || type === 'array') {
            var spoiler = document.createElement('span');
            spoiler.classList.add('spoiler');
            div.appendChild(spoiler);
        }

        div.appendChild(divIndicator);
        div.appendChild(divContent);
        return div;
    }

    // Bind listeners
    document.getElementById('view-btn').onclick = function() {
        var jsonText = document.getElementById('json-text').value;
        var jsonObjElement = document.getElementById('json-obj');
        jsonObjElement.innerHTML = "";

        var obj;
        try {
            obj = JSON.parse(jsonText);
        } catch (e) {
            if (e instanceof SyntaxError) {
                drawInvalidJson();
                return;
            }
        }

        var objTree = buildJsonTree(obj);
        jsonObjElement.appendChild(objTree);

        var expandables = document.getElementsByClassName('expandable');
        var elem;
        for (var i = 0; i < expandables.length; i++) {
            elem = expandables[i];
            (function(elem) {
                elem.getElementsByClassName('spoiler')[0].onclick = function () {
                    if (elem.classList.contains('minimized')) {
                        elem.classList.remove('minimized');
                    } else {
                        elem.classList.add('minimized');
                    }
                }
            })(elem);
        }
    };
})();

