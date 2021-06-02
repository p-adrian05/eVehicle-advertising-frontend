import React from "react";
import classes from "./AdLabel.module.css";
import frozen_icon from "../../assets/images/frozen_icon.gif"
import carSeatIcon from "../../assets/images/seat-icon.svg"
import perfIcon from "../../assets/images/perf-icon.svg"
import driveIcon from "../../assets/images/drive-icon.png"
import defaultAdImage from "../../assets/images/default_ad_image.jpg"
import {NavLink} from "react-router-dom";
import {formatDate} from "../../shared/utility";

const adLabel =(props)=>{

    let mainClasses =[];
    mainClasses.push(classes.Ad);
    if(props.state === "FROZEN"){
        mainClasses.push(classes.Frozen);
    }
    if(props.state === "ARCHIVED"){
        mainClasses.push(classes.Archived);
    }
    return(


            <div className={mainClasses.join(" ")}>
                <img className={classes.MainImage} src={props.mainImageSrc === null ? defaultAdImage : "http://localhost:8080/api/img/"+props.mainImageSrc} alt={props.title}/>
                <div>
                    <div className={classes.mainInfo}>
                        <NavLink to={"/advertisement/"+props.id} target={props.newWindow!==undefined ? '_blank' : '_self'} >
                        <span className={classes.title}>{props.title}</span>
                        </NavLink>
                        <span className={classes.price}>{new Intl.NumberFormat('hu-HU', { style: 'currency', currency: props.currency }).format(props.price)}</span>
                    </div>
                    {props.state === "FROZEN" ? <img className={classes.Froze} src={frozen_icon} alt={"frozen"}/> : null}
                    <div className={classes.middleInfo}>
                        <span>{props.condition}</span>
                        <span>{formatDate(props.created)}</span>
                    </div>
                    <div className={classes.sideInfo}>
                        <span>{props.brand + " "+ props.type}</span>
                        <span> <i className="far fa-calendar-alt"></i>{props.productData.year}</span>
                        <span><i className="fas fa-car-battery"></i>{props.productData.batterySize} kWh</span>
                        <span><i className="fas fa-road"></i>{props.productData.km} km</span>
                    </div>
                    <div className={classes.sideInfo}>
                        <span><i className="fas fa-charging-station"></i>{props.productData.chargeSpeed} kW</span>
                        <span><img src={carSeatIcon}/>{props.productData.seatNumber}</span>
                        <span><img src={perfIcon}/>{props.productData.performance} kW</span>
                        <span><img src={driveIcon}/>{props.productData.drive}</span>
                    </div>
                </div>
            </div>


    );
};
export default adLabel;
