var fs = require('fs')
var path = require('path')
var assert = require('assert')

var Counter = require('..')

var pack = path.join(__dirname, '../package.json')
var length = fs.statSync(pack).size

describe('Passthrough Counter', function () {
  it('should work', function (done) {
    var stream = fs.createReadStream(pack)
    var counter = Counter()
    stream.pipe(counter)
    .once('finish', function () {
      assert.equal(this.length, length)
      done()
    })
    .resume()
  })

  it('should have progress', function(done) {
    var stream = fs.createReadStream(pack)
    var counter = Counter()
    var currentLength = 0

    counter.on('progress', function (length) {
      currentLength += length;
    })

    stream.pipe(counter)
    .once('finish', function() {
      assert.equal(currentLength, length);
      done();
    });
  })
})
