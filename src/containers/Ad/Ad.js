import React,{Component} from "react";
import AdDetails from "../../components/Ad/AdDetails/AdDetails";
import AdHeader from "../../components/Ad/AdTitle/AdHeader";
import classes from "./Ad.module.css"
import Spinner from "../../components/UI/Spinner/Spinner"
import {fetchUserRateCount, formatDate} from "../../shared/utility";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import Modal from "../../components/UI/Modal/Modal";
import RateCreator from "../../components/Rates/RateCreator/RateCreator";
import axios from "../../axios-ads";
import Login from "../Login/Login";
class Ad extends Component{

    componentDidMount(){
        if(this.props.match.params.id){
            this.props.onFetchAd(this.props.match.params.id);
        }
}

    state={
        userRate:null,
        rateCreatorShow:false,
    }

    createImageLinks=(imagePaths)=>{
      let imageLinks = [];
         imagePaths.forEach(path=>{
             imageLinks.push({original:"http://localhost:8080/api/img/"+path,
                 thumbnail: "http://localhost:8080/api/img/"+path});
        });
         return imageLinks;
    }
    onEditBtnClickedHandler=(event)=>{
       this.props.history.push("/post/ad/"+this.props.match.params.id)
    }
     privateMessageClickedHandler=()=>{
        this.props.history.push("/message/"+this.props.adData.creator)
    }
    rateBtnClickedHandler=()=>{
        this.setState({rateCreatorShow:true});
    }
    cancelBtnClickedHandler=()=>{
        this.setState({rateCreatorShow:false});
    }
    onStateSelectHandler=(state)=>{
       this.props.onChangeAdState(this.props.match.params.id,state,this.props.token)
    }

    render() {
        let adDetails = <Spinner/>;
        let adHeader = <Spinner/>;
        if(this.props.adDataError!==null){
            adHeader= null;
        }
        if(this.props.adDataError!==null){
            adDetails= null;
        }
        if(this.props.adData!==null){
            adHeader =  <AdHeader title={this.props.adData.title}
                                  price={this.props.adData.price}
                                  state={this.props.adData.state}
                                  created={formatDate(this.props.adData.created)}
                                  creator={this.props.adData.creator}
                                  category={this.props.adData.category}
                                  editBtnClicked={this.onEditBtnClickedHandler}
                                  privateMessageClicked={this.privateMessageClickedHandler}
                                  rateBtnClicked={this.rateBtnClickedHandler}
                                  selectStateClicked={this.onStateSelectHandler}
                    />
        }
        if(this.props.adData!==null && this.props.adDetails!==null){
            adDetails =   <AdDetails
                adDetailsData={this.props.adDetails}
                images={this.createImageLinks(this.props.adData.imagePaths)}
                condition={this.props.adData.condition}
                type={this.props.adData.type}
                brand={this.props.adData.brand}/>;
        }
        return (
            <div className={classes.Ad}>
                <p>{this.props.adDataError}</p>
                <p>{this.props.adDetailsError}</p>
                {adHeader}
                {adDetails}
                {this.props.token!=null ?     <RateCreator show = {this.state.rateCreatorShow}
                                                           cancelBtnClicked={this.cancelBtnClickedHandler}
                                                           username={this.props.adData !== null ? this.props.adData.creator : ''}
                                                           advertisementID={this.props.match.params.id}/>
                : <Login show={this.state.rateCreatorShow} close={this.cancelBtnClickedHandler}/>}

            </div>
        );
    }
}

const mapStateToProps =  state => {
    return {
        loading:state.ad.loading,
        adDetails:state.ad.adDetails,
        adData:state.ad.adData,
        adDetailsError:state.ad.fetchAdDetailsError,
        adDataError:state.ad.fetchAdDataError,
        token:state.auth.token
    };
};
const mapDispatchProps = dispatch=>{
    return{
        onFetchAd: (id)=>dispatch(actions.fetchAd(id)),
        onChangeAdState: (id,state,token)=>dispatch(actions.changeStateAd(id,state,token)),
    };
};
export default connect(mapStateToProps,mapDispatchProps)(Ad);
