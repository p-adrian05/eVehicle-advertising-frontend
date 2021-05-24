import React,{Component} from "react";
import UserData from "../../components/UserData/UserData";
import Rates from "../../components/Rates/Rates";
import classes from "./UserDataPage.module.css"
import axios from "../../axios-ads";
import {
    convertSearchParamsFromObject,
    convertSearchParamsToObject, isEqual,
    updateObject
} from "../../shared/utility";
import Spinner from "../../components/UI/Spinner/Spinner";

class UserDataPage extends Component {

    componentDidMount() {
        if(this.props.match.params.username){
            axios.get("/user/"+this.props.match.params.username)
                .then(res=> {
                    this.setState({userData: res.data});
                }).catch(err=>{
                this.setState({userDataError: err.message});
            });
            this.fetchUserRates();
        }
    }
  componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.username!==this.props.match.params.username){
            this.componentDidMount();
            this.setState({detailsButtonClicked: false});
        }
      if(!isEqual(convertSearchParamsToObject(prevProps.location.search),convertSearchParamsToObject(this.props.location.search))){
          if(!isEqual(convertSearchParamsToObject(this.props.location.search),{}) ){
              this.fetchUserRates();
          }
      }
  }


    fetchUserRates=()=>{
        let params = convertSearchParamsToObject(this.props.location.search);
        if(params.rateAs ===undefined){
            params = {
                ...params,
                rateAs:"SELLER"
            }
        }
        if(params.page === undefined){
            params = {
                ...params,
                page:1
            }
        }
        let paramsSearch = convertSearchParamsFromObject({
            ratedUsername:this.props.match.params.username,
            ratedState:params.rateAs.toUpperCase(),
            page:params.page-1,
            size: 2
        });
        this.setState({userRatesLoading:true})
        axios.get(`rates?${paramsSearch}`)
            .then(res=>{
                this.setState({rates:res.data.content,
                    allPageNumber:res.data.totalPages,
                    pageNumber:res.data.pageable.pageNumber,
                    userRatesLoading:false
                });
            }).catch(err=>{
            this.setState({rates:null,
                userRatesLoading:false
            });
        });
    }
    state={
        userData:null,
        rates:[],
        userRatesLoading:false,
        allPageNumber:0,
        pageNumber:0,
        detailsButtonClicked:false,
    }
    userDetailsClickHandler=(event)=>{
        if(this.props.match.params.username){
            axios.get("/user/"+this.props.match.params.username+"/details")
                .then(res=> {
                   let newUserData=  updateObject(this.state.userData,{
                        ...res.data
                    })
                    this.setState({userData: newUserData});
                    this.setState({detailsButtonClicked: true});
                }).catch(err=>{
                this.setState({adDetailsError: err.message});
            });
        }
    }
    privateMessageClickedHandler=()=>{
        this.props.history.push("/message/"+this.props.match.params.username)
    }
    render() {
        let userData = <Spinner/>
        if(this.state.userData!==null){
            userData =  <UserData data={this.state.userData} detailsClicked={this.userDetailsClickHandler}
                                  detailsButtonClicked={this.state.detailsButtonClicked}
                                  privateMessageClicked={this.privateMessageClickedHandler}/>;
        }
        if(this.state.userDataError!==undefined){
            userData= <div>{this.state.userDataError}</div>
        }
        return(
            <div className={classes.UserDataPage}>
                {userData}
                <Rates
                    pageNumber={this.state.pageNumber+1}
                    allPageNumber={this.state.allPageNumber}
                    range={5}
                ratesData={this.state.rates}
                loading={this.state.userRatesLoading}/>
            </div>
        )
    }
}

export default UserDataPage;
