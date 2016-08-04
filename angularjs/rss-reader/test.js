var url = 'http://cloud.feedly.com/v3/streams/contents?streamId=feed%2Fhttp%3A%2F%2Fwww.readwriteweb.com%2Frss.xml&count=20';

feednami.load(url, function (result) {
    console.log(result);
})