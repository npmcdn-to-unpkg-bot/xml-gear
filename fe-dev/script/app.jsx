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

	let re=(movie.queryOneMovie({
		id: "m1"
	}))

	let d=modal.createModalDialog({
		renderContent: function(props,state){
			if(!state.params){
				return (<div/>)
			}
			return(
				<div>
					<div className="movie_info_content">
						<div className="name">{state.params.name}</div>
						<div className="poster"><img src={state.params.poster}></img></div>
						<div className="director">{state.params.director}</div>
						<div className="actors">
							{state.params.actors.map(function(item,i){
								return(<div className="actor" key={i}>{item}</div>)
							})}
						</div>
						<div className="type">{state.params.type}</div>
						<div className="date">{state.params.date}</div>
						<div className="length">{state.params.length}</div>
						<div className="language">{state.params.language}</div>
						<div className="rate">{state.params.rate}</div>
						<div className="brief">{state.params.brief}</div>
					</div>
				</div>
			);
		}
	});

	d.modal(re);

})
.fail(function(){
	//fail
})
.always(function() {
	//always
});
