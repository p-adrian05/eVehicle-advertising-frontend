
import classes from "./Input.module.css";
import RichTextEditor from 'react-rte';
import React, {Component, PropTypes} from 'react';
const input = (props)=>{
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }
    let textAreaWidth = null;
    if(props.textAreaWidth!==undefined){
        textAreaWidth = props.textAreaWidth;

    }else{
        textAreaWidth ="300px";
    }
    switch (props.elementType){
        case ('input'):
            inputElement = <input
                id={props.id}
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                onClick={props.clicked}
            />;
            break;
        case ('textEditor'):
            inputElement =
                <div style={{width:textAreaWidth}} >
                    <RichTextEditor className={classes.TextEditor}
                                    value={props.value!==''? props.value: RichTextEditor.createEmptyValue()}
                                    onChange={props.changed}
                    />
                </div>

            break;
        case ('textarea'):
            inputElement = <textarea
                id={props.id}
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onClick={props.clicked}
                onChange={props.changed}
                style={{width:textAreaWidth}}/>
            break;
        case ('select'):
            inputElement =
                <select
                    id={props.id}
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onClick={props.clicked}
                onChange={props.changed}>
                    {props.elementConfig.options.map(option=> {
                               return <option key={option.value} value={option.value} >{option.displayValue}</option>;
                        })
                    }
                 </select>;
            break;
        default:
            inputElement = <input
                id={props.id}
                className={inputClasses.join(" ")}
                onChange={props.changed}
                onClick={props.clicked}
                {...props.elementConfig}
                value={props.value}/>;
    }
    let labels = props.validateMessages.map(m=>{
        return (<span key={m} className={classes.Label}>{m}</span>);
    });
    let title = null;
    if(props.title){
        title=<div className={classes.Title}>
            <span>{props.title}</span>
        </div>
    }

    return(
            <div className={classes.Input}>
                {title}
                {labels}
                {inputElement}
            </div>
        );
};
export default input;
