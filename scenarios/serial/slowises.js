var slowises = require('slowises')
var listTest = require('./promises')(function(f) {
                                       var d = slowises.deferred()
                                       f(d.resolve, d.reject)
                                       return d.promise })

module.exports = function(path, noiseFactor) { return function(deferred) {
  return listTest(path, noiseFactor)
           .then(function(v){
                   deferred.resolve() })
}}
