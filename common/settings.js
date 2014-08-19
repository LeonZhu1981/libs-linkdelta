var fs = require("fs");

var conf = null;

function merge(result, conf) {
    for (var i in conf) {
        result[i] = conf[i];
    }
}

function parseConf(path) {
    var result = {};
    var files = fs.readdirSync(path);
    for (var i in files) {
        var filedata = fs.readFileSync(path + "/" + files[i]);
        merge(result, JSON.parse(filedata));
    }
    return result;
}


module.exports = function() {
    if (conf == null) {
        var location = process.env.NODE_ENV || 'dev';
        var confPath = __dirname + "/../conf/" + location;
        conf = parseConf(confPath);
    }

    return conf;
};