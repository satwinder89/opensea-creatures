var fs = require('fs');

var configuration = fs.readFileSync('config.json','UTF-8');

configuration = JSON.parse(configuration);

exports.configuration = configuration;