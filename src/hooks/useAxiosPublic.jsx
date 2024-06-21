import axios from "axios";

const axiosPublic = axios.create({
    baseURL : 'https://uni-reside-server.vercel.app'
})

const useAxiosPublic = () => {
    return (
        axiosPublic
    );
};

export default useAxiosPublic;