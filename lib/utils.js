'use strict';

var mysql = require('mysql');
var settings = require('./database-settings');

var connection = mysql.createConnection(settings);


module.exports.database = {
  query: function (query, callback) {
    connection.query(query, function (err) {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }
};
