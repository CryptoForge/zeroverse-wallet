export const ZERO_MOBILE_SAVE_PATH = 'zero_wallet.json'
export const ZERO_MOBILE_CONTACTS_PATH = 'zero_wallet_contacts.json'

export function readFromFile (fileName, onSuccess, onFail) {
  const pathToFile = cordova.file.dataDirectory + fileName
  window.resolveLocalFileSystemURL(
    pathToFile,
    function (fileEntry) {
      fileEntry.file(function (file) {
        var reader = new FileReader()

        reader.onloadend = function () {
          onSuccess(this.result)
        }

        reader.readAsText(file)
      }, onFail
      )
    }, onFail
  )
}

export function getLocalFileSystemURL(fileName) {
  const pathToFile = cordova.file.dataDirectory + fileName
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(pathToFile, (onSuccess) => {
      resolve(onSuccess)
    }, (onFail) => {
      reject(onFail)
    })
  })
}

export function writeDataToFile(fileEntry, data) {
  data = JSON.stringify(data, 4, '\t')
  return new Promise((resolve, reject) => {
    fileEntry.createWriter((fileWriter) => {

      fileWriter.onwriteend = function (e) {
        resolve(e)
      }
      fileWriter.onerror = function (e) {
        reject(e)
      }
      var blob = new Blob([data], { type: 'text/plain' })
      fileWriter.write(blob)

    }, (onFail) => {
      reject(onFail)
    })
  })
}
// export function writeToFile (fileName, data) {
//   data = JSON.stringify(data, 4, '\t')
//   window.resolveLocalFileSystemURL(
//     cordova.file.dataDirectory,
//     function (directoryEntry) {
//       directoryEntry.getFile(
//         fileName,
//         { create: true },
//         function (fileEntry) {
//           fileEntry.createWriter(function (fileWriter) {
//             fileWriter.onwriteend = function () {
//               // for real-world usage, you might consider passing a success callback
//               // alert('Write of file "' + fileName + '"" completed.')
//             }
//
//             fileWriter.onerror = function () {
//               // you could hook this up with our global error handler, or pass in an error callback
//               alert('WARNING. YOUR SECRET PHRASE COULD NOT BE SAVED. PRIVATE KEYS SAVING FAILED.')
//             }
//
//             var blob = new Blob([data], { type: 'text/plain' })
//             fileWriter.write(blob)
//           }, errorHandler.bind(null, fileName))
//         },
//         errorHandler.bind(null, fileName)
//       )
//     },
//     errorHandler.bind(null, fileName)
//   )
// }

const errorHandler = function (fileName, e) {
  var msg = ''

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'Storage quota exceeded'
      break
    case FileError.NOT_FOUND_ERR:
      msg = 'File not found'
      break
    case FileError.SECURITY_ERR:
      msg = 'Security error'
      break
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'Invalid modification'
      break
    case FileError.INVALID_STATE_ERR:
      msg = 'Invalid state'
      break
    default:
      msg = 'Unknown error'
      break
  }

  alert('Error (' + fileName + '): ' + msg)
}
