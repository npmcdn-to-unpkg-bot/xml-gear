let store=require("./store.js");

let eventPool=require("./eventPool.js");

let schema=require("./movieSchema.js")

let movieStore=store(schema);

let pool=eventPool.makeEventPool();

exports.createMovie=function(obj){
	let created=movieStore.create(obj);
	if(created){
		pool.launch(created);
	}
	return created;
}

exports.createMultipleMovies=function(arr){
	if(arr.length<=0){
		return false;
	}

	let created=[];
	for(let i=0;i<arr.length;i++){
		let m=movieStore.create(arr[i]);
		if(m){
			created.push(m);
		}
	}
	if((created)&&(created.length>0)){
		pool.launch(created);
	}
	return created;
}

exports.updateMovie=function(query,obj){
	let updated=movieStore.update(query,obj);
	if(updated){
		pool.launch(updated);
	}
	return updated;
}

exports.queryMovie=function(obj){
	let found=movieStore.query(obj);
	return found;
}

exports.queryOneMovie=function(obj){
	let found=movieStore.queryOne(obj);
	return found;
}

exports.onChange=function(func){
	pool.bindEvent(func);
}
