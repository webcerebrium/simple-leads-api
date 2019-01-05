const debug = require('debug')("store");
const fs = require("fs");

const root = "/opt/leads";
const store = (payload) => {
    const filename = root + "/" + (new Date().toISOString().replace(/:/g, "-")) + ".json"
    debug("Saving to " + filename)
    const obj = {
        ...payload,
        lead_time: new Date().getTime(),
        lead_date: new Date().toISOString()
    }
    fs.writeFileSync(filename, JSON.stringify(obj, null, 2));
    return filename;
}

module.exports = { store }