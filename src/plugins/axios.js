import axios from "axios";
import Cookies from "js-cookie";

const axiosRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
})

axiosRequest.interceptors.request.use((config) => {
    if(Cookies.get("user_token")) config.headers.Authorization = `Bearer ${Cookies.get("user_token")}`
})

export default axiosRequest