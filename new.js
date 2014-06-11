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

const datestring = [
  current.getUTCFullYear(),
  current.getUTCMonth() + 1, // JavaScript returns 0 to 11.
  current.getUTCDate(),
  current.getUTCHours(), // JavaScript returns 0 to 23.
  current.getUTCMinutes(), // JavaScript returns 0 to 59.
  current.getUTCSeconds(),
  current.getUTCMilliseconds()
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