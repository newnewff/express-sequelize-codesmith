
const path = require('path');
const db = require(path.join(process.cwd(),'/lib/db/sequelize-db.js'));
const _teata = require(path.join(process.cwd(),'/app/models/auto/teata.js'));
const TeataDB = new _teata(db.mysql.sequelize, db.dataTypes);
const ControllerUtil=require(path.join(process.cwd(),'/app/controllers/util.js'));

exports.add = async function(req,res){
	const teata = await TeataDB.create(req.body);
	res.send({data:teata,status:200,msg:'ok'})
}
exports.update = async function(req,res){
	const teata = await TeataDB.update(req.body,{where:{id:req.body.id}});
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
	TeataDB.destroy({where:{id:id}});
}
function deleteList(ids){
	TeataDB.destroy({where:{id: {
      [db.Op.or]: ids.split(',').map(Number)
    }}});
}
exports.list = async function(req,res){
	const teataList = await TeataDB.findAll({
	  where: ControllerUtil.DBSplitOP(req.body,db)
	});
	res.send({data:teataList,status:200,msg:'ok'})
}
exports.findOne = async function(req,res){
	const teataList = await TeataDB.findOne({
	  where: ControllerUtil.DBSplitOP(req.body,db)
	});
	res.send({data:teataList,status:200,msg:'ok'})
}
exports.findOrCreate = async function(req,res){
	const [teataList,created] = await TeataDB.findOrCreate({
	  where: ControllerUtil.DBSplitOP(req.body.where,db),
	  defaults: req.body.obj
	});
	res.send({data:[teataList,created],status:200,msg:'ok'})
}
exports.page = async function(req,res){
	let pageSize = req.body.pageSize ? req.body.pageSize:10;
	let pageIndex = req.body.pageIndex ? req.body.pageIndex:0;

	const {count,rows} = await TeataDB.findAndCountAll({
	  where: ControllerUtil.DBSplitOP(req.body,db),
	  offset: pageSize*pageIndex, limit: pageSize
	});
	res.send({data:{count,rows},status:200,msg:'ok'})
}
exports.getById = async function(req,res){
	const teata = await TeataDB.findByPk(req.body.id?req.body.id:req.params.id)
	res.send({data:teata,status:200,msg:'ok'})
}

