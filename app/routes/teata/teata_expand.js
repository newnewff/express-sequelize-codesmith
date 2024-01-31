
const express = require('express')
const path = require('path')
const router = express.Router()
const teata = require(path.join(process.cwd(),'/app/controllers/teata'))

router.post('/teata/f2', teata.f2)
module.exports = router
