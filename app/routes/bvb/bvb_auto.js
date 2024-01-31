
const express = require('express')
const router = express.Router()
const path = require('path')
const bvb = require(path.join(process.cwd(),'/app/controllers/bvb'))

router.post('/bvb', bvb.add)
router.put('/bvb', bvb.update)
router.delete('/bvb/:id',bvb.delete)
router.post('/bvb/list', bvb.list)
router.post('/bvb/findOne', bvb.findOne)
router.post('/bvb/findOrCreate', bvb.findOrCreate)
router.post('/bvb/page', bvb.page)
module.exports = router
