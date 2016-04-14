exports.makeEventPool=function(){
	let pool=[];

	return ({
		launch: function(e){
			for(let i=0;i<pool.length;i++){
				if(typeof pool[i]=="function"){pool[i](e)}
			}
		},
		bindEvent: function(func){
			if(typeof func=="function"){
				pool.push(func);
			}
		}
	})
}
