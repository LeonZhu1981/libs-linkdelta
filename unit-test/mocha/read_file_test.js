var assert = require("assert"),
    fs = require("fs");

describe('Read file test.', function(){
    describe('#read file parse to json', function(){
        it('should return 2 line in json file', function(){
            fs.readFile('./crawler_source_url.json', 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                var jsonObj = JSON.parse(data);
                assert.equal(2, jsonObj.length);
                assert.equal("http://www.npr.org/rss/podcast.php?id=35", jsonObj[0].url);
                assert.equal("itunes", jsonObj[0].source);
            });
        })
    })
});
