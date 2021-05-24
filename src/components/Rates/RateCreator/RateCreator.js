import React, {Component} from "react";


import classes from "./RateCreator.module.css";
import MessageInput from "../../Messages/Message/MessageInput/MessageInput";
import Modal from "../../UI/Modal/Modal";
import Spinner from "../../UI/Spinner/Spinner"
import * as actions from "../../../store/actions";
import {connect} from "react-redux";
import Notification from "../../UI/Modal/Notification/Notification";


class RateCreator extends Component{
    state={
        selectedOption:"POSITIVE",
        modalShow: true,
        sentBtnClicked: false,
    }
    componentDidMount() {
    }
    inputChangedHandler=(event)=>{
        this.setState({selectedOption:event.target.value});
    }
    sentBtnClickedHandler=(text)=>{
        let payload={
            adId: this.props.advertisementID,
            description: text,
            rateState: this.state.selectedOption,
            ratedUsername: this.props.username,
            ratingUsername: this.props.authenticatedUsername
        }
        if(this.props.activationCode){
            payload["activationCode"] = this.props.activationCode;
            this.props.onSendRate(payload,'seller',this.props.token);
        }else{
            this.props.onSendRate(payload,'buyer',this.props.token);
        }

        this.setState({sentBtnClicked:true});
}

    render() {

        let contentToRender = <Modal show={this.props.show}>
            <div className={classes.Header}>Rate <span className={classes.Username}>{this.props.username}</span> as </div>
            <div className={classes.RadioButtons}>
                <input
                    type="radio"
                    value="POSITIVE"
                    checked={this.state.selectedOption==="POSITIVE"}
                    onChange={this.inputChangedHandler}
                />
                <span className={classes.Pos}>Positive</span>
                <input
                    type="radio"
                    value="NEGATIVE"
                    checked={this.state.selectedOption==="NEGATIVE"}
                    onChange={this.inputChangedHandler}
                />
                <span className={classes.Neg}>Negative</span>
            </div>
            <MessageInput textAreaWidth={"450px"}
                          onCancelClicked={this.props.cancelBtnClicked}
                          onSendClicked={this.sentBtnClickedHandler}/>


        </Modal>;
        let message = null;
        if(this.props.activationCode){
            message=  <p>{"Successful rate activation"}</p>
        }else{
             message = <p>{"Your rate request has sent to the seller."}</p>
        }
        if(this.props.error){
            message =  <p>{this.props.error}</p>;
        }
        if(this.state.sentBtnClicked){
            if(this.props.loading){
                contentToRender = <Modal show={this.props.loading}><Spinner/></Modal>
            }else{
                contentToRender = <Notification okBtnCLicked={this.props.notificationBtnClicked ? this.props.notificationBtnClicked : null} error={this.props.error}
                                                message={message}/>
            }
        }
        return (
            <React.Fragment>
                {contentToRender}
            </React.Fragment>

        )
    }
};

const mapStateToProps =  state => {
    return {
        loading:state.user.loading,
        error:state.user.error,
        authenticatedUsername:state.auth.username,
        token:state.auth.token
    };
};
const mapDispatchProps = dispatch=>{
    return{
        onSendRate: (payload,rateStatus,token)=>dispatch(actions.createRate(payload,rateStatus,token))
    };
};
export default connect(mapStateToProps,mapDispatchProps)(RateCreator);

