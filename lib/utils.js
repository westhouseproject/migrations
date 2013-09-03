'use strict';

var mysql = require('mysql');
var settings = require('./database-settings');

var connection = mysql.createConnection(settings);

connection.connect();

var createError = function (message, query) {
  return new Error('The query `' +  query + '` failed. "' + message + '"');
};

module.exports.database = {
  /**
   * Runs a MySQL query.
   *
   * @param query is a string representing a MySQL query.
   * @param callback([err]) is the function called when a query finished. It
   *   accepts an error object when a query failed.
   */
   // TODO: test this function.
  query: function (query, callback) {

    var onQuery = function (err) {
      if (err) return callback(createError(err.message, query));
      return callback(null);
    };

    connection.query(query, onQuery);
  },

  /**
   * Closes the connection.
   */
  end: function () {
    connection.destroy();
  }
};
