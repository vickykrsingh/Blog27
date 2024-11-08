import axios from "axios";
sessionStorage.setItem('token','vickykrsingh27@gmail.com')
const token = sessionStorage.getItem('token')
export const axiosInstance = axios.create({
    baseURL:'http://localhost:8000',
    headers:{
        Authorization:`Bearer ${token}`
    }
})