var api = require('./api.js');
var bigquery = require('bigquery-model');

bigquery.auth({
  email: api.EMAIL,
  key: api.PEM
});

var table = new bigquery.Table({
  projectId: 'test1000-1055',
  datasetId: 'oldstuff',
  table: 'yes',
  schema: {
    fields: [
      //{name: 'repository_owner', type: 'STRING'},
      //{name: 'repository_name', type: 'STRING'},
      /*{name: 'repository_created_at', type: 'STRING'}*/
    ]
  }
});

table.query('SELECT id FROM [githubarchive:day.yesterday] LIMIT 10')
  
  .then(function(records){
    records[0].rows.forEach(function(row){
      console.log(row.f[0].v); 
    });
  }) 
  .catch(function(err){
    console.log('ERROR', arguments);
    console.error('ERROR: ', err);
});
