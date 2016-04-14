module.exports=function(schema){
	/*
	let schema=[];
	*/

	let dataList=[];

	let checkRestriction=function(name,val){
		let f=schema.find(function(field){
			return field.name==name;
		});
		if(!f){
			return false;
		}
		else if((f.restriction)&&(typeof f.restriction=="function")){
			return f.restriction(val);
		}else{
			return true;
		}
	}

	let makeData=function(obj){

		let data={};

		for(let i=0;i<schema.length;i++){

			let dataType=schema[i];
			let dt;

			if((dataType.name in obj)&&(checkRestriction(dataType.name,obj[dataType.name]))){
				//value is okay
				dt=obj[dataType.name];
			}else{
				//do as default
				if(typeof dataType.defaultData=="function"){
					dt=dataType.defaultData();
				}else{
					dt=(dataType.defaultData)?(dataType.defaultData):({});
				}
			}

			data[dataType.name]=dt;
		}

		return data;
	}

	let paramMatch=function(a,b){
		let matched=false;

		for(let p in b){
			if(p in a){
				matched=(a[p]==b[p]);
			}else{
				matched=false;
			}

			if(!matched){
				break;
			}
		}

		return matched;
	}

	let queryOne=function(obj){

		for(let i=0;i<dataList.length;i++){
			let data=dataList[i];

			if(paramMatch(data,obj)){
				return data;
			}
		}

		return undefined;
	}

	let query=function(obj){
		let result=[];

		for(let i=0;i<dataList.length;i++){
			let data=dataList[i];

			if(paramMatch(data,obj)){
				result.push(data);
			}
		}

		return result;
	}

	let checkDuplicate=function(obj){
		let q={};

		for(let p in obj){
			let f=schema.find(function(field){
				return field.name==p;
			});

			if((f)&&(f.isUnique)){
				q[p]=obj[p];
			}
		}

		return (queryOne(q));
	}

	return {
		create: function(obj){

			if(!checkDuplicate(obj)){
				let data=makeData(obj)
				dataList.push(data);
				return data;
			}else{
				//err
				return false;
			}
		},
		remove: function(obj){
			let toRemove=[];
			let removed=[];

			for(let i=0;i<dataList.length;i++){
				let data=dataList[i];

				if(paramMatch(data,obj)){
					toRemove.push(i);
				}
			}

			if(toRemove.length<=0){
				return false;
			}

			for(let i=0;i<toRemove.length;i++){
				let removeIndex=toRemove[i];

				removed.push(dataList[removeIndex]);

				dataList.splice(removeIndex,1);
			}

			return removed;
		},
		update: function(q,obj){
			let rl=query(q);

			if(rl.length==0){
				//err
				return false;
			}

			let updated=[];

			for(let i=0;i<rl.length;i++){
				let r=rl[i];

				for(let p in obj){
					if(checkRestriction(p,obj[p])){
						r[p]=obj[p];
						updated.push(r[p]);
					}
				}
			}
			return updated;
		},
		query: function(obj){
			if(obj==undefined){
				return dataList;
			}
			return query(obj)
		},
		queryOne: function(obj){
			return queryOne(obj)
		}
	}
}
