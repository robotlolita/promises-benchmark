var fs    = require('fs')
var cache = exports.cache = {}

exports.Future = Future
function Future() {
  this.listeners = []
  this.value     = null
}
Future.prototype = {
  add: function(f) {
    if (this.value)  f(null, this.value)
    else             this.listeners.push(f) }

, resolve: function(v) {
    this.value = v
    this.listeners.forEach(function(f){ f(null, v) })
    this.listeners.length = 0 }
}

exports.read = read
function read(name, done) {
    name in cache?   cache[name].add(done)
  : /* otherwise */  slowRead()

  function slowRead() {
    cache[name] = new Future()
    cache[name].add(done)
    fs.readFile(name, function(err, data) {
                        if (err)  throw err
                        else      cache[name].resolve(data) })}}


exports.readFile = readFile
function readFile(name, done) {
  fs.readFile(name, function(err, data) {
                      if (err)  done(err)
                      else      done(null, data) })}
