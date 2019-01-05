const { store } = require("./store");
const should  = require("chai").should();

describe("Storage", () => {
    it("saves the object", async() => { 
        const payload = {
            "key1" : "value1",
            "key2" : "value2",
            "key3" : { "is" : "an object" }
        }
        const filename = store(payload);
        require('fs').existsSync(filename).should.equal(true)
    })
})