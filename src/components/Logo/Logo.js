import React from "react";
import burgerLogo from '../../assets/images/logo.webp';
import classes from './Logo.module.css';

const logo = (props) =>{
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="My burger"/>
        </div>
    )
};

export default logo;