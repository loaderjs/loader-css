var test = require('tape')
var Loader = require('..')

function bsResolver(requests) {
  var prefix = 'https://s0.meituan.net/bs/css/?f=fewww:'
  var sources = {
    common: '/www/css/common.css',
    base: '/www/css/base.css',
  }
  return prefix + [].concat(requests).map(function (request) {
    return sources[request]
  }).join(',')
}

test('single', function (t) {
  t.plan(2)

  var loader = Loader.create('css', {
    resolve: function (requests) {
      return requests.map(bsResolver)
    },
  })
  loader.load('common').then(function () { t.ok(true, 'common') })
  loader.load('base').then(function () { t.ok(true, 'base') })
})

test('combo', function (t) {
  t.plan(2)

  var loader = Loader.create('css', { resolve: bsResolver })

  loader.load('common').then(function () { t.ok(true, 'common') })
  loader.load('base').then(function () { t.ok(true, 'base') })
})

