/* jshint multistr: true */

'use strict';

var utils = require('../lib/utils');
var async = require('async');

var runQuery = utils.database.query.bind(utils.database);

exports.up = function(next) {

  var devicesQuery =
  'CREATE TABLE `devices` ( \
    `id` int(11) unsigned NOT NULL, \
    `device_number` int(11) unsigned NOT NULL, \
    PRIMARY KEY (`id`) \
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;';
  
  var energyConsumptionsQuery =
  'CREATE TABLE `energy_consumption` ( \
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT, \
    `device_id` int(11) unsigned NOT NULL, \
    `kw` float NOT NULL, \
    `kwh` float NOT NULL, \
    `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \
    PRIMARY KEY (`id`), \
    KEY `device_id` (`device_id`) \
  ) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=latin1;';
  
  var hourlyTotalsQuery =
  'CREATE TABLE `hourly_totals` ( \
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT, \
    `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \
    `start_kwh` float NOT NULL, \
    `hour_kwh` float NOT NULL, \
    `device_id` int(11) unsigned NOT NULL, \
    PRIMARY KEY (`id`), \
    KEY `device_id` (`device_id`) \
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;';

  var minutelyTotalsQUery =
  'CREATE TABLE `per_minute_totals` ( \
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT, \
    `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \
    `start_kwh` float NOT NULL, \
    `hour_kwh` float NOT NULL, \
    `device_id` int(11) unsigned NOT NULL, \
    PRIMARY KEY (`id`) \
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;';

  var queries = [
    devicesQuery,
    energyConsumptionsQuery,
    hourlyTotalsQuery,
    minutelyTotalsQUery
  ];

  async.eachSeries(queries, runQuery, function (err) {
    if (err) {
      return function () {
        console.error(err);
        next(err);
      };
    }
    next();
  });
};

exports.down = function(next){
  var query = 'DROP TABLE `devices`';
  utils.database.query(query, next);
};
