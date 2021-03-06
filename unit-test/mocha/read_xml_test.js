var request = require('request'),
    xml2js = require('xml2js'),
    assert = require("assert"),
    parser = new xml2js.Parser();

//request('http://www.npr.org/rss/podcast.php?id=35', function (error, response, body) {
//    if (!error && response.statusCode == 200) {
//        parser.parseString(body, function (err, result) {
//            console.dir(result.rss.channel);
//            console.dir(result.rss.channel[0].language);
//            console.dir(result.rss.channel[0]['itunes:summary']);
//            console.dir(result.rss.channel[0]['itunes:category'][0].$.text);
//            console.dir(result.rss.channel[0]['itunes:image'][0].$.href);
//            console.dir(result.rss.channel[0].item);
//        });
//    }
//});

describe('Parse xml test.', function(){
    describe('#Parse xml from http://feeds.thisamericanlife.org/talpodcast', function(){
        it('should return rss result', function(done){
            request('http://feeds.thisamericanlife.org/talpodcast', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    parser.parseString(body, function (err, result) {
                        console.dir(result.rss.channel);
                        console.dir(result.rss.channel[0].copyright);
                        console.dir(result.rss.channel[0]['itunes:summary']);
                        console.dir(result.rss.channel[0]['itunes:category'][0].$.text);
                        console.dir(result.rss.channel[0]['itunes:image'][0].$.href);
                        console.dir(result.rss.channel[0].item);
                        done();
                    });
                }
            });
        })
    })
});