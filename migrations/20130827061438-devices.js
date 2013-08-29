/* jshint node: true */

'use strict';

//var dbm = require('db-migrate');
//var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('devices', {
    id: { type: 'int', primaryKey: true },
    device_number: 'int'
  }, callback);
};

exports.down = function(db, callback) {
  db.droptTable('devices', callback);
};
