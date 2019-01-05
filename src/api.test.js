const app = require("../server");

const chai = require("chai");
chai.use(require('chai-http'));
const { expect } = chai;

describe("API", () => {
  
  it("responds to GET /api/ping", (done) => { 
    chai
      .request(app).get('/api/ping')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
    }); 
  });

  it("responds to POST /api", (done) => { 
    chai
      .request(app)
      .post('/api')
      .set('Content-Type', 'application/json')
      .send({
        "key1" : "VALUE 1",
        "key2" : "FROM TEST",
        "key3" : { "JUST" : "an object" }
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      }); 
  });

});