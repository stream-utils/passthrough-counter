const { Transform } = require('node:stream')

class Counter extends Transform {
  /**
   * @param {import('node:stream').TransformOptions=} options
   */
  constructor(options) {
    super(options)
    this.length = 0
  }

  _transform(chunk, encoding, callback) {
    this.length += chunk.length
    this.push(chunk)
    callback()
  }
}

module.exports = Counter