var expect = require('chai').expect;
process.env.NODE_ENV = "TESTING";
var bigQuery = require('../Queries/bigQuery.js'),
    foo = 'hello',
    beverages = {
      tea: ['chai', 'matcha', 'oolong']
    };

describe('testing', function() {
  it('we are testing this thing ', function() {

    expect(foo).to.be.a('string');
    expect(foo).to.equal('hello');
    expect(foo).to.have.length(5);
    expect(beverages).to.have.property('tea').with.length(3);

  });

});
