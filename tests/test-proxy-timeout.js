'use strict'

var request = require('../index')
var tape = require('tape')

var proxiedHost = 'google.com'

var s = require('net').createServer(function (sock) {
  // Do nothing to simulate a timeout
})

tape('setup', function (t) {
  s.listen(0, function () {
    s.url = 'http://localhost:' + this.address().port
    t.end()
  })
})

tape('proxy opts.timeout', function (t) {
  request({
    tunnel: true,
    url: 'http://' + proxiedHost,
    proxy: s.url,
    timeout: 100
  }, function (err, res, body) {
    t.notEqual(err, null)
    t.ok(err.code === 'ECONNRESET')
    t.end()
  })
})

tape('cleanup', function (t) {
  s.close(function () {
    t.end()
  })
})
