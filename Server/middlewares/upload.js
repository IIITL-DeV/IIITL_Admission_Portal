// Multer
const multer = require('multer')

// Path
const path = require('path')

// Grid Fs Storage
const { GridFsStorage } = require('multer-gridfs-storage')

// For jwt Token
const jwt = require('jsonwebtoken')

// Database uri
require('../db/Database')
const Database = process.env.Database

const crypto = require('crypto')

// Storage engine for Gridfs
const storage = new GridFsStorage({
  url: Database,
  options: {
     useUnifiedTopology: true,
     useNewUrlParser: true
     },
  file: (req, file) => {
    return new Promise((resolve, reject) => {

      // encrypt file name before storing it
      crypto.randomBytes(16, (err, buf) => {
        if (err){
          return reject(err)
        }

        // Set A Unique name for the file
        const filename = buf.toString('hex') + path.extname(file.originalname);
        
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        }
        resolve(fileInfo)
      })
    })
  }
})


// Uploading Files to the backend
const upload =  multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
  checkFileType(file, cb)}
}).single('file')


// Checking Extension of the file
const checkFileType = (file, cb) => {
    // Allowed extensions
    const filetypes = /pdf/
    // check extension
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())
  
    // Check Mime types because extension can be easily renamed
    const mimetype = filetypes.test(file.mimetype)
  
    if (mimetype && extname) {
      return cb(null, true);
    }
    else {
      return cb('This File Type is not allowed')
    }
}

module.exports = upload
