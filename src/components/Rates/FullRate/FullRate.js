import React from "react";
import classes from "./FullRate.module.css";
import Button from "../../UI/Button/Button";
import {Link} from "react-router-dom";

const fullRate = (props) =>{
    return (
        <div className={classes.FullRate}>
            <div className={classes.Header}>
                <label >Advertisement:</label>
                <div className={classes.adTitle}> <Link to={`/advertisement/${props.adId}`} target="_blank"
                          exact={props.exact}>{props.adTitle}</Link></div>
            </div>
            <div className={classes.Rates}>
                <div className={classes.Rate}>
                    <span className={classes.RatingUsername}> <Link to={`/user/${props.buyerUsername}`} target="_blank"
                                                                   exact={props.exact}>{props.buyerUsername}</Link></span>
                    <span className={classes.RatingUsername}> buyer rated <Link to={`/user/${props.sellerUsername}`} target="_blank"
                                             exact={props.exact}>{props.sellerUsername}</Link> seller</span>
                    <div className={classes[props.sellerRateState]}>{props.sellerRateState}</div>
                    <p>{props.sellerDescription}</p>
                </div>
                <div className={classes.Rate}>
                    <label><Link to={`/user/${props.sellerUsername}`} target="_blank"
                                 exact={props.exact}>{props.sellerUsername}</Link> seller rated</label>
                    <span className={classes.RatingUsername}> <Link to={`/user/${props.buyerUsername}`} target="_blank"
                                                                                      exact={props.exact}>{props.buyerUsername}</Link></span><label> buyer</label>
                    <div className={classes[props.buyerRateState]}>{props.buyerRateState}</div>
                    <p>{props.buyerDescription}</p>
                </div>
            </div>
            <div className={classes.Footer}>
                <Button btnType={"Success"} clicked={props.clicked}>Close</Button>
            </div>
        </div>
    )
};

export default fullRate;
