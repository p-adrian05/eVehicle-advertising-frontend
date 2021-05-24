import React, {Component} from "react";
import classes from "./MessagePartner.module.css";
import axios from "../../../axios-ads";

import Spinner from "../../UI/Spinner/Spinner";
import ProfileImage from "../../ProfileImage/ProfileImage";

class MessagePartner extends Component{

    render() {
        let partnerClasses = [];
        partnerClasses.push(classes.MessagePartner);
        if(this.props.newMessage=== true){
            partnerClasses.push(classes.NewMessagePartner);
        }

        return (
            <div className={partnerClasses.join(" ")} onClick={this.props.clicked}>
                <ProfileImage username={this.props.username}/>
                <div className={classes.Username}>{this.props.username}</div>
                <div className={classes.MessageTime}>{this.props.date}</div>
            </div>
        )
    }
};

export default MessagePartner;
