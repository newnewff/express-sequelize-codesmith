
const express = require('express')
const router = express.Router()
const path = require('path')
const teata = require(path.join(process.cwd(),'/app/controllers/teata'))

router.post('/teata', teata.add)
router.put('/teata', teata.update)
router.delete('/teata/:id',teata.delete)
router.post('/teata/list', teata.list)
router.post('/teata/findOne', teata.findOne)
router.post('/teata/findOrCreate', teata.findOrCreate)
router.post('/teata/page', teata.page)
module.exports = router
