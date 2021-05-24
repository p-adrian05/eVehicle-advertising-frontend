import React from "react";
import Category from "../../components/Categories/Category/Category";
import carIcon from '../../assets/images/car-icon.svg';
import busIcon from '../../assets/images/bus-icon.svg';
import bicycleIcon from '../../assets/images/bicycle-iconsvg.svg';
import truckIcon from '../../assets/images/truck-icon.svg';
import motorCycleIcon from '../../assets/images/motorcycle-icon.svg';
import rollerIcon from '../../assets/images/roller-icon.png';
import classes from "./Categories.module.css"

const categories = (props) =>{
    return (
        <ul className={classes.Categories}>
            <li><Category iconSrc={carIcon} iconAlt={"Car"} clicked={props.clicked} selectedName={props.selected}/></li>
            <li><Category iconSrc={busIcon} iconAlt={"Bus"} clicked={props.clicked} selectedName={props.selected}/></li>
            <li><Category iconSrc={bicycleIcon} iconAlt={"Bicycle"} clicked={props.clicked} selectedName={props.selected}/></li>
            <li><Category iconSrc={truckIcon} iconAlt={"Truck"} clicked={props.clicked} selectedName={props.selected}/></li>
            <li><Category iconSrc={motorCycleIcon} iconAlt={"Motorbike"} clicked={props.clicked} selectedName={props.selected}/></li>
            <li><Category iconSrc={rollerIcon} iconAlt={"Roller"} clicked={props.clicked} selectedName={props.selected}/></li>
        </ul>
    )
};
export default categories;