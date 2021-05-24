import React,{Component} from "react";
import Categories from "../../components/Categories/Categories";
import SearchForm from "./SearchForm/SearchForm";
import AdLabels from "../AdLabels/AdLabels";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {convertSearchParamsFromObject, convertSearchParamsToObject} from "../../shared/utility";
import * as actions from "../../store/actions";

class Searcher extends Component{

    state={
        clickedCategory:"Car"
    }

    categoryClickedHandler = (event)=>{
        this.setState({clickedCategory:event.target.alt});
        this.props.onFetchBrands(event.target.alt,this.props.updateBrandOptionsCallBack,"brand");
        this.props.onFetchTypes("brand",event.target.alt,this.props.updateTypeOptionsCallBack,"type");
    }
    componentDidMount() {
        let queryData =  convertSearchParamsToObject(this.props.location.search);
        this.setState({clickedCategory:queryData["category"] !== undefined ? queryData["category"]: "Car"});
    }

    render() {
        return (
            <div>
                <Categories clicked={this.categoryClickedHandler} selected={this.state.clickedCategory}/>
                <SearchForm selectedCategory={this.state.clickedCategory} />
                <Route path={"/advertisements"} exact component={AdLabels}/>
            </div>
        );
    }
}
const mapStateToProps =  state => {
    return {
        fetchedUrl:state.adSearcher.fetchedUrl,
        updateBrandOptionsCallBack:state.adSearcher.updateBrandOptionsCallBack,
        updateTypeOptionsCallBack:state.adSearcher.updateTypeOptionsCallBack
    };
};
const mapDispatchProps = dispatch=>{
    return{
        onFetchBrands:  (categoryName,callBack,inputId)=>dispatch(actions.fetchBrands(categoryName,callBack,inputId)),
        onFetchTypes:  (brandName,category,callBack,inputId)=>dispatch(actions.fetchTypes(brandName,category,callBack,inputId))
    };
};
export default connect(mapStateToProps,mapDispatchProps)(Searcher);
