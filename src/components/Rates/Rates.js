import React from "react";
import classes from "./Rates.module.css";
import PageNumbers from "../UI/PageNumbers/PageNumbers";
import Rate from "./Rate/Rate";
import Spinner from "../UI/Spinner/Spinner";
import {NavLink, withRouter} from "react-router-dom";
import {convertSearchParamsToObject} from "../../shared/utility";
import UserRate from "./UserRate/UserRate";
const rates = (props) =>{

    let rates=null;
    if(props.ratesData!==null){
         rates = (
            <React.Fragment>
                {
                    props.ratesData.map(data=>(
                        <Rate
                            id={data.id}
                            description={data.description}
                            ratingUsername={data.ratingUsername}
                            advertisementId={data.advertisement.id}
                            advertisementTitle={data.advertisement.title}
                            rateState={data.rateState}
                            created={data.created}
                        />

                    ))
                }
            </React.Fragment>
        )
    }
    let searchParams = convertSearchParamsToObject(props.location.search);
    let rateAsParam;
    if(searchParams.rateAs === undefined){
        rateAsParam = "seller";
    }else{
         rateAsParam = searchParams.rateAs;
    }
    return (
        <div className={classes.Rates}>
            <div className={classes.Title}>
                <h2>Rates</h2>
                <div className={classes.RatesCount}>
                  <UserRate username={props.match.params.username}/>
                </div>
            </div>
            <div className={classes.NavButtons}>
                <div className={classes.navButton}>
                    <NavLink activeClassName={classes.active} exact  to={`/user/${props.match.params.username}/rates?page=${props.pageNumber}&rateAs=seller`} >As seller</NavLink>
                </div>
                <div className={classes.navButton}>
                    <NavLink  activeClassName={classes.active} exact to={`/user/${props.match.params.username}/rates?page=${props.pageNumber}&rateAs=buyer`}>As buyer</NavLink>
                </div>
            </div>
            <div className={classes.PageNumbers}>
                <PageNumbers pageNumber={props.pageNumber}
                             allPageNumber={props.allPageNumber}
                             range={props.range}
                             link={`/user/${props.match.params.username}/rates?rateAs=${rateAsParam}&page=`}/>
            </div>
            {props.loading ? <Spinner/> : null}
            {rates}
        </div>
    );
}

export default withRouter(rates);
