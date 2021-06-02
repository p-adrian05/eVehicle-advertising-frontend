import React, {Component} from "react";
import Input from "../../../components/UI/Input/Input";
import classes from "./AdCreator.module.css";
import {checkValidity, updateObject} from "../../../shared/utility";
import axios from "../../../axios-ads";
import * as actions from "../../../store/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import ImageUploaderUI from "../../../components/ImageUploaderUI/ImageUploaderUI";
import ImageUploading from "react-images-uploading";
import Notification from "../../../components/UI/Modal/Notification/Notification";
import RichTextEditor from "react-rte/lib/RichTextEditor";

class AdCreator extends Component{

    componentDidMount() {
        axios.get("advertisement/categories")
            .then(res=>{
                this.updateSelectOptions(res.data,["generalInfoInputs","category"])
            });
        if(this.props.match.params.id){
            this.initImages();
            setTimeout(()=>  this.initInputs(),200);
        }

    }

    initInputs(){
        let updatedInputGroups = this.state.inputGroups;

        this.travelInputsValue((value,id)=>{
            let elementValue = "";
            if(this.props.adData[id[1]]!==undefined && this.props.adData[id[1]]!==null){
                elementValue = this.props.adData[id[1]];
            }else if(this.props.adDetails[id[1]]!==undefined && this.props.adDetails[id[1]]!==null){
                elementValue = this.props.adDetails[id[1]];
            }
            if(id[1]==='description'){
                elementValue =  RichTextEditor.createValueFromString(elementValue, 'markdown');
            }
            const updatedInput = updateObject(updatedInputGroups[id[0]].inputs[id[1]],{
                value: elementValue
            });
            updatedInputGroups = this.updateInputs(updatedInput,id,updatedInputGroups);

        })

        this.setState({inputGroups:updatedInputGroups});
        this.setBrandAndTypeOptions(this.props.adData.category,"category");
        this.setBrandAndTypeOptions(this.props.adData.brand,"brand");
    }
    async initImages(){
        let promises = [];
        let images = [];
        this.props.adData.imagePaths.forEach(path=>{
            promises.push(axios.get("http://localhost:8080/api/img/"+path)
                .then(res=>{
                    let file = new File([res.data], path, {type: res.headers["content-type"]});
                    images.push({data_url:"http://localhost:8080/api/img/"+path,file:file});
                }));
        });
        Promise.all(promises).then(() => this.setState({images:images}));
    }
    state= {
        inputGroups:{
            generalInfoInputs:{
                name:"General Info",
                inputs:{
                    category: {
                        title: "Category",
                        elementId: "category",
                        elementType: "select",
                        elementConfig: {
                            options: [
                                {value: "", displayValue: "category"}
                            ]
                        },
                        validateMessages: [],
                        value: "",
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false

                    },
                    brand: {
                        title: "Brand",
                        elementId: "brand",
                        elementType: "select",
                        elementConfig: {
                            options: [
                                {value: "", displayValue: "brand"},
                            ]
                        },
                        validateMessages: [],
                        value: "",
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                    },
                    type: {
                        title: "Type",
                        elementId: "type",
                        elementType: "select",
                        elementConfig: {
                            options: [
                                {value: "", displayValue: "type"}
                            ]
                        },
                        validateMessages: [],
                        value: "",
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                    },
                    condition: {
                        title: "Condition",
                        elementId: "condition",
                        elementType: "select",
                        elementConfig: {
                            options: [
                                {value: "", displayValue: "condition"},
                                {value: "NEW", displayValue: "new"},
                                {value: "USED", displayValue: "used"},
                            ]
                        },
                        validateMessages: [],
                        value: "",
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                    },
                    year: {
                        title: "Year",
                        elementId: "year",
                        elementType: "input",
                        elementConfig: {
                            type: "number",
                            min: 2000,
                            placeholder: "Enter year",
                            max: new Date().getFullYear()
                        },
                        value: "",
                        validation: {
                            required: true,
                            min: 2000,
                            max:new Date().getFullYear()
                        },
                        validateMessages: [],
                        valid: false,
                        touched: false
                    },
                    drive: {
                        title: "Drive",
                        elementId: "drive",
                        elementType: "select",
                        elementConfig: {
                            options: [
                                {value: "", displayValue: "drive"},
                                {value: "AWD", displayValue: "AWD"},
                                {value: "RWD", displayValue: "RWD"},
                            ]
                        },
                        validateMessages: [],
                        value: "",
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false
                    }
                }
            },
            motorInfoInputs:{
                name:"Motor Info",
                inputs:{
                    km: {
                        title: "Km Driven",
                        elementId: "kmDriven",
                        elementType: "input",
                        elementConfig: {
                            type: "number",
                            placeholder: "Enter Km driven",
                            min: 0,
                            max: 2000000
                        },
                        value: 0,
                        validation: {
                            min: 0,
                            max: 2000000,
                            required: false
                        },
                        validateMessages: [],
                        valid: false,
                        touched: false
                    },
                    performance: {
                        title: "Performance (kW)",
                        elementId: "performance",
                        elementType: "input",
                        elementConfig: {
                            type: "number",
                            placeholder: "Enter performance",
                            min: 1,
                        },
                        value: "",
                        validation: {
                            min: 1,
                            required: true
                        },
                        validateMessages: [],
                        valid: false,
                        touched: false
                    },
                    maxSpeed: {
                        title: "Maximum speed (km/h)",
                        elementId: "maxSpeed",
                        elementType: "input",
                        elementConfig: {
                            type: "number",
                            placeholder: "Enter max speed",
                            min: 1,
                        },
                        value: "",
                        validation: {
                            min: 1,
                            required: true
                        },
                        validateMessages: [],
                        valid: false,
                        touched: false
                    },
                    accelaration: {
                        title: "Accelaration (s 0-100 km/h)",
                        elementId: "accelaration",
                        elementType: "input",
                        elementConfig: {
                            type: "number",
                            placeholder: "Enter accelaration",
                            min: 0,
                            max:10000
                        },
                        value: "",
                        validation: {
                            min: 0,
                            max:10000,
                            required: true
                        },
                        validateMessages: [],
                        valid: false,
                        touched: false
                    }
                }
            },
            batteryInfoInputs:{
                name:"Battery info",
                inputs:{
                    batterySize: {
                        title: "Battery size (kWh)",
                        elementId: "batterySize",
                        elementType: "input",
                        elementConfig: {
                            type: "number",
                            placeholder: "Enter battery size (kWh)",
                            min: 10,
                            max: 1000
                        },
                        value: "",
                        validation: {
                            min: 10,
                            max: 1000,
                            required: true
                        },
                        validateMessages: [],
                        valid: false,
                        touched: false
                    },
                    chargeSpeed: {
                        title: "Charge speed (kW)",
                        elementId: "chargeSpeed",
                        elementType: "input",
                        elementConfig: {
                            type: "number",
                            placeholder: "Enter charge speed",
                            min: 1,
                        },
                        value: "",
                        validation: {
                            min: 1,
                            required: true
                        },
                        validateMessages: [],
                        valid: false,
                        touched: false
                    },
                    range: {
                        title: "Range (km)",
                        elementId: "range",
                        elementType: "input",
                        elementConfig: {
                            type: "number",
                            placeholder: "Enter range",
                            min: 0,
                            max:10000
                        },
                        value: "",
                        validation: {
                            min: 0,
                            max:10000,
                            required: true
                        },
                        validateMessages: [],
                        valid: false,
                        touched: false
                    }
                }
            },
            otherInfoInputs:{
                name:"Other info",
                inputs:{
                    weight: {
                        title: "Weight (kg)",
                        elementId: "weight",
                        elementType: "input",
                        elementConfig: {
                            type: "number",
                            placeholder: "Enter weight",
                            min: 0,
                            max:10000
                        },
                        value: "",
                        validation: {
                            min: 0,
                            max:10000,
                            required: true
                        },
                        validateMessages: [],
                        valid: false,
                        touched: false
                    },
                    color: {
                        title: "Color",
                        elementId: "color",
                        elementType: "input",
                        elementConfig: {
                            type: "input",
                            placeholder: "Enter color"
                        },
                        value: "",
                        validation: {
                            required: false,
                            onlyLetters:true,
                            maxLength:10
                        },
                        validateMessages: [],
                        valid: false,
                        touched: false
                    },
                    seatNumber: {
                        title: "Seat number",
                        elementId: "seatNumber",
                        elementType: "input",
                        elementConfig: {
                            type: "number",
                            placeholder: "Enter seat number",
                            min: 0,
                            max:99
                        },
                        value: "",
                        validation: {
                            min: 0,
                            max:99,
                            required: false
                        },
                        validateMessages: [],
                        valid: false,
                        touched: false
                    }
                }
            },
            adInfoInputs:{
                name:"Advertisement info",
                inputs:{
                    price: {
                        title: "Price",
                        elementId: "price",
                        elementType: "input",
                        elementConfig: {
                            type: "number",
                            placeholder: "Enter price",
                            min: 0
                        },
                        value: "",
                        validation: {
                            min: 0,
                            max:999999999,
                            required: true
                        },
                        validateMessages: [],
                        valid: false,
                        touched: false
                    },
                    title: {
                        title: "Title",
                        elementId: "title",
                        elementType: "input",
                        elementConfig: {
                            type: "input",
                            placeholder: "Enter title"
                        },
                        value: "",
                        validation: {
                            required: true,
                            maxLength:30
                        },
                        validateMessages: [],
                        valid: false,
                        touched: false
                    },
                    description: {
                        title: "Description",
                        elementId: "description",
                        elementType: "textEditor",
                        elementConfig: {
                            type: "textarea",
                            placeholder: "Enter description"
                        },
                        value: "",
                        validation: {
                            required: true,
                            maxLength:1500
                        },
                        validateMessages: [],
                        valid: false,
                        touched: false
                    }
                }
            }
        },
        modalShow:false,
        brandTextInput :{
            title: "Brand",
            elementId: "brand",
            elementType: "input",
            elementConfig: {
                type: "input",
                placeholder: "Enter brand"
            },
            value: "",
            validation: {
                required: true,
                maxLength:30
            },
            validateMessages: [],
            valid: false,
            touched: false
        },
        brandSelectInput :{
                title: "Brand",
                elementId: "brand",
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "", displayValue: "brand"},
                    ]
                },
            value: "",
                validateMessages: [],
                validation: {
                    required: true
                },
                valid: false,
                touched: false
        },
        typeSelectInput: {
            title: "Type",
            elementId: "type",
            elementType: "select",
            elementConfig: {
                options: [
                    {value: "", displayValue: "type"}
                ]
            },
            validateMessages: [],
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        typeTextInput: {
            title: "Type",
            elementId: "type",
            elementType: "input",
            elementConfig: {
                type: "input",
                placeholder: "Enter brand"
            },
            value: "",
            validation: {
                required: true,
                maxLength:30
            },
            validateMessages: [],
            valid: false,
            touched: false
        },
        maxNumber:10,
        images:[],
        maxFileSizeInKB:2048,
        acceptTypes:['jpg', 'gif', 'png'],
        createAdRequestSent: false
    }

    collectInputsData=()=>{
        const formData = new FormData();
        this.travelInputsValue((value,id)=>{
            if(id[1]==="description"){
                formData.append(id[1],value.toString('markdown'));
            }else{
                if(value!=="" && value!==null){
                    formData.append(id[1],value);
                }
            }
        });
         formData.append("creator",this.props.authenticatedUser);
         formData.append("currency",this.props.currency);
        this.state.images.forEach(image=>formData.append("images",image.file));
        return  formData;
    }
    formIsValid(){
        let falseValidValues = [];
        this.travelInputsValid((valid,id)=>{
            if(!valid){
                falseValidValues.push(valid);
            }
        })
        return falseValidValues.length === 0;
    }
    validateForm=()=>{
        let updatedInputGroups = this.state.inputGroups;
        this.travelInputsValue((value,id)=>{
            let validateMessages = [];
            if(id[1]==="description"){
                validateMessages =  checkValidity(value.toString('markdown'),updatedInputGroups[id[0]].inputs[id[1]].validation);
            }else{
                validateMessages =  checkValidity(value,updatedInputGroups[id[0]].inputs[id[1]].validation);
            }
            const updatedInput = updateObject(updatedInputGroups[id[0]].inputs[id[1]],{
                validateMessages:validateMessages,
                valid:validateMessages.length === 0,
            });
            updatedInputGroups = this.updateInputs(updatedInput,id,updatedInputGroups);
        })
        this.setState({inputGroups:updatedInputGroups});
    }

    travelInputsValue(processValueCallback){
        for(let id in this.state.inputGroups){
            for(let id2 in this.state.inputGroups[id].inputs){
                processValueCallback(this.state.inputGroups[id].inputs[id2].value,[id,id2]);
            }
        }
    }
    travelInputsValid(processValidCallback){
        for(let id in this.state.inputGroups){
            for(let id2 in this.state.inputGroups[id].inputs){
                processValidCallback(this.state.inputGroups[id].inputs[id2].valid,[id,id2]);
            }
        }
    }

    updateSelectOptions=(optionsData,selectIdentifier)=>{
        let options = [{
            value:"",
            displayValue:selectIdentifier[1]
        }
        ];
        if(["type","brand"].includes(selectIdentifier[1])){
            optionsData.push("other");
        }
        optionsData.forEach(option=>{
            options.push({
                value:option,
                displayValue:option
            });
        });
        const updatedOptionInputConfig = updateObject(this.state.inputGroups[selectIdentifier[0]].inputs[selectIdentifier[1]].elementConfig,{
            options: options
        });
        const updatedOptionInput = updateObject(this.state.inputGroups[selectIdentifier[0]].inputs[selectIdentifier[1]],{
            elementConfig: updatedOptionInputConfig
        });
        this.setState({inputGroups:this.updateInputs(updatedOptionInput,selectIdentifier)});
    }
    inputChangedHandler=(event,inputIdentifier)=>{
        let changedInput = this.state.inputGroups[inputIdentifier[0]].inputs[inputIdentifier[1]];
        let validateMessages = checkValidity(event.target.value,changedInput.validation);
        const updatedInput = updateObject(changedInput,{
            value:event.target.value,
            validateMessages:validateMessages,
            valid:validateMessages.length === 0,
            touched:true,
        });
        this.setState({inputGroups:this.updateInputs(updatedInput,inputIdentifier)});
        this.setBrandAndTypeOptions(event.target.value,inputIdentifier[1]);
    }
    textEditorChanged=(value,inputIdentifier)=>{
        let changedInput = this.state.inputGroups[inputIdentifier[0]].inputs[inputIdentifier[1]];
        let validateMessages = checkValidity(value.toString('markdown'),changedInput.validation);
        const updatedInput = updateObject(changedInput,{
            value:value,
            validateMessages:validateMessages,
            valid:validateMessages.length === 0,
            touched:true,
        });
        this.setState({inputGroups:this.updateInputs(updatedInput,inputIdentifier)});
    }
    setBrandAndTypeOptions=(value,inputId)=>{

        if(inputId==="category"){
            if(this.state.inputGroups["generalInfoInputs"].inputs["brand"].elementType === "input"){
                setTimeout(()=>this.setState({inputGroups:this.updateInputs(this.state.typeSelectInput,["generalInfoInputs","type"])}));
                setTimeout(()=>this.setState({inputGroups:this.updateInputs(this.state.brandSelectInput,["generalInfoInputs","brand"])}));
            }

            if(value===""){
                setTimeout(()=>this.updateSelectOptions([],["generalInfoInputs","brand"]),300);
                setTimeout(()=>this.updateSelectOptions([],["generalInfoInputs","type"]),300);
            }
            else{
                this.props.onFetchBrands(value,this.updateSelectOptions,["generalInfoInputs","brand"]);
            }
        }else if(inputId==="brand"){
            if(value===""){
                setTimeout(()=>this.updateSelectOptions([],["generalInfoInputs","type"]),300);
            }else if(value==="other"){
                setTimeout(()=>this.setState({inputGroups:this.updateInputs(this.state.brandTextInput,["generalInfoInputs","brand"])}));
                setTimeout(()=>this.updateSelectOptions([],["generalInfoInputs","type"]),300);
            }
            else{
                this.props.onFetchTypes(value,this.state.inputGroups["generalInfoInputs"].inputs["category"].value,
                    this.updateSelectOptions,["generalInfoInputs","type"]);
            }
        }else if(inputId ==="type"){
            if(value==="other"){
                setTimeout(()=>this.setState({inputGroups:this.updateInputs(this.state.typeTextInput,["generalInfoInputs","type"])}));
            }
        }
    }
    updateInputs=(updatedInputElement,inputIdentifier,toUpdateObject)=>{
        if(toUpdateObject=== undefined){
            toUpdateObject = this.state.inputGroups;
        }
        const updatedInputs = updateObject(toUpdateObject[inputIdentifier[0]].inputs,{
            [inputIdentifier[1]]:updatedInputElement
        });
        const updatedInputsGroup = updateObject(toUpdateObject[inputIdentifier[0]],{
            inputs:updatedInputs
        });
        return updateObject(toUpdateObject, {
           [inputIdentifier[0]]: updatedInputsGroup
       });
    }
    onSubmitHandler=(event)=>{
        event.preventDefault();
        if(!this.formIsValid()){
            this.validateForm();
        }else{
           this.setState({createAdRequestSent:true});
           let payload = this.collectInputsData();
           if(this.props.match.params.id){
               this.props.onUpdateAd(payload,this.props.match.params.id,this.props.token);
           }else{
                this.props.onCreateAd(payload,this.props.token);
           }
        }
    }
    afterSubmitHandler=(event)=>{
        this.setState({modalShow:false});
        this.props.history.replace("/");
    }

    onChangeImage = (imageList, addUpdateIndex) => {
        if(addUpdateIndex!==undefined){
            addUpdateIndex.forEach(i=>{
                if(imageList[i]!=null){
                    let inputFile = imageList[i].file;
                    imageList[i].file =
                        new File([inputFile], "newAdImage" + new Date().getMilliseconds().toString()+i, {type: inputFile.type});

                }
            });
        }
        this.setState({images:imageList});
    };

    render() {
        const inputGroupsArray =[];
        for(let key in this.state.inputGroups){
            let inputsArray = [];
            for(let key2 in this.state.inputGroups[key].inputs){
                inputsArray.push({
                        id: key2,
                        config: this.state.inputGroups[key].inputs[key2]
                    }
                )
            }
            inputGroupsArray.push({
                id:key,
                name:this.state.inputGroups[key].name,
                inputs:inputsArray
            });
        }
        let inputs = (
            <React.Fragment>
                {inputGroupsArray.map(group =>{
                    return (
                        <div key={group.id} className={classes.InputGroup}>
                            <span>{group.name}</span>
                            <div className={classes.GroupInputs}>
                                {
                                    group.inputs.map(input=>{
                                        if(input.config.elementType==="textEditor"){
                                            return (
                                                <Input
                                                    title={input.config.title}
                                                    key={input.id}
                                                    id={input.id}
                                                    elementType={input.config.elementType}
                                                    textEditor
                                                    elementConfig={input.config.elementConfig}
                                                    value={input.config.value}
                                                    invalid={!input.config.valid}
                                                    touched={input.config.touched}
                                                    shouldValidate={input.config.validation}
                                                    textAreaWidth={"760px"}
                                                    changed={(value)=>this.textEditorChanged(value,[group.id,input.id])}
                                                    validateMessages={input.config.validateMessages}
                                                />
                                            )
                                        }
                                        else{
                                            return (
                                                <Input
                                                    title={input.config.title}
                                                    key={input.id}
                                                    id={input.id}
                                                    elementType={input.config.elementType}
                                                    elementConfig={input.config.elementConfig}
                                                    value={input.config.value}
                                                    invalid={!input.config.valid}
                                                    touched={input.config.touched}
                                                    shouldValidate={input.config.validation}
                                                    changed={(event)=>this.inputChangedHandler(event,[group.id,input.id])}
                                                    validateMessages={input.config.validateMessages}
                                                />
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>

                    );
                })}
            </React.Fragment>
        )

        let createResultMessage = <Spinner/>;
        if(this.props.loading === false && this.props.error === null){
            createResultMessage = <p>Ad successfully created</p>;
        }else if(this.props.error){
            createResultMessage = <p>{this.props.error}</p>;
        }
        let notification =this.state.createAdRequestSent===true?<Notification error={this.props.error}
                                                 message={createResultMessage} okBtnCLicked={this.afterSubmitHandler}/> : null;
        return (
            <div className={classes.AdCreator}>
                <ImageUploading
                    multiple
                    value={this.state.images}
                    onChange={this.onChangeImage}
                    maxNumber={this.state.maxNumber}
                    dataURLKey="data_url"
                    acceptType={this.state.acceptTypes}
                    maxFileSize={1024*this.state.maxFileSizeInKB}
                >
                    {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps,
                          errors
                      }) => (
                        <ImageUploaderUI
                            imageList={imageList}
                            onImageUpload={onImageUpload}
                            onImageRemoveAll={onImageRemoveAll}
                            onImageUpdate={onImageUpdate}
                            onImageRemove={onImageRemove}
                            isDragging={isDragging}
                            dragProps={dragProps}
                            errors={errors}
                            maxNumber={this.state.maxFileSizeInKB}
                            acceptTypes={this.state.acceptTypes}
                            maxFileSizeInKB={this.state.maxFileSizeInKB}
                        />
                    )}
                </ImageUploading>
                <form className={classes.InputForm} onSubmit={(event)=>this.onSubmitHandler(event)}>
                    <div className={classes.Inputs}>
                        {inputs}
                    </div>
                        <Button btnType={"Success"}>Submit</Button>
                </form>
                {notification}
            </div>
        );
    }
}
const mapStateToProps =  state => {
    return {
        loading:state.ad.loading,
        error:state.ad.createAdError,
        adDetails:state.ad.adDetails,
        adData:state.ad.adData,
        authenticatedUser:state.auth.username,
        token:state.auth.token,
        currency:state.currency.currency
    };
};
const mapDispatchProps = dispatch=>{
    return{
        onFetchBrands:  (categoryName,callBack,inputId)=>dispatch(actions.fetchBrands(categoryName,callBack,inputId)),
        onFetchTypes:  (brandName,category,callBack,inputId)=>dispatch(actions.fetchTypes(brandName,category,callBack,inputId)),
        onCreateAd:  (payload,token)=>dispatch(actions.createAd(payload,token)),
        onUpdateAd:  (payload,id,token)=>dispatch(actions.updateAd(payload,id,token))
    };
};
export default connect(mapStateToProps,mapDispatchProps)(withRouter(AdCreator));
