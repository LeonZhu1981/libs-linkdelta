var mongoose = require('mongoose');

var CrawlerPlatformSchema = new mongoose.Schema({
    name: String,
    url: String,
    httpResponseBody: String,
    lastUpdated: {
        type: Date,
        index: true
    },
    inDate: {
        type: Date,
        default: Date.now
    }
});

CrawlerPlatformSchema.statics.findLastUpdatedRecordByName = function(name, callback) {
    this.findOne({'name': name}).sort({lastUpdated: 'desc'}).exec(function(err, platform) {
        if (err) {
            return callback(err);
        }
        callback(null, platform);
    });
};


module.exports = mongoose.model('CrawlerPlatform', CrawlerPlatformSchema);