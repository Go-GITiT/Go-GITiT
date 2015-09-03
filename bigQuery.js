/*jshint multistr: true */
var api = require('./api.js');
var bigquery = require('bigquery-model');
var unparsed_records;
var parsed_records = [];
var async = require('async');

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
});

table.query('SELECT repo.name, repo.url \
  FROM [githubarchive:day.yesterday] \
  WHERE payload CONTAINS \'"language":"JavaScript"\' \
  GROUP EACH BY repo.name, repo.url \
  ORDER BY repo.name \
  LIMIT 50')
  .then(function(records){
    unparsed_records = records;
  })
  .then(function(){
    unparsed_records[0].rows.forEach(function(row){   
      var current = {};
      current.repo_name = row.f[0].v;
      current.repo_url = row.f[1].v;
      parsed_records.push(current);
    });
  })
  .then(function(){
    var count = 0;
    async.each(parsed_records, function(name){
      table.query('SELECT * FROM [gitit.records] WHERE repo_name = "' + name.repo_name + '" LIMIT 10')
        .then(function(records){
          console.log(++count);
          if(records[0].tableRows === 0){
            console.log('THE FOLLOWING WOULD BE INSERTED', name.repo_name);
          } else {
            console.log('THE FOLLOWING DATA WOULD NOT BE INSERTED', name.repo_name);
          }
        })
        .catch(function(err){
          console.error(err);
        });
    });
  });
  // iterate over list
  // check if items are in BQ table
  // if they aren't add them
    // push unique ones into the db


    
/*    records_table.push(parsed_records)
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
});  */
