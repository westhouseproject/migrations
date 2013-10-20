
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
 
  var queries = new Array();
  queries.push('DROP TABLE IF EXISTS "per_minute_totals";');
  queries.push('ALTER TABLE `devices` ADD `name` varchar(64);');
  queries.push('CREATE TABLE IF NOT EXISTS consumption(polltime datetime, \
  ind int,units varchar(4),poll float,frequency float);');
  queries.push('CREATE TABLE IF NOT EXISTS con_minutes(polltime datetime, \
  ind int,units varchar(4),poll float,frequency float); \
  alter table con_minutes add unique index(polltime, ind, units);');
  queries.push('CREATE TABLE IF NOT EXISTS con_fivemin(polltime datetime, \
  ind int,units varchar(4),poll float,frequency float); \
  alter table con_fivemin add unique index(polltime, ind, units);');
  queries.push('CREATE TABLE IF NOT EXISTS con_hours(polltime datetime,ind int, \
  units varchar(4),poll float,frequency float);alter table con_hours \
  add unique index(polltime, ind, units);';)
  
  for(var i = 1; i < 10;i++){
	
	queries.push('INSERT INTO consumption SELECT timestamp, '+i+', \
	"kwh", bcpm_0'+i+'_kwh, bcpm_frequency FROM bcpm;';)
	queries.push('INSERT INTO consumption SELECT timestamp, '+i+', \
	"kw",  bcpm_0'+i+'_kw,  bcpm_frequency FROM bcpm;';)
	}
  for(var i = 10; i <= 42;i++){
    
	queries.push('INSERT INTO consumption SELECT timestamp, '+i+', "kwh",\
	bcpm_'+i+'_kwh, bcpm_frequency FROM bcpm;';)
	queries.push('INSERT INTO consumption SELECT timestamp, '+i+', "kw", \
	bcpm_'+i+'_kw,  bcpm_frequency FROM bcpm;';)
	}
  queries.push('INSERT INTO consumption SELECT timestamp, 100, "i",  bcpm_a_i, bcpm_frequency FROM bcpm;');
  queries.push('INSERT INTO consumption SELECT timestamp, 100, "v",  bcpm_a_v, bcpm_frequency FROM bcpm;');
  queries.push('INSERT INTO consumption SELECT timestamp, 100, "kw", bcpm_a_kw, bcpm_frequency FROM bcpm;');
  queries.push('INSERT INTO consumption SELECT timestamp, 200, "i",  bcpm_b_i, bcpm_frequency FROM bcpm;');
  queries.push('INSERT INTO consumption SELECT timestamp, 200, "v",  bcpm_b_v, bcpm_frequency FROM bcpm;');
  queries.push('INSERT INTO consumption SELECT timestamp, 200, "kw",  bcpm_b_kw, bcpm_frequency FROM bcpm;');
  queries.push('INSERT INTO consumption SELECT timestamp, 300, "kwh",  bcpm_cba_kwh, bcpm_frequency FROM bcpm;');
 
  // This is what will execute our queries.
  async.eachSeries(queries, runQuery, onDoneQueries(next));
 
};


exports.down = function(next){
	var queries = ();
	 
	queries.push("ALTER 'devices' DROP COLUMN 'name';");
	queries.push("DROP TABLE IF EXISTS consumption;");
	queries.push("DROP TABLE IF EXISTS con_minutes;");
	queries.push("DROP TABLE IF EXISTS con_fivemin;");
	queries.push("DROP TABLE IF EXISTS con_hours;");
	queries.push("INSERT IGNORE INTO bcpm(timestamp) \
	SELECT polltime FROM consumption WHERE ind = 1 AND units = 'kw';");
	for(var i = 1; i <10; i++){
		queries.push("UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = \
		co.polltime SET bc.bcpm_0"+i+"_kwh = co.poll WHERE co.ind = "+i+" AND \
		co.units = 'kwh';");
		queries.push("UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = \
		co.polltime SET bc.bcpm_0"+i+"_kw = co.poll WHERE co.ind = "+i+" AND \
		co.units = 'kw';");
		
	}
	for(var i = 10; i<=42;i++){
		queries.push("UPDATE bcpm bc INNER JOIN consumption co ON \
		bc.timestamp = co.polltime SET bc.bcpm_"+i+"_kw = co.poll WHERE \
		co.ind = "+i+" AND co.units = 'kw';");
		queries.push("UPDATE bcpm bc INNER JOIN consumption co ON \
		bc.timestamp = co.polltime SET bc.bcpm_"+i+"_kwh = co.poll WHERE \
		co.ind = "+i+" AND co.units = 'kwh';");
	}
	queries.push("UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_a_i = co.poll WHERE co.ind = 100 AND co.units = 'i';");
	queries.push("UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_a_v = co.poll WHERE co.ind = 100 AND co.units = 'v';");
	queries.push("UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_a_kw = co.poll WHERE co.ind = 100 AND co.units = 'kw';");
	queries.push("UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_b_i = co.poll WHERE co.ind = 200 AND co.units = 'i';");
	queries.push("UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_b_v = co.poll WHERE co.ind = 200 AND co.units = 'v';");
	queries.push("UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_b_kw = co.poll WHERE co.ind = 200 AND co.units = 'kw';");
	queries.push("UPDATE bcpm bc INNER JOIN consumption co ON bc.timestamp = co.polltime SET bc.bcpm_cba_kwh = co.poll WHERE co.ind = 300 AND co.units = 'kwh';");
	// This is what will execute our queries.
	async.eachSeries(queries, runQuery, onDoneQueries(next));
};
