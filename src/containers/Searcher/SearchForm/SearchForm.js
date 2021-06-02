import React,{Component} from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import SearchFromToInput from "../SearchFromToInput/SearchFromToInput";
import Input from "../../../components/UI/Input/Input";
import {convertSearchParamsFromObject, convertSearchParamsToObject, updateObject} from "../../../shared/utility";
import classes from "./SearchForm.module.css";
import {connect} from "react-redux";
import * as actions from "../../../store/actions/index";
import {withRouter} from "react-router-dom";


class Searcher extends Component{

    componentDidMount() {
        this.props.onInitAds();
        let queryData =  convertSearchParamsToObject(this.props.location.search);
        queryData["currency"] = this.props.currency;
        this.props.onFetchAds(queryData);
        let category = queryData["category"] !== undefined ? queryData["category"] : "Car";
        let brand = queryData["brand"] !== undefined ? queryData["brand"] : null;
        this.props.onFetchBrands(queryData["category"] !== undefined ? queryData["category"] : "Car",this.updateSelectOptions,"brand");
        this.props.onFetchTypes(brand,category,this.updateSelectOptions,"type");
        this.initState(queryData);
    }
    initState(queryData){
        let updatedSearchSelects = this.state.searchSelects;
        let updatedfromToInputs = this.state.fromToInputs;
        let searchSelectsKeys = [];
        let fromToInputsKeys = [];
        for(let id in this.state.fromToInputs){
            for(let id2 in this.state.fromToInputs[id].config){
                fromToInputsKeys.push(id2);
            }
        }
        for(let key in this.state.searchSelects){
            searchSelectsKeys.push(key);
        }
        for(let key in queryData){
            if(fromToInputsKeys.includes(key)){
                let id1 = key.substring(3);
                id1 = key.substring(3).charAt(0).toLowerCase()+id1.substring(1);
                updatedfromToInputs = this.updateInputValueState(queryData[key],[id1,key],updatedfromToInputs);
            }else if(searchSelectsKeys.includes(key)){
                updatedSearchSelects =  this.updateSelectedValueState(queryData[key],key,updatedSearchSelects);
            }
        }
        this.setState({fromToInputs: updatedfromToInputs});
        this.setState({searchSelects: updatedSearchSelects});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.selectedCategory!==prevProps.selectedCategory){
           let updatedSelectedBrandValueState = this.updateSelectedValueState("","brand",this.state.searchSelects);
           let updatedSelectedTypeValueState = this.updateSelectedValueState("","type",updatedSelectedBrandValueState);
            this.setState({searchSelects: updatedSelectedTypeValueState});
        }

    }

    state={
        searchSelects: {
            brand: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "", displayValue: "brand"},
                    ]
                },
                validateMessages: [],
                value: "",
                validation: {},
                valid: true
            },
            type: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "", displayValue: "type"}
                    ]
                },
                validateMessages: [],
                value: "",
                validation: {},
                valid: true
            },
            seatNumber: {
                title: "Seat number",
                elementId: "seatNumber",
                elementType: "input",
                elementConfig: {
                    type: "number",
                    placeholder: "Enter seat number",
                    min: 0,
                    max:99
                },
                value: "",
                validation: {
                    min: 0,
                    max:99,
                    required: false
                },
                validateMessages: [],
                valid: true,
                touched: false
            },

            drive: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "", displayValue: "drive"},
                        {value: "AWD", displayValue: "AWD"},
                        {value: "RWD", displayValue: "RWD"},
                    ]
                },
                validateMessages: [],
                value: "",
                validation: {},
                valid: true
            },
            condition: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "", displayValue: "condition"},
                        {value: "NEW", displayValue: "new"},
                        {value: "USED", displayValue: "used"},
                    ],
                    placeholder: "sd"
                },
                validateMessages: [],
                value: "",
                validation: {},
                valid: true
            }
        },
       fromToInputs: {
            year:{
                title:"Enter year",
                config: {
                    minYear: {
                        elementId: "minYear",
                        elementType: "input",
                        elementConfig: {
                            type: "number",
                            min: 2000,
                            placeholder: "Min. year",
                            max: new Date().getFullYear()
                        },
                        value: "",
                        validation: {},
                        validateMessages: [],
                        valid: true,
                        touched: false
                    },
                    maxYear: {
                        elementId: "maxYear",
                        elementType: "input",
                        elementConfig: {
                            type: "number",
                            placeholder: "Max. year",
                            min: 2000,
                            max: new Date().getFullYear()
                        },
                        value: "",
                        validation: {
                            required: false,

                        },
                        validateMessages: [],
                        valid: true,
                        touched: false
                    }
                }
            },
           km:{
               title:"Enter Km",
               config: {
                   minKm: {
                       elementId: "minKm",
                       elementType: "input",
                       elementConfig: {
                           type: "number",
                           placeholder: "Min. km",
                           min: 0,
                           max: 2000000
                       },
                       value: "",
                       validation: {
                           required: false
                       },
                       validateMessages: [],
                       valid: true,
                       touched: false
                   },
                   maxKm: {
                       elementId: "maxKm",
                       elementType: "input",
                       elementConfig: {
                           type: "number",
                           placeholder: "Max. km",
                           min: 1,
                           max: 2000000
                       },
                       value: "",
                       validation: {
                           required: false
                       },
                       validateMessages: [],
                       valid: true,
                       touched: false
                   }
               }
           },
           price:{
               title:"Enter price",
               config: {
                   minPrice: {
                       elementId: "minPrice",
                       elementType: "input",
                       elementConfig: {
                           type: "number",
                           placeholder: "Min. price",
                           min: 0
                       },
                       value: "",
                       validation: {
                           required: false
                       },
                       validateMessages: [],
                       valid: true,
                       touched: false
                   },
                   maxPrice: {
                       elementId: "maxPrice",
                       elementType: "input",
                       elementConfig: {
                           type: "number",
                           placeholder: "Max. price",
                           min: 0
                       },
                       value: "",
                       validation: {
                           required: false,
                       },
                       validateMessages: [],
                       valid: true,
                       touched: false
                   }
               }
           },
           batterySize:{
               title:"Enter battery size",
               config: {
                   minBatterySize: {
                       elementId: "minBatterySize",
                       elementType: "input",
                       elementConfig: {
                           type: "number",
                           placeholder: "Min. battery size",
                           min: 10,
                           max: 1000
                       },
                       value: "",
                       validation: {
                           required: false
                       },
                       validateMessages: [],
                       valid: true,
                       touched: false
                   },
                   maxBatterySize: {
                       elementId: "maxBatterySize",
                       elementType: "input",
                       elementConfig: {
                           type: "number",
                           placeholder: "Max. battery size",
                           min: 10,
                           max: 1000
                       },
                       value: "",
                       validation: {
                           required: false,
                       },
                       validateMessages: [],
                       valid: true,
                       touched: false
                   }
               }
           },
           performance:{
               title:"Enter performance in Kw",
               config: {
                   minPerformance: {
                       elementId: "minPerformance",
                       elementType: "input",
                       elementConfig: {
                           type: "number",
                           placeholder: "Min. performance",
                           min: 1,
                       },
                       value: "",
                       validation: {
                           required: false
                       },
                       validateMessages: [],
                       valid: true,
                       touched: false
                   },
                   maxPerformance: {
                       elementId: "maxPerformance",
                       elementType: "input",
                       elementConfig: {
                           type: "number",
                           placeholder: "Max. performance",
                           min: 1
                       },
                       value: "",
                       validation: {
                           required: false
                       },
                       validateMessages: [],
                       valid: true,
                       touched: false
                   }
               }
           },
           chargeSpeed:{
               title:"Enter charge speed in Kw",
               config: {
                   minChargeSpeed: {
                       elementId: "minChargeSpeed",
                       elementType: "input",
                       elementConfig: {
                           type: "number",
                           placeholder: "Min. charge speed",
                           min: 1,
                       },
                       value: "",
                       validation: {
                           required: false
                       },
                       validateMessages: [],
                       valid: true,
                       touched: false
                   },
                   maxChargeSpeed: {
                       elementId: "maxChargeSpeed",
                       elementType: "input",
                       elementConfig: {
                           type: "number",
                           placeholder: "Max. charge speed",
                           min: 1
                       },
                       value: "",
                       validation: {
                           required: false
                       },
                       validateMessages: [],
                       valid: true,
                       touched: false
                   }
               }
           },
        },
        formIsValid:false,
        loading:false
    }

    updateSelectOptions=(optionsData,selectIdentifier)=>{
        let options = [{
            value:"",
            displayValue:selectIdentifier
        }
        ];
        optionsData.forEach(option=>{
            options.push({
                value:option,
                displayValue:option
            });
        });
        const updatedOptions = updateObject(this.state.searchSelects[selectIdentifier].elementConfig,{
          options: options
        });
        const updatedElement = updateObject(this.state.searchSelects[selectIdentifier],{
            elementConfig: updatedOptions
        });
        const updatedSelectors = updateObject(this.state.searchSelects,{
            [selectIdentifier]: updatedElement
        });
        this.setState({searchSelects:updatedSelectors});
    }

    selectChangedHandler=(event,inputIdentifier)=>{
        this.setState({searchSelects: this.updateSelectedValueState(event.target.value,inputIdentifier,this.state.searchSelects)});
        if(event.target.id === "brand"){
            this.props.onFetchTypes(event.target.value,this.props.selectedCategory,this.updateSelectOptions,"type");
            if(event.target.value === ""){
                setTimeout(()=>this.setState({searchSelects: this.updateSelectedValueState("","type",this.state.searchSelects)}), 300);
            }
        }
    }
    updateSelectedValueState=(value,selectIdentifier,toUpdateObject)=>{
        const updatedFormElement = updateObject(this.state.searchSelects[selectIdentifier],{
            value:value,
            touched:true,
        });
        return updateObject(toUpdateObject,{
            [selectIdentifier]:updatedFormElement
        });
    }
    inputChangedHandler=(event,inputIdentifier)=>{
        this.setState({fromToInputs: this.updateInputValueState(event.target.value,inputIdentifier,this.state.fromToInputs)});
    }
    updateInputValueState=(value,inputIdentifier,toUpdateObject)=>{
        const updatedInputElement = updateObject(toUpdateObject[inputIdentifier[0]].config[inputIdentifier[1]],{
            value:value,
            touched:true,
        });
        const updatedInputElementConfig = updateObject(toUpdateObject[inputIdentifier[0]].config,{
            [inputIdentifier[1]]:updatedInputElement
        });
        const updatedInputElements = updateObject(toUpdateObject[inputIdentifier[0]],{
            config:updatedInputElementConfig
        });
        return updateObject(toUpdateObject,{
            [inputIdentifier[0]]:updatedInputElements
        });

    }
    searchHandler=(event)=>{
        event.preventDefault();
        let inputDataObject = this.collectInputDataIntoObject();
        this.props.onInitAds();
        this.props.history.push("advertisements?"+convertSearchParamsFromObject(inputDataObject));
        this.props.onFetchAds(inputDataObject);
    }
    collectInputDataIntoObject=()=>{
        const queryData = {};
        let value = null;
        for(let id in this.state.searchSelects){
            value = this.state.searchSelects[id].value;
            if(value !== "" && value !==null){
                queryData[id] = this.state.searchSelects[id].value;
            }
        }
        for(let id in this.state.fromToInputs){
            for(let id2 in this.state.fromToInputs[id].config){
                value = this.state.fromToInputs[id].config[id2].value;
                if(value !== "" && value !==null){
                    queryData[id2] =  this.state.fromToInputs[id].config[id2].value;
                }
            }
        }
        queryData["category"] = this.props.selectedCategory;
        return queryData;
    }

    render() {
        const searchSelectsArray =[];
        for(let key in this.state.searchSelects){
            searchSelectsArray.push({
                id:key,
                config:this.state.searchSelects[key]
            });
        }

        let searchSelects = (
            <React.Fragment>
                {searchSelectsArray.map(formElement =>{
                        return (
                                <Input
                                    key={formElement.id}
                                    id={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    invalid={!formElement.config.valid}
                                    touched={formElement.config.touched}
                                    shouldValidate={formElement.config.validation}
                                    changed={(event)=>this.selectChangedHandler(event,formElement.id)}
                                    validateMessages={formElement.config.validateMessages}
                                />
                        );
                    })}
            </React.Fragment>
        )
        const formToInputsArray =[];
        for(let key in this.state.fromToInputs){
            formToInputsArray.push({
                id:key,
                title:this.state.fromToInputs[key].title,
                config:this.state.fromToInputs[key].config
            });
        }


        let formToInputs = (
            <React.Fragment>
                {formToInputsArray.map(fromToInput=>{
                    let arr = [];
                    for(let key in fromToInput.config) {
                        arr.push({
                            id:[fromToInput.id,key],
                            config:fromToInput.config[key]
                        });
                    }
                        return(
                             <SearchFromToInput click={this.inputChangedHandler} inputElements={arr} title={fromToInput.title}/>
                        )
                })}
            </React.Fragment>

        )
        return(
            <div className={classes.SearchForm}>
                <form onSubmit={this.searchHandler}>
                    <div className={classes.Inputs}>
                        {searchSelects}
                        {formToInputs}
                    </div>
                    <Button btnType={"Success"}>Search</Button>
                </form>
                {this.props.loading?<Spinner/>:null}
            </div>
        );
    }
}
const mapStateToProps =  state => {
    return {
        loading:state.adSearcher.loading,
        brandOptions:state.adSearcher.brandOptions,
        currency:state.currency.currency
    };
};
const mapDispatchProps = dispatch=>{
    return{
        onFetchAds:  (queryData)=>dispatch(actions.fetchAds(queryData)),
        onInitAds:  ()=>dispatch(actions.initialFetchedAds()),
        onFetchBrands:  (categoryName,callBack,inputId)=>dispatch(actions.fetchBrands(categoryName,callBack,inputId)),
        onFetchTypes:  (brandName,category,callBack,inputId)=>dispatch(actions.fetchTypes(brandName,category,callBack,inputId))
    };
};
export default connect(mapStateToProps,mapDispatchProps)(withRouter(Searcher));
