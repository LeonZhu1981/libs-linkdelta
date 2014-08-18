var fs = require('fs');
var log4js = require('log4js');
var settings = require("./settings.js")();

var logPath = "./logs";
if (!fs.existsSync(logPath)) {
	fs.mkdirSync(logPath);
};

log4js.configure(settings.log);

module.exports = function(category) {
	var logger = log4js.getLogger(category);
	logger.setLevel(settings.log.level);
	return logger;
};