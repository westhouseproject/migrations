
'use strict';

var utils = require('../lib/utils');

exports.up = function(next){
  var deletePerMinuteQuery = 'DROP TABLE IF EXISTS `per_minute_totals`;';
  utils.database.query(deletePerMinuteQuery, function (err) {
    if (err) throw err;
    next();
  });
};

exports.down = function(next){
  next();
};
