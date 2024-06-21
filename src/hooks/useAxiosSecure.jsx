import axios from "axios";
import { signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import auth from "../firebase/firebase.config";

const axiosSecure = axios.create({
    baseURL: 'https://uni-reside.web.app', withCredentials: true
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    axiosSecure.interceptors.response.use((response) => {
        // console.log(response)
        return response;
    }, async (error) => {
        const status = error?.response.status;
        // console.log(status);
        if (status === 401 || status === 403) {
            // console.log('hello');
            await signOut(auth);
            navigate('/login')

        }

        return Promise.reject(error);
    })

    return axiosSecure
};

export default useAxiosSecure;