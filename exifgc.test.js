const assert = require('assert')
const exifgcPath = require('./exifgc').exifgcPath

  exifgcPath('./fixtures/giant-sequoia-copenhagen-botanical-garden-no-gps.jpg')
    .then((result) => {
      // no-gps image should return false
      assert(!result)
      return exifgcPath('./fixtures/quarry-lakes-with-gps.jpg')
    })
    .then((result) => {
      // image with gps should return coordinates
      assert(result)
      assert(result.latitude)
      assert(result.longitude)
      console.log('SUCCESS')
    })
    .catch((error) => {
      console.log('test failed:')
      console.log(error)
      throw error
    })
