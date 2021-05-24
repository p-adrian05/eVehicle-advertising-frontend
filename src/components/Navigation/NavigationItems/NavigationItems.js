import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import {Component} from "react/cjs/react.production.min";
import Login from "../../../containers/Login/Login";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
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
render(){
    return (
        <ul className={classes.NavigationItems}>
            <Login show={this.state.showLogin} close={this.closeClickedHandler}/>
            {this.props.isAuthenticated?
                <React.Fragment>
                    <NavigationItem link="/post/ad">Post Ad</NavigationItem>
                    <NavigationItem link="/messagePartners">Messages</NavigationItem>
                    <NavigationItem link="/rates">Rates</NavigationItem>
                    <NavigationItem link="/myAds">My ads</NavigationItem>
                </React.Fragment>:
                <label className={classes.Login}>
                    <Link onClick={this.loginClickedHandler}>Login</Link>
                </label>

            }
            <NavigationItem link="/" exact>Home</NavigationItem>

        </ul>
    )
}
};


const mapStateToProps = state=>{
    return{
        isAuthenticated:state.auth.token!==null
    };
};
export default connect(mapStateToProps)(NavigationItems);

