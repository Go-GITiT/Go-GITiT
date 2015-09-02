var api = require('./api.js');
var bigquery = require('bigquery-model');

bigquery.auth({
  email: 'mcbrideryan89@gmail.com',
  key: api.PEM
});

var table = new bigquery.Table({
  projectId: 'test1000-1055',
  datasetId: 'oldstuff',
  table: 'yes',
  schema: {
    fields: [
      {name: 'repository_owner', type: 'STRING'},
      {name: 'repository_name', type: 'STRING'},
      {name: 'repository_created_at', type: 'STRING'}
    ]
  }
});

table.query('SELECT repository_owner, FROM [yes] LIMIT 10;')
  .then(function(records){
    console.log(records);
  });
