import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import {Component} from "react/cjs/react.production.min";
import Login from "../../../containers/Login/Login";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";
class NavigationItems extends Component{

    state={
        showLogin:false
    }

    loginClickedHandler=()=>{
        this.setState({showLogin:true})
    }
    closeClickedHandler=()=>{
        this.setState({showLogin:false})
    }
    logoutClickedHandler=()=>{
        this.props.logout();
        this.loginClickedHandler();
    }
render(){
    return (
        <ul className={classes.NavigationItems}>
            <Login show={this.state.showLogin} close={this.closeClickedHandler}/>
            <NavigationItem link="/" exact>Home</NavigationItem>
            {this.props.isAuthenticated?
                <React.Fragment>
                    <NavigationItem link="/post/ad">Post Ad</NavigationItem>
                    <NavigationItem link="/messagePartners">Messages</NavigationItem>
                    <NavigationItem link="/rates">Rates</NavigationItem>
                    <NavigationItem link="/myAds">My ads</NavigationItem>
                    <label className={classes.Logout}>
                        <Link onClick={this.logoutClickedHandler}>Logout</Link>
                    </label>
                </React.Fragment>:
                <label className={classes.Login}>
                    <Link onClick={this.loginClickedHandler}>Login</Link>
                </label>

            }


        </ul>
    )
}
};


const mapStateToProps = state=>{
    return{
        isAuthenticated:state.auth.token!==null
    };
};
const mapDispatchProps = dispatch=>{
    return{
        logout: ()=>dispatch(actions.logout())
    };
};
export default connect(mapStateToProps,mapDispatchProps)(NavigationItems);

