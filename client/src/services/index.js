import axiosInstance from "../utils/axiosInstance";

export const signInService = async (formData) => {
    const {data} = await axiosInstance.post('/api/auth/sign-in',formData);
    return data;
}

export const signUpService = async (formData) => {
    const {data} = await axiosInstance.post('/api/auth/sign-up',formData)
    return data;
}