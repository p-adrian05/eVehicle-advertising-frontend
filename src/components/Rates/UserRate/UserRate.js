import React, {Component} from "react";

import axios from "../../../axios-ads";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./UserRate.module.css";


class UserRate extends Component{


    state={
        userRate:null
    }
    componentDidMount() {
        if(this.props.username){
            axios.get("rates/count/"+this.props.username)
                .then(res=>{
                    console.log(res.data);
                    this.setState({userRate : res.data});
                });
        }

    }
    componentDidUpdate(nextProps, nextState, nextContext) {
        if(nextProps.username !== this.props.username){
            this.componentDidMount()
        }

    }

    render() {
        let userRate = <Spinner small />;
        if(this.state.userRate !== null) {
            userRate =    <React.Fragment>
                <span className={classes.Positive}>{this.state.userRate["POSITIVE"]} <span>positive</span></span>
                <span className={classes.Negative}>{this.state.userRate["NEGATIVE"]} negative</span>
            </React.Fragment>
        }
        return (
            <div className={classes.UserRate}>
                {userRate}
            </div>

        )
    }
};

export default UserRate;
