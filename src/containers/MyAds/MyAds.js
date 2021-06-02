import React,{Component} from "react";

import * as actions from "../../store/actions";
import {connect} from "react-redux";
import classes from "../MyAds/MyAds.module.css";
import Input from "../../components/UI/Input/Input";
import {
    convertSearchParamsFromObject,
    convertSearchParamsToObject,
    extractPageNumber,
    updateObject
} from "../../shared/utility";
import AdLabel from "../../components/AdLabel/AdLabel";
import Spinner from "../../components/UI/Spinner/Spinner"
import PageNumbers from "../../components/UI/PageNumbers/PageNumbers";
import {withRouter} from "react-router-dom";
class MyAds extends Component{

    componentDidMount() {
        let queryData = this.createQueryData(this.state.selectors.orderSelector.value,
            this.state.selectors.stateSelector.value);
        this.props.onFetchUserAds(this.props.authenticatedUser,queryData,this.props.token)
    }
    createQueryData=(order,state)=>{
        const queryData = {};
        let pageParam = extractPageNumber(this.props.location.search);
        let sortDataInfos =  order.split("+");
        queryData["sortOrder"] = sortDataInfos[0];
        queryData["sortParam"] = sortDataInfos[1];
        queryData["state"] = state;
        queryData["page"] = pageParam;
        queryData["currency"] = this.props.currency;
        return queryData;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.location.search!==this.props.location.search){
            this.componentDidMount();
        }
        if(prevProps.currency !== this.props.currency) {
            this.componentDidMount();
        }
    }
    state={
        selectors:{
            orderSelector: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "asc+created", displayValue: "Date Asc"},
                        {value: "desc+created", displayValue: "Date Desc"},
                        {value: "asc+price", displayValue: "Price Asc"},
                        {value: "desc+price", displayValue: "Price Desc"},
                        {value: "asc+title", displayValue: "Title Asc"},
                        {value: "desc+title", displayValue: "Title Desc"}
                    ]
                },
                validateMessages: [],
                value: "desc+created",
                validation: {},
                valid: true
            },
            stateSelector: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "ACTIVE", displayValue: "Active"},
                        {value: "ARCHIVED", displayValue: "Archived"},
                        {value: "FROZEN", displayValue: "Frozen"}
                    ]
                },
                validateMessages: [],
                value: "ACTIVE",
                validation: {},
                valid: true
            }
        }

    }
    selectChangedHandler=(event,id)=>{
        const updatedSelector =  updateObject(this.state.selectors[id],{
            value:event.target.value
        });
        const updatedSelectors = updateObject(this.state.selectors,{
            [id]:updatedSelector
        });
        this.setState({selectors:updatedSelectors});
        let queryData;
        if(id==='orderSelector'){
            queryData = this.createQueryData(event.target.value,
                this.state.selectors.stateSelector.value);
        }else{
            queryData = this.createQueryData(  this.state.selectors.orderSelector.value,
                event.target.value);
            queryData["page"]=0;

        }
        this.props.history.push('/myAds')
        this.props.onFetchUserAds(this.props.authenticatedUser,queryData,this.props.token);
    }

    render() {
        let orderSelectors =  <div className={classes.orderSelector}>
            <span>Order by</span>
            <Input
                elementType={this.state.selectors.orderSelector.elementType}
                elementConfig={this.state.selectors.orderSelector.elementConfig}
                value={this.state.selectors.orderSelector.value}
                invalid={true}
                touched={true}
                shouldValidate={false}
                changed={(event)=>this.selectChangedHandler(event,'orderSelector')}
                validateMessages={[]}
            />
            <span>State</span>
            <Input
                elementType={this.state.selectors.stateSelector.elementType}
                elementConfig={this.state.selectors.stateSelector.elementConfig}
                value={this.state.selectors.stateSelector.value}
                invalid={true}
                touched={true}
                shouldValidate={false}
                changed={(event)=>this.selectChangedHandler(event,'stateSelector')}
                validateMessages={[]}
            />
        </div>;
        let ads = <Spinner/>;
        if(this.props.ads !== null){
            ads = this.props.ads.content.map(ad=>{

                return (
                    <div className={classes.AdLabel}>
                        <AdLabel title={ad.title}
                                 mainImageSrc={ad.imagePaths.length !== 0 ? ad.imagePaths[0]: null}
                                 price={ad.price}
                                 key={ad.id}
                                 id={ad.id}
                                 brand={ad.brand}
                                 type={ad.type}
                                 created={ad.created}
                                 state={ad.state}
                                 currency={ad.currency}
                                 condition={ad.condition}
                                 productData={ad.basicAdDetails}
                                 newWindow
                        />
                    </div>
                )
            })
        }
        if(ads === null){
            ads = <p>No data found</p>;
            orderSelectors = null;
        }
        return (
            <div className={classes.MyAds}>
                {orderSelectors}
                <div className={classes.AdLabels}>
                    <div className={classes.NavBar}>
                        {this.props.ads!=null ?
                            <PageNumbers pageNumber={this.props.ads.pageable.pageNumber+1}
                                         allPageNumber={this.props.ads.totalPages}
                                         range={5}
                                         link={`/myAds/?page=`}/> : null
                        }
                    </div>
                    <div className={classes.Ads}>
                        {this.props.loading? <Spinner/> : ads}
                    </div>
                </div>


            </div>
        );
    }
}
const mapStateToProps =  state => {
    return {
        ads:state.user.ads,
        loading:state.user.loading,
        authenticatedUser:state.auth.username,
        token:state.auth.token,
        currency:state.currency.currency
    };
};
const mapDispatchProps = dispatch=>{
    return{
        onFetchUserAds:  (username,queryData,token)=>dispatch(actions.fetchUserAds(username,queryData,token)),
    };
};
export default connect(mapStateToProps,mapDispatchProps)(withRouter(MyAds));
