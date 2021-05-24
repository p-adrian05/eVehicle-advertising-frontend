import React from "react";
import classes from "./AdHeader.module.css";
import Button from "../../UI/Button/Button"
import {formatNumber, updateObject} from "../../../shared/utility";
import {NavLink} from "react-router-dom";
import UserRate from "../../Rates/UserRate/UserRate";
import {Component} from "react/cjs/react.production.min";
import Input from "../../UI/Input/Input";
import {connect} from "react-redux";

class AdHeader extends Component{


    state={
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


    componentDidMount() {
       this.setState({stateSelector: updateObject(this.state.stateSelector,
               {value: this.props.state})});
    }
    selectStateClickedHandler=(event)=>{
        this.setState({stateSelector: updateObject(this.state.stateSelector,
                {value:event.target.value})});
        this.props.selectStateClicked(event.target.value);
    }
    render(){
        return (
            <div className={classes.AdHeader}>
                <div className={classes.TopInfo}>
                    <div>Category: {this.props.category}</div>

                    {
                        this.props.isAuthenticated && this.props.username === this.props.creator ?
                            <React.Fragment>
                                <Input
                                    elementType={this.state.stateSelector.elementType}
                                    elementConfig={this.state.stateSelector.elementConfig}
                                    value={this.state.stateSelector.value}
                                    invalid={true}
                                    touched={true}
                                    shouldValidate={false}
                                    changed={this.selectStateClickedHandler}
                                    validateMessages={[]}
                                />
                                <Button btnType={"Success"} clicked={this.props.editBtnClicked}>Edit</Button>
                            </React.Fragment>

                           :   <React.Fragment> <Button btnType={"Success"} clicked={this.props.rateBtnClicked}>Rate</Button>
                                <Button btnType={"Success"} clicked={this.props.privateMessageClicked}>Send Message</Button>
                            </React.Fragment>
                    }
                </div>
                <p className={classes.Title}>{this.props.title}</p>
                <div className={classes.BottomInfo}>
                    <div className={classes.CreatorInfo}>
                        <NavLink to={"/user/"+this.props.creator}>
                            <span className={classes.userName}>{this.props.creator}</span>
                        </NavLink>

                        <div>
                            <span>Rates: </span>
                            <UserRate username={this.props.creator}/>
                        </div>
                    </div>
                    <div className={classes.adInfo}>
                        <span className={classes.price}>{formatNumber(this.props.price) +" Ft"}</span>
                        <span>{this.props.created}</span>
                    </div>

                </div>

            </div>
        )
    }
};

const mapStateToProps = state=>{
    return{
        isAuthenticated:state.auth.token!==null,
        username:state.auth.username
    };
};
export default connect(mapStateToProps)(AdHeader);
