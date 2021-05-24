import React, {Component} from "react";
import classes from "./MessageSender.module.css";
import ProfileImage from "../../ProfileImage/ProfileImage";
import Button from "../../UI/Button/Button"
import Modal from "../../UI/Modal/Modal";
import Spinner from "../../UI/Spinner/Spinner";
import MessageInput from "../Message/MessageInput/MessageInput";
import * as actions from "../../../store/actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";


class MessageSender extends Component{

    state={
        modalShow:false
    }

    onSendClickedHandler=(text)=>{
        this.setState({modalShow:true});

        let payload = {
            content: text,
            receiverUsername: this.props.match.params.username,
            senderUserName:this.props.authUsername
        };
        this.props.onSendMessage(payload,this.props.token);
    }
    onCancelClickedHandler=()=>{
        this.props.history.goBack();
    }
    afterMessageSentClicked=()=>{
        this.setState({modalShow:false});
        this.onCancelClickedHandler();
    }

    render() {
        let createResultMessage = <Spinner/>;
        if(this.props.loading === false && this.props.error === null){
            createResultMessage = <p>Message sent</p>;
        }else if(this.props.error){
            createResultMessage = <p>{this.props.error}</p>;
        }

        return (
            <div className={classes.MessageSender}>
                <div className={classes.Header}>
                    <span className={classes.Title}>Send private message to <span className={classes.Username}>
                        <Link to={"/user/"+ this.props.match.params.username}><span>
                            { this.props.match.params.username}</span></Link></span></span>
                    <ProfileImage username={this.props.match.params.username}/>
                </div>
                <MessageInput
                    onSendClicked={this.onSendClickedHandler}
                    onCancelClicked={this.onCancelClickedHandler}
                    textEditor
                    textAreaWidth={"46rem"}
                />
                <Modal show={this.state.modalShow}>{createResultMessage} <Button btnType={this.props.error ? "Danger" : "Success"}
                                                                                 clicked={this.afterMessageSentClicked}>OK</Button></Modal>
            </div>
        )
    }
};

const mapStateToProps =  state => {
    return {
        loading:state.message.sendMessageLoading,
        error:state.message.sendMessageError,
        authUsername:state.auth.username,
        token:state.auth.token
    };
};
const mapDispatchProps = dispatch=>{
    return{
        onSendMessage: (payload,token)=>dispatch(actions.sendMessage(payload,token))
    };
};
export default connect(mapStateToProps,mapDispatchProps)(MessageSender);
