var q        = require('q')
var listTest = require('./promises')(function(f) {
                                       var d = q.defer()
                                       f(d.resolve.bind(d), d.reject.bind(d))
                                       return d.promise })

module.exports = function(path, noiseFactor) { return function(deferred) {
  return listTest(path, noiseFactor).then(function(v){
                                            deferred.resolve() })
                                    .done()
}}