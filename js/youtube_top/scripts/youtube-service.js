function YoutubeService()   {
    var key = 'AIzaSyCKMgvNd_gAxe_ugn9IqIqLCzlw4hfVTiA';
    var watchLink = 'https://www.youtube.com/watch?v=';

    var READY_STATUS_CODE = 4;

    this.getTopViewed = function (count) {
        var getJsonData = new Promise(function (resolve) {
            var request = new XMLHttpRequest();
            var path = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=' +
                count + '&key=' + key;

            if (count === undefined || count <= 0) {
                count = 1;
            }

            request.onreadystatechange = function() {
                if(request.readyState === READY_STATUS_CODE) {
                    resolve(request.responseText);
                }
            };
            request.open('get', path);
            request.send(null);
        });

        return getJsonData.then(parseResponse);
    };

    function parseResponse(json) {
        var response = JSON.parse(json),
            results = [],
            i,
            result,
            item;

        for (i = 0; i < response.items.length; i++) {
            item = response.items[i];
            result = {
                title: item.snippet.title,
                img: item.snippet.thumbnails.medium.url,
                link: watchLink + item.id
            };
            results.push(result);
        }
        return results;
    }
}
