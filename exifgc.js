const exifr = require('exifr')

async function exifgcPath (path) {
    let result = await exifr.gps(path).catch(e => console.log('error getting gps: ', e))
    return result || false
}

exports.exifgcPath = exifgcPath
