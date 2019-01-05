const debug = require('debug')("slack");
const axios = require("axios");

const attachment = ({ title, text, color = "#888"  }) => {
    if (!title) throw new Error("Title is required in attachment");
    if (!text) throw new Error("Text is required in attachment");
    const mrkdwn_in = [ "title", "text" ];
    return { title, text, color, mrkdwn_in };
};

const notify = ({ text, attachments = [] }) => {
    if (!text) throw new Error("Missing text for slack message");

    const url = process.env.SLACK_CHANNEL_URL;
    if (!url) return;

    const payload = { text, attachments };
    debug("Sending to Slack Channel URL=", url)
    debug("PAYLOAD: ", payload);
    return axios({
        url,
        headers: {
        "Content-Type": "application/json",
        },
        data: JSON.stringify(payload),
        method: "POST"
    })
};

module.exports = { notify, attachment };