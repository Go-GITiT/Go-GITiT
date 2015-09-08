var expect = require('chai').expect
,foo = 'bar'
,beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

describe('testing',function(){
  it('we are testing this thing ', function(){


    pubnub.subscribe({
  channel: "gitit_messages",
  callback: function(message) {
    console.log("bigQueryWorker > ", message);
    if (message.type === 'heroku_scheduler_event') {
     
    }
  }
});

    expect(foo).to.be.a('string');
    expect(foo).to.equal('bar');
    expect(foo).to.have.length(3);
    expect(beverages).to.have.property('tea').with.length(3);

  });
  
});
