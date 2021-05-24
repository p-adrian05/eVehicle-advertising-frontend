import React,{Component}  from "react";
import Button from "../../Button/Button";
import Modal from "../Modal";

class Notification extends Component{

    state={
        modalShow:true
    }

    onClickedHandler=()=>{
        this.setState({ modalShow:false})
        if(this.props.okBtnCLicked!== undefined &&  this.props.okBtnCLicked !== null){
            this.props.okBtnCLicked();
        }
}
    render() {
        return (
                <Modal show={this.state.modalShow}>{this.props.message} <Button btnType={this.props.error ? "Danger" : "Success"}
                                                                                 clicked={this.onClickedHandler}>OK</Button></Modal>
        )
    }
};

export default Notification;
