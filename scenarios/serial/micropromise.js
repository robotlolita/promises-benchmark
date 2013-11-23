var uP       = require('micropromise')
var listTest = require('./promises')(uP)

module.exports = function(path, noiseFactor) { return function(deferred) {
  return listTest(path, noiseFactor)
           .then(function(v){
                   deferred.resolve() })
           .done()
}}