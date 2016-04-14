module.exports=[{
	name: "id",
	isUnique: true,
	defaultData: (function(){
		let cnt=0;
		return function(){
			return "default"+cnt++
		}
	})(),
	restriction:function(val){
		return ((typeof val=="string")&&(val.length>0));
	}
},{
	name: "name",
	isUnique: false,
	defaultData: "Some Movie",
	restriction:function(val){
		return ((typeof val=="string")&&(val.length>0));
	}
},{
	name: "poster",
	isUnique: false,
	defaultData: "/static/default.jpg",
	restriction:function(val){
		return ((typeof val=="string")&&(val.length>0));
	}
},{
	name: "director",
	isUnique: false,
	defaultData: "Some director",
	restriction:function(val){
		return ((typeof val=="string")&&(val.length>0));
	}
},{
	name: "actors",
	isUnique: false,
	defaultData: ["Some Actor"],
	restriction:function(val){
		return ((typeof val!="string")&&(val.length)&&(val.length>0));
	}
},{
	name: "type",
	isUnique: false,
	defaultData: "Some Type",
	restriction:function(val){
		return ((typeof val=="string")&&(val.length>0));
	}
},{
	name: "date",
	isUnique: false,
	defaultData: "Some Date",
	restriction:function(val){
		return ((typeof val=="string")&&(val.length>0));
	}
},{
	name: "length",
	isUnique: false,
	defaultData: 0,
	restriction:function(val){
		return (typeof val=="number");
	}
},{
	name: "language",
	isUnique: false,
	defaultData: "Some Language",
	restriction:function(val){
		return ((typeof val=="string")&&(val.length>0));
	}
},{
	name: "rate",
	isUnique: false,
	defaultData: 0,
	restriction:function(val){
		return (typeof val=="number");
	}
},{
	name: "brief",
	isUnique: false,
	defaultData: "Some Brief",
	restriction:function(val){
		return ((typeof val=="string")&&(val.length>0));
	}
}]
