import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Reviews = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: reviews } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-reviews`)
            return res.data;
        },
    })
    console.log(reviews);
    const handleNavigate = (id) => {
        navigate(`/meal/${id}`)
    }
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
                            <th>Reviews</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            reviews?.map((review, idx) => <tr key={review._id}>
                                <th>{idx + 1}</th>
                                <td>{review?.title}</td>
                                <td>{review?.likes}</td>
                                <td>{review?.review}</td>
                                <td><button className='btn text-xl'><MdDelete /></button></td>
                                <td className='btn my-2'><button onClick={() => handleNavigate(review?.mealId)}>View Meal</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reviews;