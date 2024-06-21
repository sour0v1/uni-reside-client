import axios from "axios";

const axiosPublic = axios.create({
    baseURL : 'https://uni-reside.web.app'
})

const useAxiosPublic = () => {
    return (
        axiosPublic
    );
};

export default useAxiosPublic;