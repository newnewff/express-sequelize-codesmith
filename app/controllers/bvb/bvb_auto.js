
const path = require('path');
const db = require(path.join(process.cwd(),'/lib/db/sequelize-db.js'));
const _bvb = require(path.join(process.cwd(),'/app/models/auto/bvb.js'));
const BvbDB = new _bvb(db.mysql.sequelize, db.dataTypes);
const ControllerUtil=require(path.join(process.cwd(),'/app/controllers/util.js'));

exports.add = async function(req,res){
	const bvb = await BvbDB.create(req.body);
	res.send({data:bvb,status:200,msg:'ok'})
}
exports.update = async function(req,res){
	const bvb = await BvbDB.update(req.body,{where:{id:req.body.id}});
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
	BvbDB.destroy({where:{id:id}});
}
function deleteList(ids){
	BvbDB.destroy({where:{id: {
      [db.Op.or]: ids.split(',').map(Number)
    }}});
}
exports.list = async function(req,res){
	const bvbList = await BvbDB.findAll({
	  where: ControllerUtil.DBSplitOP(req.body,db)
	});
	res.send({data:bvbList,status:200,msg:'ok'})
}
exports.findOne = async function(req,res){
	const bvbList = await BvbDB.findOne({
	  where: ControllerUtil.DBSplitOP(req.body,db)
	});
	res.send({data:bvbList,status:200,msg:'ok'})
}
exports.findOrCreate = async function(req,res){
	const [bvbList,created] = await BvbDB.findOrCreate({
	  where: ControllerUtil.DBSplitOP(req.body.where,db),
	  defaults: req.body.obj
	});
	res.send({data:[bvbList,created],status:200,msg:'ok'})
}
exports.page = async function(req,res){
	let pageSize = req.body.pageSize ? req.body.pageSize:10;
	let pageIndex = req.body.pageIndex ? req.body.pageIndex:0;

	const {count,rows} = await BvbDB.findAndCountAll({
	  where: ControllerUtil.DBSplitOP(req.body,db),
	  offset: pageSize*pageIndex, limit: pageSize
	});
	res.send({data:{count,rows},status:200,msg:'ok'})
}
exports.getById = async function(req,res){
	const bvb = await BvbDB.findByPk(req.body.id?req.body.id:req.params.id)
	res.send({data:bvb,status:200,msg:'ok'})
}

