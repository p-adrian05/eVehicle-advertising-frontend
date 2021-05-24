import React, {Component} from "react";
import classes from "./MessageInput.module.css";
import Button from "../../../UI/Button/Button"
import {checkValidity, updateObject} from "../../../../shared/utility";
import Input from "../../../UI/Input/Input";

class MessageInput extends Component{


    state={
        input: {
            elementId: "messageInput",
            elementType:'textarea',
            elementConfig: {
            },
            value: '',
            validation: {
                required: true
            },
            validateMessages: [],
            valid: false,
            touched: false
        },
        modalShow: false
    }

    componentDidMount() {
        if(this.props.textEditor){
            this.setState({input:updateObject(this.state.input,{
                    elementType: "textEditor"
                })});
        }
    }

    inputChangedHandler=(value)=>{
        let validationMessage = [];
        let valid = false;
        let valueToSave ='';
        if(this.props.textEditor){
             validationMessage = checkValidity(value.toString('markdown'),this.state.input.validation);
             valid = validationMessage.length === 0;
             valueToSave = value;
        }else{
             validationMessage = checkValidity(value.target.value,this.state.input.validation);
             valid = validationMessage.length === 0;
             valueToSave = value.target.value;
        }
        this.setState({input:updateObject(this.state.input,{
                value:valueToSave,
                validationMessage:validationMessage,
                valid:valid,
                touched: true
            })});
    }

    render() {
        return (
            <div className={classes.MessageInput}>
                    <Input
                        id={this.state.input.elementId}
                        elementType={this.state.input.elementType}
                        elementConfig={this.state.input.elementConfig}
                        value={this.state.input.value}
                        invalid={!this.state.input.valid}
                        touched={this.state.input.touched}
                        shouldValidate={this.state.input.validation}
                        changed={this.inputChangedHandler}
                        validateMessages={this.state.input.validateMessages}
                        textAreaWidth={this.props.textAreaWidth}
                    />
                <div className={classes.SendMessageButtons}>
                    <Button btnType={"Slim"} disabled={!this.state.input.valid} clicked={(text)=>this.props.onSendClicked(this.state.input.value.toString('markdown').toString())}>Send</Button>
                    <Button btnType={"Danger"} clicked={this.props.onCancelClicked}>Cancel</Button>
                </div>
            </div>
        )
    }
};

export default MessageInput;
