const templateAutoStr=
`
const express = require('express')
const router = express.Router()
const path = require('path')
const {{tablename}} = require(path.join(process.cwd(),'/app/controllers/{{tablename}}'))

router.post('/{{tablename}}', {{tablename}}.add)
router.put('/{{tablename}}', {{tablename}}.update)
router.delete('/{{tablename}}/:id',{{tablename}}.delete)
router.post('/{{tablename}}/list', {{tablename}}.list)
router.post('/{{tablename}}/findOne', {{tablename}}.findOne)
router.post('/{{tablename}}/findOrCreate', {{tablename}}.findOrCreate)
router.post('/{{tablename}}/page', {{tablename}}.page)
module.exports = router
`

const templateExpandStr=
`
const express = require('express')
const path = require('path')
const router = express.Router()
const {{tablename}} = require(path.join(process.cwd(),'/app/controllers/{{tablename}}'))

//router.post('/{{tablename}}', {{tablename}}.fn)
module.exports = router
`
function templateAuto(tableName){
	let data={tablename:tableName};
	return templateAutoStr.replace(/\{{(.*?)}}/g,(match,key)=>data[key]);
}
function templateExpand(tableName){
	let data={tablename:tableName};
	return templateExpandStr.replace(/\{{(.*?)}}/g,(match,key)=>data[key]);
}
module.exports = {auto:templateAuto,expand:templateExpand}

