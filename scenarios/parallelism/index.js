var path      = require('path')
var benchmark = require('../../benchmark')
var isHarmony = benchmark.isHarmony

function done(deferred) { deferred.resolve() }

function K(x){ return function(){ return x }}

function dup(val, times) {
  return Array(times + 1).join(0).split(0).map(K(val)) }

function genList(dupFactor, dupFrequency) {
  var xs = Array(10).join(0).split(0)
  return xs.reduce(function(r, x, i) {
                     if (i < dupFrequency)  r = r.concat(dup(i * 10, dupFactor))
                     else                   r.push(i * 10)
                     return r }
                  ,[] )}

function run(dupFactor, dupFrequency, bench) {
  var xs = genList(dupFactor, dupFrequency)

  if (isHarmony()) bench('Co', require('./co')(xs))
  bench('Callbacks (baseline)', require('./callbacks')(xs, done))
  bench('Async', require('./async')(xs, done))
  bench('Pinky', require('./pinky')(xs))
  bench('Pinky (synchronous)', require('./pinky-sync')(xs))
  bench('Q', require('./q')(xs))
  bench('When', require('./when')(xs))
  bench('Deferred', require('./deferred')(xs)) }


benchmark.suite('Parallelism (no cache)', function(bench) {
  run(0, 0, bench) })

benchmark.suite('Parallelism (small cache)', function(bench) {
  run(4, 2, bench) })

benchmark.suite('Parallelism (medium cache)', function(bench) {
  run(4, 5, bench) })

benchmark.suite('Parallelism (fully cached)', function(bench) {
  run(4, 10, bench) })