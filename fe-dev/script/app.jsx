/*
var React=require('react');

var Reflux=require('reflux');

import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'

//react components

//reflux
var Actions=require('./action/action.js');

//libs
var parser = require('xml-parser');
var xmlChecker = require('xmlchecker');

//App
var App = React.createClass({

	mixins: [Reflux.ListenerMixin],

	getDefaultProps: function(){
			return {};
	},

	getInitialState: function(){
			return {};
	},

	componentDidMount: function(){

			this.codeMirror=CodeMirror(document.getElementById("editArea"));

	},

	parseXML: function(){

		var str=this.codeMirror.getValue();

		try{
			xmlChecker.check(str);
		}
		catch(error){
			alert("XML Parser: " + error.name + " at " + error.line + "," + error.column + ": " + error.message);

			return;
		}

		var obj = parser(str);

		console.log(obj);
	},

	render: function(){
		return(
			<div>
				<nav className="navbar navbar-default navbar-fixed-top">
					<div className="container-fluid">
						<div className="navbar-header">
							<a className="navbar-brand" href="#">XML Gear</a>
						</div>
						<button type="button" className="btn btn-default navbar-btn" onClick={this.parseXML}>Check</button>
					</div>
				</nav>
				<div className="content_container">
					<div className="editor_editArea" id="editArea"></div>
				</div>
			</div>
			)
	}
});

render((
<Router Router history={browserHistory}>
	<Route path="/" component={App} />
</Router>
), document.getElementById("page"));
*/

let React=require("react");

let render=require("react-dom").render;

let parser=require('xml-parser');
let xmlChecker=require('xmlchecker');

let movie=require("./movie.js");

let modal=require("./modal.jsx");

let Queryer=React.createClass({
	resultDialog: modal.createModalDialog({

		renderContent: function(props,state){
			if(!state.params){
				return (<div/>)
			}else{
				return (
					<div>
					{state.params.map(function(item,i){
						return(
							<div className="movie_container" key={i}>
								<div className="movie_info_content">
									<div className="name">{item.name}</div>
									<div className="poster"><img src={item.poster}></img></div>
									<div className="director">{item.director}</div>
									<div className="actors">
										{item.actors.map(function(item,i){
											return(<div className="actor" key={i}>{item}</div>)
										})}
									</div>
									<div className="type">{item.type}</div>
									<div className="date">{item.date}</div>
									<div className="length">{item.length}</div>
									<div className="language">{item.language}</div>
									<div className="rate">{item.rate}</div>
									<div className="brief">{item.brief}</div>
								</div>
							</div>
						)
					})}
					</div>
				)
			}
		}
	}),

	getInitialState: function(){
		return({
			queries: []
		});
	},

	getDefaultProps: function(){
		return({});
	},

	componentDidMount: function(){
	},

	createNewQuery: function(){
		let q=this.state.queries;
		q.push({
			key: "",
			val: ""
		})
		this.setState({
			queries: q
		})
	},

	lauchQuery: function(){
		let q=this.state.queries;
		let qo={};

		let haveQuery=false;
		for(let i=0;i<q.length;i++){
			if((q[i].key!="")&&(q[i].val!="")){
				haveQuery=true;
				qo[q[i].key]=q[i].val;
			}
		}

		if(!haveQuery){qo=undefined}

		let re=movie.queryMovie(qo);

		if(re){
			this.resultDialog.modal(re)
		}else{
			alert("No result.");
		}
	},

	render: function(){
		let that=this;
		return(
			<div className="queries">
				{this.state.queries.map(function(item,i){
					return(
						<div key={i}>
							<input
								className="query_key"
								defaultValue={(item.key)?(item.key):("")}
								onChange={function(event){
									let q=that.state.queries;
									q[i].key=event.target.value;
									that.setState({
										queries: q
									})
								}}
								placeholder="key"
							/>
							<input
								className="query_value"
								defaultValue={(item.val)?(item.val):("")}
								onChange={function(event){
									let q=that.state.queries;
									q[i].val=event.target.value;
									that.setState({
										queries: q
									})
								}}
								placeholder="value"
							/>
						</div>
					)
				},this)}
				<div onClick={this.createNewQuery}>
					<input className="query_key query_inactive" placeholder="key" disabled/>
					<input className="query_value query_inactive" placeholder="value" disabled/>
				</div>
				<div className="lauchQuery" onClick={this.lauchQuery}>Query</div>
			</div>
		)
	}
})


$.get("/static/movie.xml",function(data){
})
.done(function(data){
	let str;
	//ie
	if (window.ActiveXObject){
		str = xmlData.xml;
	}
	//Mozilla, Firefox, Opera, etc.
	else{
		str = (new XMLSerializer()).serializeToString(data);
	}

	xmlChecker.check(str);

	let obj = parser(str);

	let m_arr=obj.root.children;
	let arr=[];

	//console.log(arr);

	for(let i=0;i<m_arr.length;i++){
		let m=m_arr[i];
		arr.push({
			id: m.children[0].content,
			name: m.children[1].content,
			poster: m.children[2].content,
			director: m.children[3].content,
			actors: (function(){
				let a=[];
				for(let i=0;i<m.children[4].children.length;i++){
					a.push(m.children[4].children[i].children[0].content);
				}
				return a;
			})(),
			type: m.children[5].content,
			date: m.children[6].content,
			length: (function(){
				return Number(m.children[7].content)
			})(),
			language: m.children[8].content,
			rate: (function(){
				return Number(m.children[9].content)
			})(),
			brief: m.children[10].content,
		})
	}

	movie.createMultipleMovies(arr);

	render((<Queryer/>),document.getElementById("page"));

})
.fail(function(){
	//fail
})
.always(function() {
	//always
});
