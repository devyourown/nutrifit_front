import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export function setAuthToken(token: string) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}