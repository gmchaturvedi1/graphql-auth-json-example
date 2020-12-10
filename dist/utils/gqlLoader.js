"use strict";

var fs = require('fs');

var path = require('path');

var loadGQLFile = function loadGQLFile(type) {
  var filePath = path.join(__dirname, '../api', type);
  return fs.readFileSync(filePath, 'utf-8');
};

module.exports = loadGQLFile;