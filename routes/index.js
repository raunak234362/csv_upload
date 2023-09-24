const express = require('express')
const router = express.Router()
const multer = require('multer')
const controller = require('../controller/homeController')
const { view } =require('../controller/viewController')

const upload = multer({ dest: 'uploadFiles' })

router.get('/', controller.home)

router.post('/upload',upload.single('file'),controller.upload)

router.get('/delete/:id',controller.delete)

router.get('/view/:id',view)

module.exports = router