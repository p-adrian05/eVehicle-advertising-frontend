import React,{Component} from "react";
import classes from "./Messages.module.css";
import PageNumbers from "../../components/UI/PageNumbers/PageNumbers";
import {convertSearchParamsToObject, isEqual} from "../../shared/utility";
import Spinner from "../../components/UI/Spinner/Spinner";
import MessageWrapper from "./MessageWrapper/MessageWrapper";
import {withRouter} from "react-router-dom";
import * as actions from "../../store/actions";
import {connect} from "react-redux";


class Messages extends Component{

    componentDidMount(){
        let params = convertSearchParamsToObject(this.props.location.search);
        let pageParam = 0;
        if(!isEqual(params,{})){
            if(params["page"]){
                pageParam = params["page"]-1;
            }
        }
        this.props.onfetchMessages(this.props.authenticatedUser,this.props.match.params.partnerName,pageParam,this.props.token);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.location.search!==this.props.location.search){
            this.componentDidMount();
        }
    }

    afterMessageSentHandler=()=> {
            this.componentDidMount();
    }
    render() {
        let messages = <Spinner/>
        if(this.props.messages!==null && this.props.error ===null){
            messages = <React.Fragment>
                {this.props.messages.content.map(message=>{
                    return (
                        <MessageWrapper id={message.id}
                                 key={message.id}
                                 content={message.content}
                                 unread={message.unread}
                                 senderUserName={message.senderUserName}
                                 receiverUsername={message.receiverUsername}
                                 sentTime={message.sentTime}
                                afterMessageSentHandler={this.afterMessageSentHandler}/>
                    )
                })
                }
            </React.Fragment>
        }else if(this.props.error !==null){
            messages = this.props.error;
        }

        return (
            <div  className={classes.Messages}>
                <div className={classes.NavBar}>
                    {this.props.messages!=null ?
                        <PageNumbers pageNumber={this.props.messages.pageable.pageNumber+1}
                                     allPageNumber={this.props.messages.totalPages}
                                     range={5}
                                     link={`/messages/${this.props.match.params.partnerName}?page=`}/> : null
                    }
                </div>
                <div className={classes.MessagesBlock}>
                    {messages}
                </div>
            </div>
        );
    }
}

const mapStateToProps =  state => {
    return {
        loading:state.message.messagesLoading,
        error:state.message.messagesError,
        messages: state.message.messages,
        authenticatedUser:state.auth.username,
        token:state.auth.token

    };
};
const mapDispatchProps = dispatch=>{
    return{
        onfetchMessages: (authUser,partnerName,page,token)=>dispatch(actions.fetchMessages(authUser,partnerName,page,token))
    };
};
export default connect(mapStateToProps,mapDispatchProps)(withRouter(Messages));
