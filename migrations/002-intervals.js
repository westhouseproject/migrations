
'use strict';

var utils = require('../lib/utils');

//// A library that I like to use.
var async = require('async');
 
// The function that will run an arbitrary SQL query.
var runQuery = utils.database.query.bind(utils.database);
 
// The callback function that will be called once all the queries have been
// called.
var onDoneQueries = function (next) {
  return function (err) {
    utils.database.end();
    if (err) throw err;
    next();
  }
};
 
exports.up = function (next) {
 
  // Some dummy queries.
  var queries = new Array();
  queries[0] = 'DROP TABLE IF EXISTS `per_minute_totals`;';
  queries[1] = 'ALTER `devices` ADD `name` string;';
  queries[2] = 'CREATE TABLE consumption(polltime datetime,ind int,units varchar(4),poll float,frequency float);';
  queries[3] = 'CREATE TABLE con_minutes(polltime datetime,ind int,units varchar(4),poll float,frequency float);alter table con_minutes add unique index(polltime, ind, units);';
  queries[4] = 'CREATE TABLE con_hours(polltime datetime,ind int,units varchar(4),poll float,frequency float);alter table con_hours add unique index(polltime, ind, units);';
  
  for(int i = 1; i < 10;i++){
       queries[4+i*2] =  'INSERT INTO consumption SELECT timestamp, '+i+', "kw",  bcpm_0'+i+'_kw,  bcpm_frequency FROM bcpm;';
	   queries[4+i*2-1] =  'INSERT INTO consumption SELECT timestamp, '+i+', "kwh", bcpm_0'+i+'_kwh, bcpm_frequency FROM bcpm;';
  }
  for(int i = 10; i <= 42;i++){
       queries[4+i*2]    'INSERT INTO consumption SELECT timestamp, '+i+', "kw",  bcpm_'+i+'_kw,  bcpm_frequency FROM bcpm;';
	   queries[4+i*2-1]   'INSERT INTO consumption SELECT timestamp, '+i+', "kwh", bcpm_'+i+'_kwh, bcpm_frequency FROM bcpm;';
  }
       queries[89]=   'INSERT INTO consumption SELECT timestamp, 100, "i",  bcpm_a_i, bcpm_frequency FROM bcpm;';
	   queries[90]=   'INSERT INTO consumption SELECT timestamp, 100, "v",  bcpm_a_v, bcpm_frequency FROM bcpm;';
	   queries[91]=   'INSERT INTO consumption SELECT timestamp, 100, "kw", bcpm_a_kw, bcpm_frequency FROM bcpm;';
	   queries[92]=   'INSERT INTO consumption SELECT timestamp, 200, "i",  bcpm_b_i, bcpm_frequency FROM bcpm;';
	   queries[93]=   'INSERT INTO consumption SELECT timestamp, 200, "v",  bcpm_b_v, bcpm_frequency FROM bcpm;';
	   queries[94]=   'INSERT INTO consumption SELECT timestamp, 200, "kw",  bcpm_b_kw, bcpm_frequency FROM bcpm;';
	   queries[95]=   'INSERT INTO consumption SELECT timestamp, 300, "kwh",  bcpm_cba_kwh, bcpm_frequency FROM bcpm;';
 
  // This is what will execute our queries.
  async.eachSeries(queries, runQuery, onDoneQueries(next));
 
};


exports.down = function(next){
 var queries = new Array();
 
queries[0] = "ALTER 'devices' DROP COLUMN 'name';"
queries[1] = "DROP TABLE IF EXISTS consumption;";
queries[2] = "DROP TABLE IF EXISTS con_min;";
queries[3] = "DROP TABLE IF EXISTS con_hour;";
queries[4] = "INSERT IGNORE INTO bcpm(timestamp) SELECT polltime FROM consumption WHERE ind = 1 AND units = 'kw';";
for(int i = 1; i <10; i++){
	queries[4+i*2] "UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_0"+i+"_kw = co.poll WHERE co.ind = "+i+" AND co.units = 'kw';";
	queries[4+i*2-1] "UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_0"+i+"_kwh = co.poll WHERE co.ind = "+i+" AND co.units = 'kwh';";
}
for(int i = 10; i<=42;i++){
	queries[4+i*2] "UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_"+i+"_kw = co.poll WHERE co.ind = "+i+" AND co.units = 'kw';";
	queries[4+i*2-1] "UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_"+i+"_kwh = co.poll WHERE co.ind = "+i+" AND co.units = 'kwh';";
}
	queries[89] = "UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_a_i = co.poll WHERE co.ind = 100 AND co.units = 'i';";
	queries[90] = "UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_a_v = co.poll WHERE co.ind = 100 AND co.units = 'v';";
	queries[91] = "UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_a_kw = co.poll WHERE co.ind = 100 AND co.units = 'kw';";
  queries[92] = "UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_b_i = co.poll WHERE co.ind = 200 AND co.units = 'i';";
	queries[93] = "UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_b_v = co.poll WHERE co.ind = 200 AND co.units = 'v';";
	queries[94] = "UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_b_kw = co.poll WHERE co.ind = 200 AND co.units = 'kw';";
	queries[95] = "UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_cba_kwh = co.poll WHERE co.ind = 300 AND co.units = 'kwh';";
  // This is what will execute our queries.
  async.eachSeries(queries, runQuery, onDoneQueries(next));
};
