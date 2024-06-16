import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import Heading from '../../components/Heading';

const UserProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { data: userInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?userEmail=${user?.email}`)
            return res.data;
        },
        enabled: !!user?.email
    })
    console.log(userInfo);
    return (
        <div>
            <Heading title={'Profile'}></Heading>
            <div className='flex justify-center items-center'>
                <div className='w-2/3 p-9 shadow-lg flex flex-col justify-center items-center gap-3 font-medium'>
                    <img className='w-36 h-36 rounded-full' src={userInfo?.image} alt="" />
                    <h1>Name : {userInfo?.name}</h1>
                    <h1>Email : {userInfo?.email}</h1>
                    <h1>Badge : {userInfo?.badge}</h1>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;