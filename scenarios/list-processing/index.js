var path      = require('path')
var benchmark = require('../../benchmark')

var dirname     = path.join(__dirname, '../../fixtures/files')

benchmark.suite('List processing (no noise)', function(bench) {

  bench('Q', require('./q')(dirname, 0))

})
