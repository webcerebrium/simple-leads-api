const { ok, body, error } = require('./express-util')("api");
const { store } = require("./store");
const { notify, attachment } = require("./slack");
const debug = require('debug')("api");

module.exports = (options) => {
  return ( req, res, next ) => {
    const ip = req.connection.remoteAddress || '';
    const xForwarded = req.headers['x-forwarded-for'] || undefined;

    if (req.method == "GET") {
        debug("ping ip=", ip);
        return ok(res, { ip, "result": "pong", time: new Date().getTime() });
    } else if (req.method == "POST") {
        debug("payload", body(req));
        if (body(req)) {
            // save to local file system
            const data = { ...body(req), ip, xForwarded }
            store(data);

            // send to slack
            const text = Object.keys(data).map(key => {
                const value = JSON.stringify(data[key]);
                return key + ": " + value;
            }).join("\n");
            const title = "From " + ip;
            const attachments = [ attachment({ title, text }) ]
            notify({ text: "New Lead", attachments });
            return ok(res, "Accepted");
        } else {
            return error(res, "No")
        }
    }
    next();
  };
};