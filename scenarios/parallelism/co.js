var co    = require('co')
var cache = {}

function delay(ms, f){ return function(done) {
  setTimeout(function(){ done(null, f()) }, ms) }}

function *read(name) {
  return name in cache?   cache[name]
  :      /* otherwise */  yield delay(name, function(){ return cache[name] = name })}


module.exports = function(list, done) { return function(deferred) {
  cache      = {}

  co(function *() {
    var values = yield list.map(read)
    deferred.resolve() })}}
