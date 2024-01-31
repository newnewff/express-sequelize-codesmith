const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto('test', 'root', '111111',{host:'127.0.0.1',dialect:'mysql',directory: './app/models/auto'});
const templateController=require('./template/controllers')
const templateRoutes=require('./template/routes')
const fs=require('fs')

function main(){
	fs.mkdir('./app/models/auto', { recursive: true }, (err) => {
		//生成所有model
		auto.run().then(data => {
			console.log('----------------------------')
			for(var table in data.tables){
				createControllers(table);
				createRouter(table)
			}
		});
	});
}

function createControllers(tableName){
	const dirPath='./app/controllers/'+tableName;
	fs.mkdir(dirPath, { recursive: true }, (err) => {
		 fs.writeFile(dirPath+'/'+tableName+'_auto.js',templateController.auto(tableName),function(err){
			if (fs.existsSync(dirPath+'/'+tableName+'_expand.js')==false) {
				fs.writeFile(dirPath+'/'+tableName+'_expand.js',templateController.expand(),function(err){});
			}
		 	if (fs.existsSync(dirPath+'/index.js')==false) {
				fs.writeFile(dirPath+'/'+'index.js',templateController.index(tableName),function(err){});
			}
		 });
	});
}
function createRouter(tableName){
	const dirPath='./app/routes/'+tableName;
	fs.mkdir(dirPath, { recursive: true }, (err) => {
		 fs.writeFile(dirPath+'/'+tableName+'_auto.js',templateRoutes.auto(tableName),function(err){
			if (fs.existsSync(dirPath+'/'+tableName+'_expand.js')==false) {
				fs.writeFile(dirPath+'/'+tableName+'_expand.js',templateRoutes.expand(tableName),function(err){});
			}
		 	
		 });
	});
}


main();