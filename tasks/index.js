'use strict';

var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);
var targets = fs.readdirSync('./gulp/targets/').filter(onlyScripts);

tasks.forEach(function(task) {
  require('./tasks/' + task);
});

targets.forEach(function(target) {
  require('./targets/' + target);
});