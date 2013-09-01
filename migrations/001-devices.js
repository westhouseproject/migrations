/* jshint multistr: true */

'use strict';

var utils = require('../lib/utils');
var async = require('async');

var runQuery = utils.database.query.bind(utils.database);
var onDoneQueries = function (next) {
  return function (err) {
    utils.database.end();
    if (err) throw err;
    next();
  };
};

exports.up = function(next) {

  var devicesQuery =
  'CREATE TABLE IF NOT EXISTS `devices` ( \
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT, \
    `device_number` int(11) unsigned NOT NULL, \
    PRIMARY KEY (`id`) \
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;';
  
  var energyConsumptionsQuery =
  'CREATE TABLE IF NOT EXISTS `energy_consumption` ( \
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT, \
    `device_id` int(11) unsigned NOT NULL, \
    `kw` float NOT NULL, \
    `kwh` float NOT NULL, \
    `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \
    PRIMARY KEY (`id`), \
    KEY `device_id` (`device_id`) \
  ) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=latin1;';
  
  var hourlyTotalsQuery =
  'CREATE TABLE IF NOT EXISTS `hourly_totals` ( \
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT, \
    `time` datetime NOT NULL, \
    `start_kwh` float NOT NULL, \
    `hour_kwh` float NOT NULL, \
    `device_id` int(11) unsigned NOT NULL, \
    PRIMARY KEY (`id`), \
    KEY `device_id` (`device_id`) \
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;';

  var perMinuteTotalsQuery =
  'CREATE TABLE IF NOT EXISTS `per_minute_totals` ( \
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT, \
    `time` timestamp NOT NULL, \
    `start_kwh` float NOT NULL, \
    `hour_kwh` float NOT NULL, \
    `device_id` int(11) unsigned NOT NULL, \
    PRIMARY KEY (`id`) \
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;';

  var queries = [
    devicesQuery,
    energyConsumptionsQuery,
    hourlyTotalsQuery,
    perMinuteTotalsQuery
  ];

  async.eachSeries(queries, runQuery, onDoneQueries(next));
};

exports.down = function(next){
  var queries = [
    'DROP TABLE `devices`;',
    'DROP TABLE `energy_consumption`;',
    'DROP TABLE `hourly_totals`;',
    'DROP TABLE `per_minute_totals`;'
  ];

  async.eachSeries(queries, runQuery, onDoneQueries(next));
};
