const express = require("express");
const bodyParser = require("body-parser");
const { error } = require("./src/express-util")("server");

const debug = require('debug')("leads-service");
if (!process.env.SLACK_CHANNEL_URL) {
    debug("WARN: please set up SLACK_CHANNEL_URL variable");
}
const options = {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 8222
};

const app = express();
app.use(bodyParser.json());
app.use(require('cors')());
app.use(require('./src/api')(options));

app.use((req, res, next) => {
  if (req.path !== '/api') error(res, 'Please use /api endpoint');
  else next();
});

if (require.main === module) {
    const { host, port } = options;
    debug("app listening on %s:%d ", host, port);
    app.listen(port, host);
} else {
    module.exports = app;
}