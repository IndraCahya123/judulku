const multer = require('multer')
const { default: slugify } = require('slugify')

exports.fileUpload = (pdf, isFromEdit) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/controller/files') //lokasi penyimpan file
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + slugify(file.originalname)) //rename nama file by date now + userId + nama original
    },
  })

  const fileFilter = function (req, file, cb) {
    if (file.fieldname === pdf) {
      if (!file.originalname.match(/\.(pdf|PDF)$/)) {
        req.fileValidationError = {
          message: 'Only pdf file are allowed!',
        }
        return cb(new Error('Only pdf file are allowed!'), false)
      }
      cb(null, true)
    }
  }

  const sizeInMB = 5
  const maxSize = sizeInMB * 1000 * 1000 //Maximum file size i MB

  //eksekusi upload multer dan tentukan disk storage, validation dan maxfile size
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: pdf,
      maxCount: 1,
    },
  ]) //fields digunakan karena file yang diupload lebih dari 1 fields

  if (isFromEdit) {
    //middleware handler
    return (req, res, next) => {
      upload(req, res, function (err) {
        //munculkan error jika validasi gagal
        if (req.fileValidationError)
          return res.status(400).send(req.fileValidationError)

        //munculkan error jika melebihi max size
        if (err) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).send({
              message: 'Max file sized 5MB',
            })
          }
          return res.status(400).send(err)
        }

        //jika oke dan aman lanjut ke controller
        //akses nnti pake req.files
        return next()
      })
    }
  } else {
    //middleware handler
    return (req, res, next) => {
      upload(req, res, function (err) {
        //munculkan error jika validasi gagal
        if (req.fileValidationError)
          return res.status(400).send(req.fileValidationError)

        //munculkan error jika file tidak disediakan
        if (!req.files && !err)
          return res.status(400).send({
            message: 'Please select files to upload',
          })

        //munculkan error jika melebihi max size
        if (err) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).send({
              message: 'Max file sized 5MB',
            })
          }
          return res.status(400).send(err)
        }

        //jika oke dan aman lanjut ke controller
        //akses nnti pake req.files
        return next()
      })
    }
  }
}
