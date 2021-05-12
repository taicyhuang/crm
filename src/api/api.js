import axios from "axios";
// import qs from "qs";
const baseURL = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    // baseURL: "http://139.162.107.53/api/"
    // baseURL: "http://172.104.125.38/api/"
});
export const apiLogin = (data) => baseURL.post("login", data);
