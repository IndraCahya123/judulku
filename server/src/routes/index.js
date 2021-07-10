const express = require('express')

const router = express.Router()

//middlewares
const { authentication } = require('../middlewares/Auth')
const { fileUpload } = require('../middlewares/UploadFile')

//auth routes
const { login, checkAuth } = require('../controller/Auth')

router.post('/login', login)
router.get('/check-auth', authentication, checkAuth)

//user routes
const {
    deleteUser,
    changePassword,
    staffRegister,
    mahasiswaRegister,
    getMahasiswaUsers,
    getAllStaffByRole,
    getMahasiswaById,
    getStaffById,
    adminUpdateProfile,
    updateMahasiswa,
    updateStaffProfile,
    getDospem,
} = require('../controller/User')

//global user
router.get('/staffs/:role', authentication, getAllStaffByRole)
router.post('/staff', authentication, staffRegister)
router.patch('/reset-password/:id', authentication, changePassword)
router.patch('/staff/:id', authentication, updateStaffProfile)
router.delete('/user/:id', authentication, deleteUser)

//admin
router.get('/staff/:id', authentication, getStaffById)
router.patch('/admin', authentication, adminUpdateProfile)

//mahasiswa
router.get('/mahasiswa-data', authentication, getMahasiswaUsers)
router.get('/mahasiswa/:id', authentication, getMahasiswaById)
router.post('/mahasiswa-register', mahasiswaRegister)
router.patch('/mahasiswa/:id', authentication, updateMahasiswa)

//dospem
router.get('/dospem-options', authentication, getDospem)

//Criteria route
const {
    addCriteria,
    getAllCriteria,
    getCriteriaById,
    deleteCriteria,
    updateCriteria,
} = require('../controller/Criteria')

router.get('/criteria/:id', authentication, getCriteriaById)
router.get('/criteria', authentication, getAllCriteria)
router.post('/criteria', authentication, addCriteria)
router.patch('/criteria/:id', authentication, updateCriteria)
router.delete('/criteria/:id', authentication, deleteCriteria)

//judul route
const {
    getMyJudul,
    dospemGetJudul,
    kaprodiGetJudul,
    addJudul,
    deleteJudul,
    updateJudulByMhs,
    updateJudulByDospem,
    kaprodiSetValue
} = require('../controller/Judul')

router.get('/my-judul', authentication, getMyJudul)
router.get('/judul/dospem', authentication, dospemGetJudul)
router.get('/judul/kaprodi', authentication, kaprodiGetJudul)
router.post('/judul', authentication, fileUpload('pdf', false), addJudul)
router.patch(
    '/judul/mhs/:id',
    authentication,
    fileUpload('pdf', true),
    updateJudulByMhs,
)
router.patch('/judul/:judulId/dospem', authentication, updateJudulByDospem)
router.patch('/judul/:judulId/kaprodi', authentication, kaprodiSetValue)
router.delete('/judul/:id', authentication, deleteJudul)

//Comment route
const { addComment, updateComment, deleteComment } = require('../controller/Comment')

router.post('/judul/:judulId/comment', authentication, addComment)
router.patch('/comment/:commentId', authentication, updateComment)
router.delete('/comment/:commentId', authentication, deleteComment)

module.exports = router