var cache = {}

function read(name, done) {
    name in cache?   done(cache[name])
  : /* otherwise */  slowRead()

  function slowRead() {
    setTimeout(function(){ done(cache[name] = name) }, name) }}


function parallel(xs, f, done) {
  var len    = xs.length
  var result = new Array(len)

  xs.forEach(function(x, i) {
               f(x, function(v) {
                      result[i] = v
                      if (--len == 0) done(result) })})}


module.exports = function(list, done) { return function(deferred) {
  cache = {}
  parallel(list, read, function(r){ done(deferred) }) }}