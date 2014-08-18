var request = require('request');
var settings = require('../common/settings')();
var logger = require('../common/logger')('platform-jobs/processor.js');
var CrawlerPlatform = require('../models/crawlerPlatform');
var action = require('../business/action');

exports.fetchLastUpdatedAndSave = function(){
    settings.platformUrls.map(function(settingPlatform) {
        var httpResponseBody = request(settingPlatform.url, function (httpError, response, body) {
            if (!httpError && response.statusCode === 200) {
                var settingUpdated = action.parseLastUpdated(settingPlatform.name, body);
                CrawlerPlatform.findLastUpdatedRecordByName(settingPlatform.name, function(dbError, dbPlatform) {
                    if (dbError) {
                        logger.error(dbError);
                    } else {
                        var record = new CrawlerPlatform({
                            name: settingPlatform.name,
                            url: settingPlatform.url,
                            httpResponseBody: body,
                            lastUpdated: settingUpdated
                        });
                        if (dbPlatform) {
                            if (settingUpdated > dbPlatform.lastUpdated) {
                                record.save();
                                logger.info('New record generate to CrawlerPlatform collection cause platform:' + settingPlatform.name + ' changed.');
                            } else {
                                logger.info('Platform:' + settingPlatform.name + ' not changed.');
                            }
                        } else {
                            record.save();
                            logger.info('First insert data to CrawlerPlatform collection of platform:' + settingPlatform.name);
                        }
                    }
                });
            } else {
                logger.error(httpError);
            }
        });
    });
};

