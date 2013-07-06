var async = require('async')
var cache = {}

function read(name, done) {
    name in cache?   done(null, cache[name])
  : /* otherwise */  slowRead()

  function slowRead() {
    setTimeout(function(){ done(null, cache[name] = name) }, name) }}


module.exports = function(list, done) { return function(deferred) {
  cache = {}
  async.map(list, read, function(_, r){ done(deferred) }) }}
