import axiosInstance from "../utils/axiosInstance";

export const signInService = async (formData) => {
    const {data} = await axiosInstance.post('/api/auth/sign-in',formData);
    return data;
}

export const signUpService = async (formData) => {
    const {data} = await axiosInstance.post('/api/auth/sign-up',formData)
    return data;
}

export const forgotPasswordService = async (formData) => {
    const {data} = await axiosInstance.post('/api/auth/forgot-password',formData);
    return data;
}

export const resetPasswordService = async (formData,token) => {
    const {data} = await axiosInstance.post(`/api/auth/reset-password/${token}`,formData);
    return data;
}

export const checkAuthService = async () => {
    const {data} = await axiosInstance.get('/api/auth/check-auth');
    return data;
}

export const logoutService = async () => {
    const {data} = await axiosInstance.get('/api/auth/logout');
    return data;
}