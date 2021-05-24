import React from "react";
import {NavLink} from "react-router-dom";
import classes from "./PageNumbers.module.css";
import Button from "../Button/Button"

const pageNumbers = (props) =>{


    let pageNumbers = [];
    let upperLimit = props.allPageNumber;
    let lowerLimit = 1;
    let range = props.range;

    if(props.pageNumber-range>lowerLimit){
        lowerLimit = props.pageNumber - range;

    }if(props.pageNumber+range<upperLimit){
        upperLimit = props.pageNumber+range;
    }
    if(lowerLimit!==1){
        pageNumbers.push(1);
        pageNumbers.push("...");
    }
    for(let i = lowerLimit;i<=props.pageNumber-1;i++){
        pageNumbers.push(i);
    }
    for(let i = props.pageNumber;i<=upperLimit;i++){
        pageNumbers.push(i);
    }
    if(upperLimit!== props.allPageNumber){
        pageNumbers.push("...");
        pageNumbers.push( props.allPageNumber);
    }

    let navLinks = (
        <div className={classes.Numbers}>
            {
                pageNumbers.map(num=>{
                    if(num==="..."){
                        return num+" ";
                    }
                    return(
                        <NavLink activeClassName={classes.active}  exact to={props.link+num}>{num}</NavLink>
                    )
                })
            }
        </div>
    )

    return (
        <div className={classes.PageNumbers}>
            <NavLink to={props.link+(props.pageNumber-1)}>
                <Button btnType={"Success"} disabled={props.pageNumber-1<lowerLimit}>Back</Button>
            </NavLink>
            {navLinks}
            <NavLink to={props.link+(props.pageNumber+1)}>
                <Button btnType={"Success"} disabled={props.pageNumber+1>upperLimit}>Forward</Button>
            </NavLink>
        </div>
    )
};

export default pageNumbers;