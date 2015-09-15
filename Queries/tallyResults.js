var Results = require('../Schemas/result.js').Results;
var Tally = require('../Schemas/tally.js').Tally;
var pubnubPublishKey = process.env.PUBNUB_PUBLISH_KEY || api.PUBNUB_PUBLISH_KEY;
var pubnubSubscribeKey = process.env.PUBNUB_SUBSCRIBE_KEY || api.PUBNUB_SUBSCRIBE_KEY;
var pubnub = require("pubnub")({
  ssl: true, // <- enable TLS Tunneling over TCP
  publish_key: pubnubPublishKey,
  subscribe_key: pubnubSubscribeKey
});
var tally = {
  react: 0,
  angular: 0,
  ember: 0,
  backbone: 0,
  mithril: 0,
  polymer: 0,
  flight: 0,
  'objective-j': 0,
  spine: 0,
  knockout: 0,
};

var tallyResults = function(){
  var total = 0, indices = 0, packages = 0;
  var db = require('../Schemas/config.js');
  Results.find(function(err, data){
    total = data.length;
    data.forEach(function(item){
      if(item.file_url.match(/index\.html/)){
        indices++;
      } else if(item.file_url.match(/package\.json/)){
        packages++;
      }
      if(item.repo_data.match(/true/)){
        var curr = JSON.parse(item.repo_data);
        for(var key in curr.libraryCollection){
          if(curr.libraryCollection[key]){
            tally[key]++;
          }
        }
      }
    });
    var today = new Tally({
      tally: JSON.stringify(tally),
      timestamp: new Date(),
      totals: {total: total, indices: indices, packages: packages}
    });
    today.save(function(err){
      if(err){
        console.log('Error : ', err);
        throw err;
      } else {
      db.close();
      }
    });
  });
};

// LISTEN ON PUBNUB MESSAGES !
pubnub.subscribe({
  channel: "gitit_messages",
  callback: function(message) {
    console.log("tallyResultsWorker > ", message);
    if (message.type === 'parseReposWorker_job_complete') {
      tallyResults();
    }
  }
});

var emitPubNubEvent = function() {
  var message = {
    "type": "tallyResultsWorker_job_complete"
  };

  pubnub.publish({
    channel: 'gitit_messages',
    message: message,
    callback: function(e) {
      console.log("SUCCESS!", e);
    },
    error: function(e) {
      console.log("FAILED! RETRY PUBLISH!", e);
    }
  });
};

