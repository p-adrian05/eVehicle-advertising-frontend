import React from "react";
import classes from "./Category.module.css"

const category =(props)=>{

    let imgClasses = [];
    imgClasses.push("CategoryImg");

    if(props.selectedName === props.iconAlt){
        imgClasses.push(classes.active);
    }

    return(
        <div className={classes.Category} >
            <span>{props.iconAlt}</span>
            <img className={imgClasses.join(" ")} src={props.iconSrc} alt={props.iconAlt} onClick={props.clicked} />
        </div>
    );
};
export default category;