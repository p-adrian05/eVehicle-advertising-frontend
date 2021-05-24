import React, {Component} from "react";
import classes from "./Rate.module.css";
import {Link, NavLink} from "react-router-dom";
import ProfileImage from "../../ProfileImage/ProfileImage";
import {formatDate} from "../../../shared/utility";

class Rate extends Component{


    render() {
        let stateClasses = [classes.State];
        if(this.props.rateState === "POSITIVE"){
            stateClasses.push(classes.Positive)
        }else{
            stateClasses.push(classes.Negative)
        }
        return (
            <div className={classes.Rate}>
                <div className={classes.Header}>
                    <span >Rating user: <span className={classes.Username}>
                        <Link to={"/user/"+this.props.ratingUsername}><span>{this.props.ratingUsername}</span></Link></span>
                    </span>
                    <span>{formatDate(this.props.created)}</span>
                </div>
                <div className={classes.Body}>
                    <div className={classes.SideInfo}>
                        <ProfileImage username={this.props.ratingUsername}/>
                        <div>{this.props.ratingUsername}</div>
                    </div>
                    <div className={classes.RateInfo}>
                        <span className={classes.AdTitle}><NavLink to={"/advertisement/"+this.props.advertisementId}>{this.props.advertisementTitle}</NavLink></span>
                        <span  className={stateClasses.join(' ')}>{this.props.rateState}</span>
                        <p>{this.props.description}</p>
                    </div>
                </div>

            </div>
        )
}
};

export default Rate;
