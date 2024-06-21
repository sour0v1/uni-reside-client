import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data : isAdmin, isPending : isLoading} = useQuery({
        queryKey : ['isAdmin'],
        queryFn : async () => {
            const res = await axiosSecure.get(`isAdmin?email=${user?.email}`)
            return res?.data?.isAdmin;
        }
    })
    // console.log(isAdmin)
    return [isAdmin, isLoading];
};

export default useAdmin;