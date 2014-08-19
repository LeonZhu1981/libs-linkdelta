var settings = require('../common/settings')();
var itunes = require('./itunesAction');
var youtube = require('./youtubeAction');

var platformsObjs = {};
if (platformsObjs) {
    platformsObjs['itunes'] = itunes.action;
    platformsObjs['youtube'] = youtube.action;
}

exports.parseLastUpdated = function(platformName, body) {
    if(platformsObjs[platformName]) {
        return platformsObjs[platformName].parseLastUpdated(body);
    }
}