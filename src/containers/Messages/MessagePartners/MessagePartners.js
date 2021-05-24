import React,{Component} from "react";
import classes from "./MessagePartners.module.css";
import PageNumbers from "../../../components/UI/PageNumbers/PageNumbers";
import MessagePartner from "../../../components/Messages/MessagePartner/MessagePartner";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {convertSearchParamsToObject, isEqual} from "../../../shared/utility";
import * as actions from "../../../store/actions";
import {connect} from "react-redux";

class MessagePartners extends Component{

    componentDidMount(){
        let params = convertSearchParamsToObject(this.props.location.search);
        let pageParam = 0;
        if(!isEqual(params,{})){
            if(params["page"]){
                pageParam = params["page"]-1;
            }
        }
        this.props.onfetchMessagePartners(this.props.authenticatedUser,pageParam,this.props.token);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.location.search!==this.props.location.search){
            this.componentDidMount();
        }
    }
    onPartnerCLicked = (username)=>{
        this.props.history.push("/messages/"+username);
    }

    render() {
        let partners = <Spinner/>
        if(this.props.messagePartners!==null && this.props.error === null){
            partners = <React.Fragment>
                {this.props.messagePartners.content.map(partner=>{
                    return (
                        <MessagePartner
                            key={partner.username}
                            username={partner.partnerUsername}
                            date={partner.lastSentTime}
                            newMessage={partner.thereNewMessage}
                            clicked={(username)=>this.onPartnerCLicked(partner.partnerUsername)}/>
                    )
                })
                }
            </React.Fragment>
        }else if(this.props.error !==null){
            partners = this.props.error;
        }
        return (
            <div className={classes.Messages}>
                <div className={classes.NavBar}>
                    {this.props.messagePartners!=null ?
                        <PageNumbers pageNumber={this.props.messagePartners.pageable.pageNumber+1}
                                     allPageNumber={this.props.messagePartners.totalPages}
                                     range={5}
                                     link={`/messagePartners?page=`}/> : null
                    }
                </div>
                <div className={classes.MessagePartners}>
                    {partners}
                </div>
            </div>
        );
    }
}

const mapStateToProps =  state => {
    return {
        loading:state.message.messagePartnersLoading,
        error:state.message.messagePartnersError,
        messagePartners: state.message.messagePartners,
        authenticatedUser:state.auth.username,
        token:state.auth.token
    };
};
const mapDispatchProps = dispatch=>{
    return{
        onfetchMessagePartners: (username,page,token)=>dispatch(actions.fetchMessagePartners(username,page,token))
    };
};
export default connect(mapStateToProps,mapDispatchProps)(MessagePartners);

