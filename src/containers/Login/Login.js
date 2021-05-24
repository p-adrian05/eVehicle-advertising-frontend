import React,{Component} from "react";
import classes from "./Login.module.css";
import {connect} from "react-redux";
import {checkValidity, updateObject} from "../../shared/utility";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button"
import Modal from "../../components/UI/Modal/Modal";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import Notification from "../../components/UI/Modal/Notification/Notification";
class Login extends Component{

    state={
        loginInputs:{
            username: {
                elementId: "username",
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "username"
                },
                value: "",
                validation: {
                    required: true
                },
                validateMessages: [],
                valid: false,
                touched: false
            },
            password: {
                elementId: "password",
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "password"
                },
                value: "",
                validation: {
                    required: true,

                },
                validateMessages: [],
                valid: false,
                touched: false
            },
        },
        regInputs:{
            email: {
                elementId: "email",
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "email"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail:true
                },
                validateMessages: [],
                valid: false,
                touched: false
            },
            username: {
                elementId: "username",
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "username"
                },
                value: "",
                validation: {
                    required: true,
                    minLength:2,
                    maxLength:15
                },
                validateMessages: [],
                valid: false,
                touched: false
            },
            password: {
                elementId: "password",
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "password"
                },
                value: "",
                validation: {
                    required: true,
                    isPassword: true,
                    minLength:8
                },
                validateMessages: [],
                valid: false,
                touched: false
            },
            verifyPassword: {
                elementId: "verifyPassword",
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "verify password"
                },
                value: "",
                validation: {
                    required: true
                },
                validateMessages: [],
                valid: false,
                touched: false
            },
        },
        createUserBtnClicked:false,
        loginUserBtnClicked:false,
        loginMode:true
    }

    inputChangedHandler=(event,id)=>{
        let inputState;
        if(this.state.loginMode){
            inputState = this.state.loginInputs;
        }else{
            inputState = this.state.regInputs;
        }
        let validateMessages = checkValidity(event.target.value,inputState[id].validation);
        if(id==='verifyPassword'){
            if(event.target.value!== inputState['password'].value){
                validateMessages.push("Not equal");
            }
        }
        const updatedInput =  updateObject(inputState[id],{
            value:event.target.value,
            validateMessages:validateMessages,
            valid:validateMessages.length === 0,
             touched:true
        });
        const updatedInputs = updateObject(inputState,{
            [id]:updatedInput
        });
        if(this.state.loginMode){
            this.setState({loginInputs:updatedInputs});
        }else{
            this.setState({regInputs:updatedInputs});
        }
    }

    signUpHandler=()=>{
        if(this.state.loginMode){
            this.setState({loginMode:false});
        }else{
            if(this.formIsValid(this.state.regInputs)){
                this.setState({createUserBtnClicked:true});

                this.props.onCreateUser(this.collectInputsData(this.state.regInputs));
            }
        }
    }
    collectInputsData=(inputs)=>{
        const data = {};
        this.travelInputsValue(inputs,(value,id)=>{
            if(value!=="" && value!==null){
                data[id]=value
            }
        })
        return data;
    }
    formIsValid=(inputs)=>{
        let falseValidValues = [];
        this.travelInputsValid(inputs,(valid,id)=>{
            if(!valid){
                falseValidValues.push(valid);
            }
        })
        return falseValidValues.length === 0;
    }
    travelInputsValue(inputs,processValueCallback){
        for(let id in inputs){
            processValueCallback(inputs[id].value,id);
        }
    }
    travelInputsValid(inputs,processValidCallback){
        for(let id in inputs){
            processValidCallback(inputs[id].valid,id);
        }
    }
    loginHandler=()=>{
        if(!this.state.loginMode){
            this.setState({loginMode:true});
        }else{
            if(this.formIsValid(this.state.loginInputs)){
                this.setState({loginUserBtnClicked:true});
                this.props.onLoginUser(this.state.loginInputs.username.value,this.state.loginInputs.password.value);
            }
        }
    }
    okBtnClickedAfterRegistration=()=>{
        this.setState({createUserBtnClicked:false,loginMode:true,regInputs:this.initRegInputs(this.state.regInputs)});
    }
    initRegInputs=(inputs)=>{
        let updatedInputs = inputs
        this.travelInputsValue(updatedInputs,(value,id)=>{
            const updatedInput = updateObject(updatedInputs[id],{
                value: "",
                valid:false,
                touched:false
            });
            updatedInputs = updateObject(updatedInputs,{
                    [id]:updatedInput
            });
        })
       return updatedInputs;
}
    render() {
        const loginInputsArray =[];
        for(let key in this.state.loginInputs){
            loginInputsArray.push({
                id:key,
                config:this.state.loginInputs[key]
            });
        }
        const regInputsArray =[];
        for(let key in this.state.regInputs){
            regInputsArray.push({
                id:key,
                config:this.state.regInputs[key]
            });
        }
        let inputs;
        if(this.state.loginMode===true){
             inputs = (
                <React.Fragment>
                    <h1>Login</h1>
                    {loginInputsArray.map(formElement =>{
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
                                changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                                validateMessages={formElement.config.validateMessages}
                            />
                        );
                    })}
                </React.Fragment>
            )
        }else{
            inputs = (
                <React.Fragment>
                    <h1>Sign Up</h1>
                    {regInputsArray.map(formElement =>{
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
                                changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                                validateMessages={formElement.config.validateMessages}
                            />
                        );
                    })}
                </React.Fragment>
            )
        }

        let contentToRender =   <Modal show={this.props.show}>
            <div className={classes.Login}>
                {this.state.loginMode ? <p className={classes.ErrMessage}>{this.props.authError? this.props.authError: null}</p> :
                    <p className={classes.ErrMessage}>{this.props.error? this.props.error: null}</p>
                }
                <div className={classes.Inputs}>
                    {inputs}
                </div>
                <div className={classes.Button}>
                    <Button btnType={"Success"} clicked={this.signUpHandler}>Sign Up</Button>
                    <Button btnType={"Success"} clicked={this.loginHandler}>Login</Button>
                    <Button btnType={"Danger"} clicked={this.props.close}>Close</Button>
                </div>
            </div>
        </Modal>
        if(this.state.loginUserBtnClicked){
            if(this.props.authLoading) {
                contentToRender = <Modal show={this.props.authLoading}><Spinner/></Modal>
            }
            if(this.props.authError===null && !this.props.authLoading){
                this.initRegInputs(this.state.loginInputs);
                this.props.close();
            }
        }
        if(this.state.createUserBtnClicked){
            if(this.props.loading){
                contentToRender = <Modal show={this.props.loading}><Spinner/></Modal>
            }else if(this.props.error===null){
                contentToRender = <Notification okBtnCLicked={this.okBtnClickedAfterRegistration} error={this.props.error}
                                                message={"Successful registration, activation link has sent to your email!"}/>
            }


        }
        return (
            <React.Fragment>
                {contentToRender}
            </React.Fragment>
        );
    }
}
const mapStateToProps =  state => {
    return {
        loading:state.user.loading,
        error:state.user.error,
        authLoading:state.auth.loading,
        authError:state.auth.error
    };
};
const mapDispatchProps = dispatch=>{
    return{
        onCreateUser:  (payload)=>dispatch(actions.createUser(payload)),
        onLoginUser:  (username,password)=>dispatch(actions.loginUser(username,password)),
    };
};
export default connect(mapStateToProps,mapDispatchProps)(Login);
