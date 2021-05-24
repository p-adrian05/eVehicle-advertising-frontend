import React from "react";
import classes from "./UserData.module.css";
import Button from "../UI/Button/Button";
import {formatDate} from "../../shared/utility";
import ProfileImage from "../ProfileImage/ProfileImage";
import {withRouter} from "react-router-dom";

const userData = (props) =>{

    const data =[];
    const keysNotInTable = ["username","profileImagePath","enabled"]
    let key_values = {
        city:"City",
        fullName:"Full name",
        publicEmail : "Public email",
        phoneNumber: "Phone number",
        lastLogin: "Last login",
        created:"Registration date"
    }

    for(let key in props.data){
        if(!keysNotInTable.includes(key)){
            data.push({
                id:key,
                value:props.data[key]
            });
        }
    }

    let tableData = (
        <table >
            {data.map(d=>(
                <tr>
                    <th>{key_values[d.id]}</th>
                    <td>{formatDate(d.value)}</td>
                 </tr>
            ))}
        </table>
    );


    let mainClasses = [classes.UserData];
    if(!props.data["enabled"]){
        mainClasses.push(classes.Disabled);
    }
    return (



            <div className={mainClasses.join(" ")}>
                <div className={classes.header}>
                        <ProfileImage class={classes.profImage} path={props.data["profileImagePath"]}/>
                    <div>{props.data["username"]}</div>
                </div>
                <div className={classes.Table}>
                    {tableData}
                </div>
                <Button btnType={"Success"} clicked={props.detailsClicked} disabled={props.detailsButtonClicked}>Details</Button>
                <Button btnType={"Success"} disabled={!props.data["enabled"]} clicked={props.privateMessageClicked}>Private Message</Button>
            </div>

    )
};

export default withRouter(userData);
