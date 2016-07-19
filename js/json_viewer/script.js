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
        var divHead = document.createElement('div');
        divHead.classList.add('nodeHead');

        div.classList.add('expandable');

        var divChilds = document.createElement('div');
        divChilds.classList.add('childs');

        var child;
        if (Array.isArray(obj)) {
            for (var i = 0; i < obj.length; i++) {
                child = obj[i];
                if (typeof child === 'object') {
                    divChilds.appendChild(buildJsonTree(obj[i], i));
                } else {
                    divChilds.appendChild(buildPrimitiveView(i, obj[i]));
                }
            }
        } else {
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) {
                    continue;
                }

                child = obj[prop];
                if (typeof child === 'object') {
                    divChilds.appendChild(buildJsonTree(obj[prop], prop));
                } else {
                    divChilds.appendChild(buildPrimitiveView(prop, obj[prop]));
                }
            }
        }

        divHead.innerHTML = key;

        div.appendChild(divHead);
        div.appendChild(divChilds);

        return div;
    }

    function buildPrimitiveView(key, value) {
        var div = document.createElement('div');

        var valueType;
        if (value === null) {
            valueType = 'null';
        } else {
            valueType = typeof value;
        }

        var divIndicator = document.createElement('div');
        divIndicator.classList.add('type-indicator', valueType);

        var divContent = document.createElement('div');
        divContent.innerHTML = key + ": " + value;

        div.appendChild(divIndicator);
        div.appendChild(divContent);
        return div;
    }

    document.getElementById('view-btn').onclick = function() {
        var jsonText = document.getElementById('json-text').value;

        var obj;
        try {
            obj = JSON.parse(jsonText);
        } catch (e) {
            if (e instanceof SyntaxError) {
                drawInvalidJson();
            }
        }

        var objTree = buildJsonTree(obj);
        document.getElementById('json-obj').appendChild(objTree);

    };
})();

