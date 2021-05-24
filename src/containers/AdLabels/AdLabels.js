import React,{Component} from "react";
import AdLabel from "../../components/AdLabel/AdLabel";
import classes from "./AdLabels.module.css";
import Input from "../../components/UI/Input/Input";
import {convertSearchParamsFromObject, convertSearchParamsToObject, updateObject} from "../../shared/utility";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {withRouter} from "react-router-dom";
import Modal from "../../components/UI/Modal/Modal";

class AdLabels extends Component{

    state={

        orderSelector: {
            elementType: "select",
            elementConfig: {
                options: [
                    {value: "asc+created", displayValue: "Date Asc"},
                    {value: "desc+created", displayValue: "Date Desc"},
                    {value: "asc+price", displayValue: "Price Asc"},
                    {value: "desc+price", displayValue: "Price Desc"},
                    {value: "asc+year", displayValue: "Year Asc"},
                    {value: "desc+year", displayValue: "Year Desc"},
                    {value: "asc+km", displayValue: "Km Asc"},
                    {value: "desc+km", displayValue: "Km Desc"},
                ]
            },
            validateMessages: [],
            value: "desc+created",
            validation: {},
            valid: true
        },
    }

    componentDidMount() {
        let queryData = convertSearchParamsToObject(this.props.location.search);
        let orderSelectorValue = "desc+created";
        if(queryData["sortParam"] !== undefined && queryData["sortOrder"] !== undefined){
            orderSelectorValue = `${ queryData["sortOrder"]}+${queryData["sortParam"]}`
        }
        let updatedOrderSelector = updateObject(this.state.orderSelector,{
            value:orderSelectorValue
        });
        this.setState({orderSelector:updatedOrderSelector});
    }
    selectChangedHandler=(event)=>{
       const updatedSelector =  updateObject(this.state.orderSelector,{
            value:event.target.value
        });
        this.setState({orderSelector:updatedSelector});
        const queryData = {...this.props.queryData};
        const sortDataInfos =  event.target.value.split("+");
        queryData["sortOrder"] = sortDataInfos[0];
        queryData["sortParam"] = sortDataInfos[1];
        queryData["page"] = 0;
        this.props.history.push("advertisements?"+convertSearchParamsFromObject(queryData))
        this.props.onInitAds();
        this.props.onFetchAds(queryData);

    }
    loadMoreButtonHandler=()=>{
        if(this.props.hasNextPage){
            const queryData = {...this.props.queryData};
            queryData["page"] = this.props.pageNumber +1;

            this.props.history.push("advertisements?"+convertSearchParamsFromObject(queryData))
            this.props.onFetchAds(queryData);
        }
    }
    adLabelSelectHandler(id){
        this.props.history.push("advertisement/"+id);
    }

    render() {
        let orderSelector = (
            <div className={classes.orderSelector}>
                <span>Order by</span>
                <Input
                    elementType={this.state.orderSelector.elementType}
                    elementConfig={this.state.orderSelector.elementConfig}
                    value={this.state.orderSelector.value}
                    invalid={true}
                    touched={true}
                    shouldValidate={false}
                    changed={(event)=>this.selectChangedHandler(event)}
                    validateMessages={[]}
                />
            </div>
        );
        let ads = null;
        if(this.props.ads !== undefined){
             ads = this.props.ads.map(ad=>{

                return (
                    <AdLabel title={ad.title}
                        mainImageSrc={ad.imagePaths.length !== 0 ? ad.imagePaths[0]: null}
                        price={ad.price}
                             clicked={()=>this.adLabelSelectHandler(ad.id)}
                             key={ad.id}
                             id={ad.id}
                        brand={ad.brand}
                        type={ad.type}
                        created={ad.created}
                        state={ad.state}
                        condition={ad.condition}
                        productData={ad.basicAdDetails}
                    />
                )
            })
        }
        if(ads === null || ads.length === 0){
            ads = <p>No data found</p>;
            orderSelector = null;
        }
        return (
            <div className={classes.Ads}>
                {orderSelector}
                {ads}
                <div className={classes.LoadBtn}>
                    <Button btnType={"Success"} disabled={!this.props.hasNextPage} clicked={this.loadMoreButtonHandler}>Load more</Button>
                </div>
            </div>
        );
    }
}
const mapStateToProps =  state => {
    return {
        loading:state.adSearcher.loading,
        ads:state.adSearcher.ads,
        hasNextPage:state.adSearcher.nextPage,
        pageNumber:state.adSearcher.pageNumber,
        fetchedUrl:state.adSearcher.fetchedUrl,
        queryData: state.adSearcher.queryData
    };
};
const mapDispatchProps = dispatch=>{
    return{
        onFetchAds:  (queryData)=>dispatch(actions.fetchAds(queryData)),
        onInitAds:  ()=>dispatch(actions.initialFetchedAds())
    };
};
export default connect(mapStateToProps,mapDispatchProps)(withRouter(AdLabels));
