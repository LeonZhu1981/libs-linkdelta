var schedule = require('node-schedule');
var processor = require('./processor');
var settings = require('../common/settings')();
var mongooseConn = require('../common/mongooseConnectionManager')(settings.mongodb.url, settings.mongodb.debug);

var rule = new schedule.RecurrenceRule();
rule.minute = new schedule.Range(0, 59, 1);
schedule.scheduleJob(rule, function() {
    processor.fetchLastUpdatedAndSave();
});

//processor.fetchLastUpdatedAndSave();