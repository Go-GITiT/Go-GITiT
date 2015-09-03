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

var records_table = new bigquery.Table({
  projectId: 'test1000-1055',
  datasetId: 'gitit',
  tableId: 'records'
})

table.query('SELECT repo.name, repo.url \
  FROM [githubarchive:day.yesterday] \
  WHERE payload CONTAINS \'"language":"JavaScript"\' \
  GROUP EACH BY repo.name, repo.url \
  ORDER BY repo.name \
  LIMIT 50')
  
  .then(function(records){
    var parsed_records = [];
    var current = {};
    records[0].rows.forEach(function(row){
      current.repo_name = row.f[0].v;
      current.repo_url = row.f[1].v;
      records_table.push(parsed_records)
        .then(function(){
          console.log('FINISHED!');
        })
      .catch(function(err){
        console.error('ERROR ', err);
      });
    });
  }) 
  .catch(function(err){
    console.error('ERROR: ', err);
});
