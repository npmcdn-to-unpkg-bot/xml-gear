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
