const assert = require("assert");
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect
const controllerSales = require('../src/controllers/controllerSales');
const mockReq = (reqData) =>{
    return {
        ...reqData
    }
}
const mockRes = (resData) => {
    const res = {};
    res.status = resData.status ? resData.status : '';
    res.body = resData
    return {
        status: 200
    }
}

describe("IMPORT DATA", function() {
    beforeEach(function() {
        sandbox = sinon.createSandbox();
    })

    afterEach(function() {
        sandbox.restore();
    })
  it("Success Export", function() {
      const req = mockReq();
      const res = mockRes({status: 200});

      expect(res).to.deep.include({status: 200});
  });
});
