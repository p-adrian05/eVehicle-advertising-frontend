import React from "react";
import classes from "./Spinner.module.css";

const spinner = (props) =>{
    let classNames = [];
    classNames.push(classes.loader);
    if(props.small){
        classNames.push(classes.small);
    }
    return (
        <div className={classNames.join(" ")}>Loading...</div>
    )
};

export default spinner;