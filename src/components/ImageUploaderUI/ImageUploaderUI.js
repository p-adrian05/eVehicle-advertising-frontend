import React from "react";
import Button from "../UI/Button/Button"
import classes from "./ImageUploaderUI.module.css";

const imageUploaderUI = (props)=>{

        return (
            <div className={classes.ImageUploader}>
                        <div>
                            <div>
                                <div
                                    style={props.isDragging ? { backgroundColor: "#BDBDBD" } : null}
                                    className={classes.UploadButton}
                                    onClick={props.onImageUpload}
                                    {...props.dragProps}
                                >
                                    Click or Drop for uploading image
                                </div>
                                <div className={classes.Images}>
                                    {props.imageList.map((image, index) => (
                                        <div key={index} className={classes.Image}>
                                            <img src={image.data_url} alt=""/>
                                            <div className={classes.ImageInfo}>
                                                <span className={classes.CoverImageLabel}>{index===0 ? "Cover image": null} </span>
                                                <span>{Math.round(image.file.size/1024)} kB</span>
                                            </div>
                                            <div className={classes.ImageButtons}>
                                                <a onClick={() => props.onImageUpdate(index)} >Update</a>
                                                <a  className={classes.RemoveButton} onClick={() => props.onImageRemove(index)}>Remove</a>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            </div>
                            {
                                props.imageList.length>0 ?  <Button btnType={"Danger"} clicked={props.onImageRemoveAll}>Remove all images</Button> : null
                            }
                            {
                                props.errors!==null ?
                                    <div className={classes.ErrorMessages}>
                                        {props.errors.maxNumber && <span>Number of selected images exceed {props.maxNumber}</span>}
                                        {props.errors.acceptType && <span>Your selected file type is not allow. Allowed: {props.acceptTypes.join(" ")}</span>}
                                        {props.errors.maxFileSize && <span>Selected file size exceed {props.maxFileSizeInKB} kB</span>}
                                    </div>
                                    : null
                            }
                        </div>

            </div>
        );
}

export default imageUploaderUI;
