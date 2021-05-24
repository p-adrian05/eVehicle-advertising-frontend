import React from "react";
import Input from "../../../components/UI/Input/Input";
import classes from "./SearchFromToInput.module.css";

const searchFromToInput = (props)=> {

    let spanCount = 0;

        let inputs = (
            <React.Fragment>
                {props.inputElements.map(inputElement => {
                    spanCount++;
                    return (
                        <React.Fragment>
                        <Input
                            key={inputElement.id}
                            elementType={inputElement.config.elementType}
                            elementConfig={inputElement.config.elementConfig}
                            value={inputElement.config.value}
                            invalid={!inputElement.config.valid}
                            touched={inputElement.config.touched}
                            shouldValidate={inputElement.config.validation}
                            changed={(event) => props.click(event, inputElement.id)}
                            clicked={null}
                            validateMessages={inputElement.config.validateMessages}
                        />
                            {spanCount===1 ? <span className={classes.spanBetween}>&#8208;</span>: null}
                        </React.Fragment>
                    );
                })}
            </React.Fragment>
        )
        return (
            <div className={classes.SearchInput}>
                <span className={classes.title}>{props.title}</span>
                <div>
                    {inputs}
                </div>

            </div>
        );

}
export default searchFromToInput;