var React=require('react');

var Reflux=require('reflux');

import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'

//react components

//reflux
var Actions=require('./action/action.js');

//App
var App = React.createClass({

	mixins: [Reflux.ListenerMixin],

	render: function(){
		return(
			<div>
				APP
			</div>
			)
	}
});

render((
<Router Router history={browserHistory}>
	<Route path="/" component={App} />
</Router>
), document.getElementById("page"));
