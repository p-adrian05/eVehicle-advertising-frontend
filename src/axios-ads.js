import axios from "axios";

export const BASE_URL = "http://localhost:8080/api/";
export const auth_header = (token)=>{
    return {
        'Authorization': `Bearer ${token}`
    }
}
const instance = axios.create({
    baseURL:BASE_URL
});
export default instance;
