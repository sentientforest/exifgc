const assert = require('assert')
const exifgcPath = require('./exifgc').exifgcPath

exifgcPath('./fixtures/giant-sequoia-copenhagen-botanical-garden-no-gps.jpg')
  .then((result) => {
    console.log('got no gps result:')
    console.log(result)
    assert(!result)
  })

  .catch((error) => {
    throw error
  })

exifgcPath('./fixtures/quarry-lakes-with-gps.jpg')
  .then((result) => {
    console.log('got gps result')
    console.log(result)
    assert(result)
  })
