
const { notify, attachment } = require("./slack");

describe("Slack", () => {

    it.skip("Message is Sent", async() => { 
        const payload = {
            "key1" : "value1",
            "key2" : "value2",
            "key3" : { "is" : "an object" }
        }
        const text = Object.keys(payload).map(key => {
            const value = JSON.stringify(payload[key]);
            return key + ": " + value;
        }).join("\n");
        const title = "attachment title";
        const attachments = [ attachment({ title, text }) ]
        await notify({ text: "just a test", attachments });
    })

})