import React from "react";
import classes from "./AdDetails.module.css";
import {formatNumber} from "../../../shared/utility";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ReactMarkdown from 'react-markdown';
const adDetails = (props) =>{

   let data = props.adDetailsData;

    return (
        <div className={classes.AdDetails}>
            <ImageGallery items={props.images}/>
            <table className={classes.Table}>
                <div className={classes.block}>
                    <th>General info</th>
                    <div className={classes.blockData}>
                        <tr>
                            <th>{"Condition"}</th>
                            <td>{props.condition}</td>
                        </tr>
                        <tr>
                            <th>{"Type"}</th>
                            <td>{props.type}</td>
                        </tr>
                        <tr>
                            <th>{"Brand"}</th>
                            <td>{props.brand}</td>
                        </tr>
                        <tr>
                            <th>{"Year"}</th>
                            <td>{data["year"]}</td>
                        </tr>
                        <tr>
                            <th>{"Drive"}</th>
                            <td>{data["drive"]}</td>
                        </tr>
                    </div>
                </div>
                <div className={classes.block}>
                    <th>Motor info</th>
                    <div  className={classes.blockData}>
                        <tr>
                            <th>{"Km driven"}</th>
                            <td>{formatNumber(data["km"]) +" km"}</td>
                        </tr>

                        <tr>
                            <th>{"Accelaration"}</th>
                            <td>{formatNumber(data["accelaration"]) +"s 0-100 km/h"}</td>
                        </tr>
                        <tr>
                            <th>{"Maximum speed"}</th>
                            <td>{formatNumber(data["maxSpeed"]) +" km/h"}</td>
                        </tr>

                    </div>
                </div>
                <div className={classes.block}>
                    <th>Battery info</th>
                    <div  className={classes.blockData}>
                        <tr>
                            <th>{"Range"}</th>
                            <td>{formatNumber(data["range"]) +" km"}</td>
                        </tr>
                        <tr>
                            <th>{"Battery size"}</th>
                            <td>{formatNumber(data["batterySize"]) +" kWh"}</td>
                        </tr>

                        <tr>
                            <th>{"Charge speed"}</th>
                            <td>{formatNumber(data["chargeSpeed"]) +" kW"}</td>
                        </tr>
                    </div>
                </div>
                <div className={classes.block}>
                    <th>Other info</th>
                    <div  className={classes.blockData}>
                        <tr>
                            <th>{"Seat number"}</th>
                            <td>{formatNumber(data["seatNumber"])}</td>
                        </tr>
                        <tr>
                            <th>{"Colour"}</th>
                            <td>{data["color"]}</td>
                        </tr>
                        <tr>
                            <th>{"Weight"}</th>
                            <td>{formatNumber(data["weight"]) +" kg"}</td>
                        </tr>
                    </div>
                </div>
            </table>

            <div className={classes.Desc}>
                <span>Description</span>
                <p>{<ReactMarkdown source={data["description"]}/>}</p>
            </div>
        </div>
    )
};

export default adDetails;
