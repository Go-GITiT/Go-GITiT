var mongoose = require('mongoose');
var collectionName;


// if (process.env.NODE_ENV === 'TESTING' || process.env.NODE_ENV === 'LOCAL') {
 
// } else {
//   pubnub_message_a = process.env.PUBNUB_MSG_A;
//   pubnub_message_b = process.env.PUBNUB_MSG_B;
// }

var queryDataSchema = new mongoose.Schema({
  repo_name: String,
  repo_url: String
}, {
  collection: 'queryData'
});

var QueryData = mongoose.model('QueryData', queryDataSchema);

module.exports.QueryData = QueryData;
