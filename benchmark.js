var Benchmark = require('benchmark')

var queue   = []
var running = null

function suite(name, block) {
  var s = new Benchmark.Suite(name)
  block(bench(s))

  if (!running)  run(s)
  else           queue.push(s)
}

function bench(suite){ return function(name, code) {
  suite.add(name, { defer: true, fn: code })
}}

function fastest(suite) {
  return suite.filter('fastest').pluck('name') }

function slowest(suite) {
  return suite.filter('slowest').pluck('name') }

function run(suite, cb) {
  var err = 0
  suite.on('cycle', function(event) {
                      var bench = event.target
                      if (bench.error) console.error( '\x1B[0;31m' + ++err + ')'
                                                    , String(bench)
                                                    , bench.error.message
                                                    , '\n'
                                                    , bench.error.stack || ''
                                                    , '\x1B[0m')

                      else             console.log('››', String(bench)) })

  suite.on('complete', function() {
                         console.log('---'
                                    ,'\nFastest:', fastest(this).join(', ')
                                    ,'\nSlowest:', slowest(this).join(', '))
                         if (cb)  cb()

                         running  = null
                         var next = queue.shift()
                         if (next)  run(next) })

  console.log('\x1B[0;36m\n:: Benchmarks for:', suite.name)
  console.log('   Sit back, this can take a while.\x1B[0m\n---')

  running = suite

  suite.run({ defer: true, async: true }) }


module.exports = { suite: suite, run: run }