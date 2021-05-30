import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {updateObject} from "../../../shared/utility";
import Button from "../../../components/UI/Button/Button";
import Message from "../../../components/Messages/Message/Message";
import * as actions from "../../../store/actions";
import {connect} from "react-redux";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";
import MessageInput from "../../../components/Messages/Message/MessageInput/MessageInput";

class MessageWrapper extends Component{


    componentDidMount() {
        this.readMessage(this.props.unread);
    }

    readMessage=(unread)=>{
        if(unread===true && this.props.receiverUsername===this.props.authenticatedUsername){
            let payload = {
                id:this.props.id,
                senderUsername:this.props.senderUserName,
                receiverUsername:this.props.receiverUsername
            }
            this.props.onReadMessage(payload,this.props.token);
        }
    }
    state={
        answerClicked:false,
        modalShow: false
    }
    onAnswerClickedHandler=(event)=>{
        this.setState({answerClicked:true});
    }
    onSendClickedHandler=(text)=>{
        this.setState({modalShow:true});
        let payload = {
            content: text,
            receiverUsername: this.props.match.params.partnerName,
            senderUserName: this.props.authenticatedUsername
        };
        this.props.onSendMessage(payload,this.props.token);
    }
    onCancelClickedHandler=()=>{
        this.setState({answerClicked:false,
            answerInput:updateObject(this.state.answerInput,{
                value:""
            })});
    }
    afterMessageSentClicked=()=>{
        this.setState({modalShow:false});
        this.onCancelClickedHandler();
        this.props.afterMessageSentHandler();
    }

    render() {
        let answerBlock = null;
        if(this.state.answerClicked===true) {
            answerBlock =
                <Message id={0}
                         content={""}
                         unread={false}
                         senderUserName={this.props.authenticatedUsername}
                         receiverUsername={this.props.match.params.partnerName}
                         answerMessage
                         sentTime={""}>
                    <MessageInput
                        onSendClicked={this.onSendClickedHandler}
                        onCancelClicked={this.onCancelClickedHandler}
                        textAreaWidth={"600px"}
                        textEditor
                    />
                </Message>
        }
        let createResultMessage = <Spinner/>;
        if(this.props.loading === false && this.props.error === null){
            createResultMessage = <p>Message sent</p>;
        }else if(this.props.error){
            createResultMessage = <p>{this.props.error}</p>;
        }
        return (
            <React.Fragment>
                <Message id={this.props.id}
                                key={this.props.id}
                                content={this.props.content}
                                unread={this.props.unread}
                                senderUserName={this.props.senderUserName}
                                receiverUsername={this.props.receiverUsername}
                                sentTime={this.props.sentTime}
                                onAnswerClicked={this.onAnswerClickedHandler}/>

                {answerBlock}
                <Modal show={this.state.modalShow}>{createResultMessage} <Button btnType={this.props.error ? "Danger" : "Success"}
                                                                                 clicked={this.afterMessageSentClicked}>OK</Button></Modal>

            </React.Fragment>
        )
    }
};
const mapStateToProps =  state => {
    return {
        loading:state.message.sendMessageLoading,
        error:state.message.sendMessageError,
        token:state.auth.token,
        authenticatedUsername:state.auth.username
    };
};
const mapDispatchProps = dispatch=>{
    return{
        onSendMessage: (payload,token)=>dispatch(actions.sendMessage(payload,token)),
        onReadMessage: (payload,token)=>dispatch(actions.readMessage(payload,token))
    };
};
export default connect(mapStateToProps,mapDispatchProps)(withRouter(MessageWrapper));
