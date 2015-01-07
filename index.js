var peek = require('peek-stream')
var detectFormat = require('detect-format')
var csv = require('csv-parser')
var JSONStream = require('JSONStream')

module.exports = function () {
  return peek({newline: false, maxBuffer: 8000}, function (data, swap) {
    var detected = detectFormat(data)
    if(detected.format === 'json') return swap(null, JSONStream.parse(detected.selector))
    if(detected.format === 'csv') return swap(null, csv({separator: detected.separator}))
    swap(new Error('Undetected format'))
  })
}