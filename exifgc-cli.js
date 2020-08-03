#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2))
const exifgc = require('./exifgc')

if (argv.h || argv['help']) {
  console.log(`usage: exifgc <path to directory>
    Prevent location coordinate leaks by running a check against a directory of images.
    Returns SUCCESS if no images contain exif coordinate data.
    `)
}

if (!Array.isArray(argv._) || argv._.length < 1) {
  console.log(`No directory provided. Provide a path to a directory.`)
  process.exit(1)
}


const exifPaths = exifgc.parseExifFilePaths(argv._)

Promise.all(exifPaths.map(p => exifgc.exifgcPath(p)))
  .then((results) => {
    let noGps = true
    results.forEach(r => noGps = r ? false : noGps)
    if (noGps) {
      console.log('SUCCESS: No GPS Coordinates found')
      process.exit(0)
    }
    else {
      console.log('Fail: Found GPS Coordinates')
      console.log(results)
      process.exit(1) 
    }
  })
  .catch((error) => {
    console.log('Error checking exif data')
    console.log(error)
    process.exit(1)
  })
