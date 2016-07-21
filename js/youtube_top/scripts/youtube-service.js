function YoutubeService() {
    var key = 'AIzaSyCKMgvNd_gAxe_ugn9IqIqLCzlw4hfVTiA';
    var watchLink = 'https://www.youtube.com/watch?v=';

    this.getTopViewed = function(count, callback) {
        if (count === undefined || count <= 0) {
            count = 1;
        }

        var request = new XMLHttpRequest(),
            path = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=' +
                count + '&key=' + key,
            result;

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                var results = parseResponse(request.responseText);
                callback(results);
            }
        };
        request.open('get', path);
        request.send(null);
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
                snippet: item.snippet.title,
                img: item.snippet.thumbnails.medium.url,
                link: watchLink + item.id
            };
            results.push(result);
        }
        console.log(results);
        return results;
    }
}