import React, {Component} from "react";
import classes from "./UserRates.module.css";
import PageNumbers from "../../components/UI/PageNumbers/PageNumbers";
import RateLabel from "../../components/Rates/RateLabel/RateLabel";
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import {convertSearchParamsToObject, isEqual} from "../../shared/utility";
import Spinner from "../../components/UI/Spinner/Spinner";
import FullRate from "../../components/Rates/FullRate/FullRate";
import Modal from "../../components/UI/Modal/Modal";
import RateCreator from "../../components/Rates/RateCreator/RateCreator";

class UserRates extends Component{
    state={
        fullRateShow:false,
        ratingUsername:null,
        adId:null,
        rateCreatorShow: false,
        ratedUsername: null,
        activationCode: null,
        activationWasSent:false
    }
    componentDidMount() {
        let params = convertSearchParamsToObject(this.props.location.search);
        let pageParam = 0;
        if(!isEqual(params,{})){
            if(params["page"]){
                pageParam = params["page"]-1;
            }
        }
        this.props.onFetchRateLabels(this.props.authenticatedUser,pageParam,this.props.token);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.location.search!==this.props.location.search){
            this.componentDidMount();
        }
    }
    onActivationWasSent = ()=>{
        window.location.reload();
    }

    onAcceptClickedHandler=(activationCode,ratedUsername,adID)=>{
        this.setState({rateCreatorShow:true,ratedUsername:ratedUsername,activationCode: activationCode,adId:adID});
    }
    onViewButtonCLickedHandler=(ratingUsername,adID)=>{
        this.setState({fullRateShow:true,ratingUsername:ratingUsername});
        this.props.onFetchFullRate(ratingUsername,this.props.authenticatedUser,adID,this.props.token);
    }
    onFullRateModalBtnClicked=()=>{
        this.setState({fullRateShow:false});
    }
    onRateCreatorCancelClicked=()=>{
        this.setState({rateCreatorShow:false});
    }
    render() {
        let rateLabels = <Spinner/>;
        if(this.props.rates!==null && this.props.error ===null){
             rateLabels = <React.Fragment>
                {this.props.rates.content.map(rate=>{
                    return (

                        <RateLabel adData={rate.advertisement}
                                   key={rate.advertisement.id}
                                   adId={rate.advertisement.id}
                                   imageId={rate.ratingUserProfileImageId}
                                   username={rate.ratingUsername}
                                   ratedState={rate.ratedState}
                                   status={rate.status}
                                   viewButtonCLicked={(ratingUsername,adID)=>this.onViewButtonCLickedHandler(rate.ratingUsername,rate.advertisement.id)}
                                   acceptClicked={this.onAcceptClickedHandler}
                                   code={rate.activationCode}
                                   created={rate.created}/>
                    )
                })
                }
            </React.Fragment>
        }
        let fullRate= <Spinner/>;
        if(this.props.fullRate!==null && this.props.error ===null){
            let buyerRate = this.props.fullRate.slice().filter(rate=>rate.ratedState==="SELLER")[0];
            let sellerRate = this.props.fullRate.slice().filter(rate=>rate.ratedState==="BUYER")[0];
            fullRate = <FullRate
                clicked={this.onFullRateModalBtnClicked}
                            adId={buyerRate.advertisement.id}
                            adTitle={buyerRate.advertisement.title}
                            sellerUsername={buyerRate.ratedUsername}
                            buyerUsername={buyerRate.ratingUsername}
                            sellerRateState={buyerRate.rateState}
                            sellerDescription={buyerRate.description}
                            buyerRateState={sellerRate.rateState}
                            buyerDescription={sellerRate.description}
                        />
        }


        return (
            <div className={classes.Rates}>
                <div className={classes.PageNumbers}>
                    {this.props.rates!=null ?
                        <PageNumbers pageNumber={this.props.rates.pageable.pageNumber+1}
                                     allPageNumber={this.props.rates.totalPages}
                                     range={5}
                                     link={`/rates/?page=`}/> : null
                    }
                </div>
                <div className={classes.Labels}>
                    {rateLabels}
                </div>
                <Modal show={this.state.fullRateShow}>{fullRate}</Modal>
               <RateCreator show={this.state.rateCreatorShow}
                            username={this.state.ratedUsername}
                            cancelBtnClicked={this.onRateCreatorCancelClicked}
                           advertisementID={this.state.adId}
                            activationCode={this.state.activationCode}
                            notificationBtnClicked={this.onActivationWasSent}/>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        loading:state.user.loading,
        error:state.user.error,
        rates:state.user.rateLabels,
        fullRate:state.user.fullRate,
        authenticatedUser:state.auth.username,
        token:state.auth.token
    };
};
const mapDispatchProps = dispatch=>{
    return{
        onFetchRateLabels:  (username,page,token)=>dispatch(actions.fetchRateLabels(username,page,token)),
        onFetchFullRate:  (username1,username2,adId,token)=>dispatch(actions.fetchFullRate(username1,username2,adId,token))
    };
};
export default connect(mapStateToProps,mapDispatchProps)(UserRates);

