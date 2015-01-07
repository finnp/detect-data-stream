# detect-data-stream
[![NPM](https://nodei.co/npm/detect-data-stream.png)](https://nodei.co/npm/detect-data-stream/)

Detects if the input stream is tabular data as `csv`, `ndjson` or `json` and converts
them into an object stream if possible


## Usage

```js
var detect = require('detect-data-stream')
var fs = require('fs')

fs.createReadStream('unknown-tabular')
  .pipe(detect())
  .on('data', function (data) {
    console.log(data) // object
  })

```