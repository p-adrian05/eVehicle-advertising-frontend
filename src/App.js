import React,{Component} from "react";
import Layout from "./hoc/Layout/Layout";
import {Route, Switch, withRouter, Redirect} from "react-router-dom";
import Searcher from "./containers/Searcher/Searcher";
import Ad from "./containers/Ad/Ad";
import UserDataPage from "./containers/UserDataPage/UserDataPage"
import AdCreator from "./containers/Ad/AdCreator/AdCreator";
import Messages from "./containers/Messages/Messages";
import MessagePartners from "./containers/Messages/MessagePartners/MessagePartners";
import MessageSender from "./components/Messages/MessageSender/MessageSender";
import UserRates from "./containers/UserRates/UserRates";
import MyAds from "./containers/MyAds/MyAds";
import {connect} from "react-redux";
import Login from "./containers/Login/Login";
import * as actions from "./store/actions";


class App extends Component{
    componentDidMount() {
        this.props.onTryAutoSignIn();
    }

    renderLoginPage=()=>{
        return  <Login show={true} close={()=> this.props.history.goBack()}/>;
    }

  render() {
      let routes = (
          <Switch>
              <Route path={"/post/ad"} exact render={this.renderLoginPage}/>
              <Route path={"/post/ad/:id"} exact render={this.renderLoginPage}/>
              <Route path={"/advertisements"} component={Searcher}/>
              <Route path={"/rates"} render={this.renderLoginPage} />
              <Route path={"/advertisement/:id"} component={Ad}/>
              <Route path={"/user/:username"} exact component={UserDataPage}/>
              <Route path={"/user/:username/rates"} exact component={UserDataPage}/>
              <Route path={"/messagePartners"} exactrender={this.renderLoginPage}/>
              <Route path={"/messages/:partnerName"} exact render={this.renderLoginPage}/>
              <Route path={"/message/:username"} exact render={this.renderLoginPage}/>
              <Route path={"/myAds"} exact render={this.renderLoginPage}/>
              <Redirect to={"/advertisements"}/>
          </Switch>
      )
      if(this.props.isAuthenticated){
          routes=(
              <Switch>
                  <Route path={"/post/ad"} exact component={AdCreator}/>
                  <Route path={"/post/ad/:id"} exact component={AdCreator}/>
                  <Route path={"/advertisements"} component={Searcher}/>
                  <Route path={"/rates"} component={UserRates}/>
                  <Route path={"/advertisement/:id"} component={Ad}/>
                  <Route path={"/user/:username"} exact component={UserDataPage}/>
                  <Route path={"/user/:username/rates"} exact component={UserDataPage}/>
                  <Route path={"/messagePartners"} exact component={MessagePartners}/>
                  <Route path={"/messages/:partnerName"} exact component={Messages}/>
                  <Route path={"/message/:username"} exact component={MessageSender}/>
                  <Route path={"/myAds"} exact component={MyAds}/>
                  <Redirect to={"/advertisements"}/>
              </Switch>
          )
      }
    return (
        <div>
            <Layout>
                <Switch>
                    {routes}
                </Switch>
            </Layout>
        </div>
    );
  }
}

const mapStateToProps = state=>{
    return{
        isAuthenticated:state.auth.token!==null
    };
};
const mapDispatchToProps = dispatch =>{
    return{
        onTryAutoSignIn: ()=>dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
