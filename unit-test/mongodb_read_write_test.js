var assert = require("assert"),
    mongoose = require('mongoose'),
    fs = require("fs");

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    // Create your schemas and models here.
    var Schema = mongoose.Schema;

    var crawlerTaskChannelSchema = new mongoose.Schema({
        url: String,
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        source: String,
        catalog: { type: String, default: "" },
        status: { type: String, default: "init" },
        inDate: { type: Date, default: Date.now},
        "lastEditDate": { type: Date, default: Date.now},
        "priority": { type: Number, default: 0}
    });

    var crawlerTaskChannelModel = mongoose.model('CrawlerTaskChannel', crawlerTaskChannelSchema);

    fs.readFile('../crawler_source_url.json', 'utf8', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var jsonObj = JSON.parse(data);
        for (var i = 0; i < jsonObj.length; i++) {
            var model = new crawlerTaskChannelModel();
            model.url = jsonObj[i].url;
            model.source = jsonObj[i].source;

            model.save(function(err, model) {
                if (err) return console.error(model);
                console.dir(model);
            });
        }
    });
});

mongoose.connect('mongodb://localhost/linkdelta');


