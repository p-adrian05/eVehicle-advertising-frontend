import React, {Component} from "react";

import axios from "../../axios-ads";
import Spinner from "../UI/Spinner/Spinner";


class ProfileImage extends Component{

    state={
        profileImagePath:null
    }
    componentDidMount() {
        axios.get("user/"+this.props.username)
            .then(res=>{
                this.setState({profileImagePath : res.data.profileImagePath});
            });
    }

    render() {
        let profImage = <Spinner small />;
        if(this.state.profileImagePath !== null) {
            profImage = <img  className={this.props.class} src={"http://localhost:8080/api/img"+this.state.profileImagePath} alt={this.props.username+ " profile image"}/>;
        }
        if(this.props.path){
            profImage = <img className={this.props.class} src={"http://localhost:8080/api/img"+this.props.path} alt={ " profile image"}/>;
        }
        return (
            <div>
                {profImage}
            </div>
        )
    }
};

export default ProfileImage;
