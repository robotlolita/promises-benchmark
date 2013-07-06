module.exports = function(promise) {

  var cache = {}

  function promiseOf(a) {
    return promise(function(resolve){ resolve(a) })}


  function isPromise(a) {
    return a
    &&     typeof a.then === 'function' }


  function promiseFrom(a) {
    return isPromise(a)?    a
    :      /* otherwise */  promise(function(resolve){ resolve(a) })}


  function delay(ms, f) {
    var started = new Date
    return promise(function(resolve) {
                     setTimeout( function() { resolve(f()) }
                               , ms - (new Date - started)) })}


  function read(name) {
    return  name in cache?   promiseOf(cache[name])
    :       /* otherwise */  delay(name, function() { return cache[name] = name })}


  function parallel(xs) {
    return promise(function(resolve) {
                     var len    = xs.length
                     var result = new Array(len)
                     xs.map(promiseFrom).forEach(resolvePromise)

                     function resolvePromise(p, i) {
                       p.then(function(value) {
                                result[i] = value
                                if (--len == 0)  resolve(result) })}})}


  return function(list) {
    cache = {}
    return parallel(list.map(read)) }
}