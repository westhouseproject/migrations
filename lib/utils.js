'use strict';

var mysql = require('mysql');
var settings = require('./database-settings');

var connection = mysql.createConnection(settings);

connection.connect();

var createError = function (message, query) {
  return new Error('The query `' +  query + '` failed. "' + message + '"');
};

module.exports.database = {
  query: function (query, callback) {

    var onQuery = function (err) {
      if (err) return callback(createError(err.message, query));
      return callback(null);
    };

    connection.query(query, onQuery);
  },

  end: function () {
    connection.destroy();
  }
};
