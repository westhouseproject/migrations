var settings = require('../database.json');

var exportedSettings = settings.dev;

if (process.env.NODE_ENV === 'production') {
  return exportedSettings = settings.prod;
}

module.exports = exportedSettings;
