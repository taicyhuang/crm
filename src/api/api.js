import axios from "axios";
// import qs from "qs";
const baseURL = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",

});
export const apiLogin = (data) => baseURL.post("login", data);
