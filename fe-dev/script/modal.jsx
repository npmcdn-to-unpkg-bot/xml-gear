let React=require("react");

let render=require("react-dom").render;

exports.createModalDialog=function(obj){

	let onModalSwitch=function(){};

	let isActive=false;

	//
	let Dialog=React.createClass({
		getInitialState: function(){
			return({
				isActive: false
			})
		},

		getDefaultProps: function(){
			return({})
		},

		componentDidMount: function(){
			let that=this;
			onModalSwitch=function(o){
				let a=isActive;
				if((a)&&(typeof obj.onModalDeactivate=="function")){
					obj.onModalDeactivate(o);
				}
				if((a)&&(typeof obj.onModalActivate=="function")){
					obj.onModalActivate(o);
				}
				isActive=!a;
				that.setState({
					isActive: isActive,
					params: o
				})
			}
		},

		render: function(){
			return(
				<div className={"modal "+((this.state.isActive)?("modal_active"):("modal_inactive"))}>
					<div className="modal_content">
						<div className="modal_shut_container" onClick={()=>onModalSwitch()}><i className="fa fa-times"/></div>
						{(function(that){
							if(typeof obj.renderContent=="function"){
								return(obj.renderContent(that.props,that.state));
							}
						})(this)}
					</div>
				</div>
			)
		}
	})

	obj.modal=function(o){
		onModalSwitch(o);
	};

	obj.isActive=function(){
		return isActive
	};

	//render to dom
	let d=document.createElement("div");
	document.body.appendChild(d);
	render((<Dialog/>),d);

	//apis
	return ({
		modal: obj.modal,
		isActive: obj.isActive
	})
}
