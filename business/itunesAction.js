exports.action = {
    name: "itunes",
    parseLastUpdated: function(body) {
        var updated = JSON.parse(body).feed.updated.label;
        return updated;
    }
};