const fs = require('fs');
const util = require('util');
const path = require('path');

var migrationName = process.argv[2];

if (!migrationName) {
  console.error('');
  console.error('Expecting a migration name');
  console.error('');
  console.error('Example usage:');
  console.error('')
  console.error('    node new.js <some migration name>');
  console.error('');
  process.exit(1);
  return;
}

const current = new Date();

function pad(num, size) {
  var s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}

const datestring = [
  current.getUTCFullYear(),
  pad(current.getUTCMonth() + 1, 2), // JavaScript returns 0 to 11.
  pad(current.getUTCDate(), 2),
  pad(current.getUTCHours(), 2),
  pad(current.getUTCMinutes(), 2),
  pad(current.getUTCSeconds(), 2),
  pad(current.getUTCMilliseconds(), 3)
].join('');

const filename = util.format('%s__%s.sql', datestring, migrationName);
const destpath = path.join(__dirname, 'sql', filename);

if (fs.existsSync(destpath)) {
  console.error('File, "%s", already exists', destpath);
  process.exit(1);
  return;
}
fs.writeFileSync(destpath, '', 'utf8');

console.log('Successfully created migration, %s', migrationName);