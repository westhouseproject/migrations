var dbm = require('db-migrate');
var path = require('path');
var fs = require('fs');
var type = dbm.dataType;

exports.up = function(db, callback) {
  var sql = fs.readFileSync(
    path.resolve(
      __dirname,
      '..',
      'sql',
      'initial.sql'
    ), {
      encoding: 'utf8'
    }
  );
  db.runSql(
    sql,
    callback
  );
};

exports.down = function(db, callback) {

};
