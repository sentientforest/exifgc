const fs = require('fs')
const path = require('path')
const exifr = require('exifr')

// exif metadata is only supported in a small number of file types
const fileFormatMatchList = [ '.jpg', '.jpeg', '.tif', '.tiff', '.wav' ]

exports.parseExifFilePaths = function parseExifFilePaths (paths) {
  let matchedPaths = []
  paths.forEach((fpath) => {
    const lstat = fs.lstatSync(fpath)
    if (!lstat) {
      return
    }
    if (lstat.isFile() &&
    fileFormatMatchList.indexOf(path.extname(fpath) != -1)) {
      matchedPaths.push(fpath)
    }
    else if (lstat.isDirectory()) {
      const dirList = fs.readdirSync(fpath)
      const dirContents = dirList.map(f => path.resolve(fpath, f))
      const dirMatches = parseExifFilePaths(dirContents)
      matchedPaths.splice(matchedPaths.length, 0, ...dirMatches)
    }
  })
  return matchedPaths
}

exports.exifgcPath = async function exifgcPath (fpath) {
    let result = await exifr.gps(fpath).catch(e => console.log('error getting gps: ', e))
    if (result) {
      result._file_path = fpath
      return result
    }
    return false
}
