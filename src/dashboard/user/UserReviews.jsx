import React, { useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

const UserReviews = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: reviews } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?email=${user?.email}`)
            return res.data;
        },
        enabled: !!user?.email
    })
    const handleNavigate = (id) => {
        navigate(`/meal/${id}`)
    }
    console.log(reviews);
    return (
        <div>
            <div className="overflow-x-auto px-6 font-roboto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Review</th>
                            <th>Action</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            reviews?.map((meal, idx) => <tr key={meal._id}>
                                <th>{idx + 1}</th>
                                <td>{meal?.title}</td>
                                <td>{meal?.likes}</td>
                                <td>{meal?.review}</td>
                                <td><button className='underline'>Edit</button></td>
                                <td><button className='btn text-xl'><MdDelete /></button></td>
                                <td onClick={() => handleNavigate(meal?.mealId)} className='btn my-2'><button>View Meal</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserReviews;