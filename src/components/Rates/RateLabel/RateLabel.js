import React from "react";
import classes from "./RateLabel.module.css";
import {Link, NavLink} from "react-router-dom";
import ProfileImage from "../../ProfileImage/ProfileImage";
import Button from "../../UI/Button/Button";
import {formatDate} from "../../../shared/utility";


const rateLabel = (props) =>{
    return (
      <table className={classes.RateLabel} onClick={props.clicked}>
          <tr>
              <td className={classes.AdLink}>
                   <Link to={`/advertisement/${props.adData.id}`} target="_blank"
                         exact={props.exact}>{props.adData.title}</Link>
              </td>
          </tr>
          <tr>
              <ProfileImage class={classes.ProfImage} username={props.username}/>
          </tr>
          <tr>
              <td className={classes.RatingUsername}>  <Link to={`/user/${props.username}`} target="_blank"
                                                                   exact={props.exact}>{props.username}</Link></td>
          </tr>
          <tr>
              <td>{props.ratedState === "BUYER"? "SELLER": "BUYER"}</td>
          </tr>
          <tr>
              <div className={classes.Status}>
                  <td>{props.status}</td>
                  <td>
                      {props.code !== null && props.acceptClicked !== undefined ? <Button btnType={"Slim"}
                                                      clicked={(activationCode,ratedUsername,adID)=>props.acceptClicked(props.code,props.username,props.adData.id)} >Accept</Button>: null}
                  </td>
              </div>
          </tr>
          <tr>
              <td><Button btnType={"Slim"} disabled={props.code} clicked={props.viewButtonCLicked}>View</Button></td>
          </tr>
          <tr>
              <td>{formatDate(props.created)}</td>
          </tr>

      </table>
    )
};

export default rateLabel;
