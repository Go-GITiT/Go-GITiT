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
});

table.query('SELECT repo.name, repo.url \
  FROM [githubarchive:day.yesterday] \
  WHERE payload CONTAINS \'"language":"JavaScript"\' \
  GROUP EACH BY repo.name, repo.url \
  ORDER BY repo.name')
  
  .then(function(records){
    records[0].rows.forEach(function(row){
      row.f.forEach(function(col){
        console.log(col.v);
      }); 
    });
  }) 
  .catch(function(err){
    console.error('ERROR: ', err);
});
