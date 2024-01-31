
const express = require('express')
const path = require('path')
const router = express.Router()
const bvb = require(path.join(process.cwd(),'/app/controllers/bvb'))

//router.post('/bvb', bvb.fn)
module.exports = router
