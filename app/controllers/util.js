exports.DBSplitOP = function(where,db){
	let obj={};
	let filterKey=['pageIndex','pageSize'];
	for(var key in where){
		if(filterKey.includes(key)==false){
			let formatKey= key.indexOf('Op.')==0? eval('db.'+key) : key;
			if(Array.isArray( where[key])){
				obj[formatKey]=_dbSplitOP_ByList(where[key],db);
			}else if(typeof where[key]=="object"){
				obj[formatKey]=_dbSplitOP_ByObj(where[key],db);
			}else{
				obj[formatKey]=where[key];
			}
		}
		
	}
	return obj;
}

function _dbSplitOP_ByList(list,db){
	let tmpWhereList=[];
	list.forEach((item)=>{
		tmpWhereList.push(_dbSplitOP_ByObj(item,db));
	});
	return  tmpWhereList;
}
function _dbSplitOP_ByObj(obj,db){
	let tmpWhereObj={};
	for(var key in obj){
		let formatKey= key.indexOf('Op.')==0? eval('db.'+key) : key;
		if(Array.isArray( obj[key])){
			tmpWhereObj[formatKey]= _dbSplitOP_ByList(obj[key],db);
		}else if(typeof obj[key]=="object"){
			tmpWhereObj[formatKey]=_dbSplitOP_ByObj(obj[key],db);
		}else{
			tmpWhereObj[formatKey]=obj[key];
		}
	}
	return tmpWhereObj;
}
