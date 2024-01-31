const templateAutoStr=`
const path = require('path');
const db = require(path.join(process.cwd(),'/lib/db/sequelize-db.js'));
const _{{tablename}} = require(path.join(process.cwd(),'/app/models/auto/{{tablename}}.js'));
const {{tableNameUpperCase}}DB = new _{{tablename}}(db.mysql.sequelize, db.dataTypes);
const ControllerUtil=require(path.join(process.cwd(),'/app/controllers/util.js'));

exports.add = async function(req,res){
	const {{tablename}} = await {{tableNameUpperCase}}DB.create(req.body);
	res.send({data:{{tablename}},status:200,msg:'ok'})
}
exports.update = async function(req,res){
	const {{tablename}} = await {{tableNameUpperCase}}DB.update(req.body,{where:{id:req.body.id}});
	res.send({data:{},status:200,msg:'ok'})
}
exports.delete = async function(req,res){
	if(isNaN(req.params.id)){
		if(typeof req.params.id=='string'){
			await deleteList(req.params.id)
		}
	}else{
		await deleteByID(req.params.id)
	}
	res.send({data:{},status:200,msg:'ok2'})
}
function deleteByID(id){
	{{tableNameUpperCase}}DB.destroy({where:{id:id}});
}
function deleteList(ids){
	{{tableNameUpperCase}}DB.destroy({where:{id: {
      [db.Op.or]: ids.split(',').map(Number)
    }}});
}
exports.list = async function(req,res){
	const {{tablename}}List = await {{tableNameUpperCase}}DB.findAll({
	  where: ControllerUtil.DBSplitOP(req.body,db)
	});
	res.send({data:{{tablename}}List,status:200,msg:'ok'})
}
exports.findOne = async function(req,res){
	const {{tablename}}List = await {{tableNameUpperCase}}DB.findOne({
	  where: ControllerUtil.DBSplitOP(req.body,db)
	});
	res.send({data:{{tablename}}List,status:200,msg:'ok'})
}
exports.findOrCreate = async function(req,res){
	const [{{tablename}}List,created] = await {{tableNameUpperCase}}DB.findOrCreate({
	  where: ControllerUtil.DBSplitOP(req.body.where,db),
	  defaults: req.body.obj
	});
	res.send({data:[{{tablename}}List,created],status:200,msg:'ok'})
}
exports.page = async function(req,res){
	let pageSize = req.body.pageSize ? req.body.pageSize:10;
	let pageIndex = req.body.pageIndex ? req.body.pageIndex:0;

	const {count,rows} = await {{tableNameUpperCase}}DB.findAndCountAll({
	  where: ControllerUtil.DBSplitOP(req.body,db),
	  offset: pageSize*pageIndex, limit: pageSize
	});
	res.send({data:{count,rows},status:200,msg:'ok'})
}
exports.getById = async function(req,res){
	const {{tablename}} = await {{tableNameUpperCase}}DB.findByPk(req.body.id?req.body.id:req.params.id)
	res.send({data:{{tablename}},status:200,msg:'ok'})
}

`
const templateIndexStr=
`
var {{tablename}}Auto = require("./{{tablename}}_auto.js");
var {{tablename}}Expand = require("./{{tablename}}_expand.js");
module.exports = {...{{tablename}}Auto,...{{tablename}}Expand}
`

const templateExpandStr=
`
function fn1(req,res) {
  res.send({data:{},status:200,msg:'ok'})
}
module.exports = {fn1:fn1};
`

function templateAuto(tableName){
	let data={tablename:tableName,tableNameUpperCase:tableName.charAt(0).toUpperCase() + tableName.slice(1)};
	return templateAutoStr.replace(/\{{(.*?)}}/g,(match,key)=>data[key]);
}
function templateExpand(){
	return templateExpandStr;
}
function templateIndex(tableName){
	let data={tablename:tableName};
	return templateIndexStr.replace(/\{{(.*?)}}/g,(match,key)=>data[key]);
}
module.exports = {auto:templateAuto,expand:templateExpand,index:templateIndex}
