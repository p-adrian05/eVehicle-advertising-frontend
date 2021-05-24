import React,{Component} from "react";

//loaded the actual component that want to use
//for lazy loading, only include the component to webpack that want to use
const asyncComponent = (importComponent) =>{
    return class extends Component{
        state ={
            component:null
        }
        componentDidMount(){
            importComponent()
                .then(cmp=>{
                   this.setState({component:cmp.default});
                });
        }
        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
}
export default asyncComponent;