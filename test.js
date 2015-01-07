var test = require('tape')
var detect = require('./')
var concat = require('concat-stream')

test('csv', function (t) {
  var detector = detect()
  t.plan(3)
  detector.pipe(concat(function (result) {
    t.equal(result.length, 2)
    t.deepEqual(result[0], {a: '1', b: '2', c: '3'})
    t.deepEqual(result[1], {a: '2', b: '3', c: '4'})
  }))
  
  detector.write('a,b,c\n')
  detector.write('1,2,3\n')
  detector.write('2,3,4\n')
  detector.end()
  
})

test('ndjson', function (t) {
  var detector = detect()
  t.plan(3)
  detector.pipe(concat(function (result) {
    t.equal(result.length, 2)
    t.deepEqual(result[0], {a: '1', b: '2', c: '3'})
    t.deepEqual(result[1], {a: 2, b: 3, c: 4})
  }))
  
  detector.write('{"a": "1", "b": "2", "c": "3"}\n')
  detector.write('{"a": 2, "b": 3, "c": 4}\n')
  detector.end()
  
})

test('json', function (t) {
  var detector = detect()
  t.plan(3)
  detector.pipe(concat(function (result) {
    t.equal(result.length, 2)
    t.deepEqual(result[0], {a: '1', b: '2', c: '3'})
    t.deepEqual(result[1], {a: 2, b: 3, c: 4})
  }))
  
  detector.write('{"rows": [')
  detector.write('{"a": "1", "b": "2", "c": "3"},')
  detector.write('{"a": 2, "b": 3, "c": 4}]}')
  detector.end()
  
})


