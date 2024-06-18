import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Heading from '../../components/Heading';

const RequestedMeals = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: meals } = useQuery({
        queryKey: ['reqMeals'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requested-meals?email=${user?.email}`)
            return res.data;
        },
        enabled: !!user?.email
    })
    console.log(meals);
    return (
        <div>
            <Heading title={'Requested Meals'}></Heading>
            {
                meals?.length > 0 ? <div className="overflow-x-auto px-6 font-roboto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Reviews</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            meals?.map((meal,idx) => <tr key={meal._id}>
                                <th>{idx + 1}</th>
                                <td>{meal?.title}</td>
                                <td>{meal?.likes}</td>
                                <td>{meal?.reviews}</td>
                                <td>{meal?.status}</td>
                                <td className='btn my-2'>Cancel</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div> : 
            <div className='w-full text-center'>
                <h1 className='text-2xl'>You have not requested any food yet.</h1>
            </div>
            }
        </div>
    );
};

export default RequestedMeals;