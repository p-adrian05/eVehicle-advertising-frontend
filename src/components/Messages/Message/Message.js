import React, {Component} from "react";
import classes from "./Message.module.css";
import ReactMarkdown from 'react-markdown';
import {Link, withRouter} from "react-router-dom";
import ProfileImage from "../../ProfileImage/ProfileImage";
import {formatDate} from "../../../shared/utility";
import Button from "../../UI/Button/Button"
class Message extends Component{


    render() {
        let messageClasses = [];
        messageClasses.push(classes.Message);
        if(this.props.unread=== true && this.props.senderUserName !== "user1"){
            messageClasses.push(classes.Unread);
        }

        return (
            <div className={messageClasses.join(" ")}>
                <div className={classes.Header}>
                    <div className={classes.Usernames}>
                        <span className={classes.Username}>
                    <Link to={"/user/"+this.props.senderUserName}><span>{this.props.senderUserName}</span></Link>
                </span>
                        <span className={classes.Username}>
                    <Link to={"/user/"+this.props.receiverUsername}><span>{this.props.receiverUsername}</span></Link>
                </span>
                    </div>
                    {this.props.answerMessage ? null :
                        <div className={classes.HeaderSideInfo}>
                            <Button btnType={"Slim"}
                                    clicked={this.props.onAnswerClicked}><span>{"answer"}</span></Button>
                            <span>{formatDate(this.props.sentTime)}</span>
                        </div>
                    }
                </div>
                <div className={classes.Body}>
                    <div className={classes.SideInfo}>
                        <ProfileImage username={this.props.senderUserName}/>
                        <div>{this.props.senderUserName}</div>
                    </div>
                    <div className={classes.MessageInfo}>
                        {this.props.answerMessage?  this.props.children: <ReactMarkdown source={this.props.content} />}
                    </div>
                </div>
            </div>
        )
    }
};

export default withRouter(Message);
