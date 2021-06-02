import React,{Component} from "react";
import classes from "./CurrencySelector.module.css";
import * as actions from "../../../store/actions";
import {connect} from "react-redux";
import Input from "../../UI/Input/Input";
import {updateObject} from "../../../shared/utility";

class CurrencySelector extends Component{

    state={
        currencySelectInput: {
            title: "currency",
            elementId: "currency",
            elementType: "select",
            elementConfig: {
                options: [
                    {value: "HUF", displayValue: "HUF"},
                    {value: "USD", displayValue: "USD"},
                    {value: "EUR", displayValue: "EUR"}
                ]
            },
            validateMessages: [],
            value: "HUF",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
    }

    componentDidMount(){
        this.setState({currencySelectInput: updateObject(this.state.currencySelectInput,{
                value:this.props.currency,
            })});
    }
    selectChangedHandler=(event)=>{
        const updatedInput = updateObject(this.state.currencySelectInput,{
            value:event.target.value,
        });
        this.setState({currencySelectInput:updatedInput});
        this.props.setSelectedCurrency(event.target.value);
    }

    render() {

        return (
            <div className={classes.Selector}>
                <div className={classes.Title}><span>Currency:</span></div>
                <Input
                    key={this.state.currencySelectInput.elementId}
                    id={this.state.currencySelectInput.elementId}
                    elementType={this.state.currencySelectInput.elementType}
                    elementConfig={this.state.currencySelectInput.elementConfig}
                    value={this.state.currencySelectInput.value}
                    invalid={!this.state.currencySelectInput.valid}
                    touched={this.state.currencySelectInput.touched}
                    shouldValidate={false}
                    changed={(event)=>this.selectChangedHandler(event)}
                    validateMessages={this.state.currencySelectInput.validateMessages}
                />
            </div>
        );
    }
}

const mapStateToProps =  state => {
    return {
        actualSelectedCurrency:state.currency.currency
    };
};
const mapDispatchProps = dispatch=>{
    return{
        setSelectedCurrency: (currency)=>dispatch(actions.setSelectedCurrency(currency))
    };
};
export default connect(mapStateToProps,mapDispatchProps)(CurrencySelector);

