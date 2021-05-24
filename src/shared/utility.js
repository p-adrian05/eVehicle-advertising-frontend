import axios from "../axios-ads";

export const updateObject = (oldObject,updatedProperties)=>{
    return{
        ...oldObject,
        ...updatedProperties
    };
};
let whitespaces = [9, 10, 11, 12, 13, 32,35, 38,  133, 160,
    5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198,
    8199, 8200, 8201, 8202, 8203, 8232, 8233, 8239, 8287,
    12288];
export const checkValidity = (value,rules) =>{
    console.log(value);
    let messages = [];
    if(rules.required){
       let s = value.toString().split('').filter(c => !whitespaces.includes(c.charCodeAt(0)));
        if(s.length===0){
            messages.push(" Cannot be empty");
        }
    }else if(value===""){
        return messages;
    }
    if(rules.minLength){
        if(value.length < rules.minLength){
            messages.push(" Length must be at least:" +rules.minLength);
        }
    }
    if(rules.maxLength) {
        if(value.length > rules.maxLength){

            messages.push(" Length must be max:" +rules.maxLength);
        }
    }
    if(rules.isEmail){
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if(!pattern.test(value)){
            messages.push(" Invalid email");
        }
    }
    if(rules.isPassword){
        const p1 = /(?=.*[0-9])/;
        const p2 = /(?=.*[a-z])/;
        const p3 = /(?=.*[A-Z])/;
        const p4 = /(?=.*[@#$%^&+=])/;
        const p5 = /(?=\S+$)/;
        if(!p1.test(value)){
            messages.push(" a digit must occur at least once");
        }
        if(!p2.test(value)){
            messages.push(" a lower case letter must occur at least once");
        }
        if(!p3.test(value)){
            messages.push(" an upper case letter must occur at least once");
        }
        if(!p4.test(value)){
            messages.push("  a special character must occur at least once");
        }
        if(!p5.test(value)){
            messages.push(" no whitespace allowed");
        }
    }
    if(rules.min){
        if(value<rules.min){
            messages.push("Value must be min: "+rules.min);
        }
    }
    if(rules.max){
        if(value>rules.max){
            messages.push("Value must be max: "+rules.max);
        }
    }
    if(rules.onlyLetters){
        const pattern = /^[A-Za-z]*$/;
        if(!pattern.test(value)){
            messages.push(" Only letters accepted.");
        }
    }
    return messages;
}

export const convertSearchParamsToObject = (searchParams)=>{
    return Object.fromEntries(new URLSearchParams(searchParams));
};
export const extractPageNumber = (queryParams)=>{
    let params = convertSearchParamsToObject(queryParams);
    let pageParam = 0;
    if(!isEqual(params,{})){
        if(params["page"]){
            pageParam = params["page"]-1;
        }
    }
    return pageParam
};
export const convertSearchParamsFromObject = (searchDataObject)=>{
    return Object.keys(searchDataObject).map(key => key + '=' + searchDataObject[key]).join('&')
};
export const formatNumber=(num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
export const isEqual=(a1,a2) =>{
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1)===JSON.stringify(a2);
}
export const formatDate=(date)=>{
    if(date.toString().match(/(^([0-9]{4})(-[0-9]{2}){2}T(([0-9]{2}:){2})[0-9]{2})/)){
        let dateData = date.split("T");
        let time = dateData[1].substr(0,8);
        return dateData[0]+" "+time;
    }
    return date;
}
