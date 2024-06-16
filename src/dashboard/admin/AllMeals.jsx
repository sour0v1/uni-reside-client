import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

// TODO : implement update and delete
const AllMeals = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: allMeals } = useQuery({
        queryKey: ['allMeals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-meals');
            return res.data;
        },
    })
    console.log(allMeals);

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
                            <th>Distributor</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            allMeals?.map((meal, idx) => <tr key={meal._id}>
                                <th>{idx + 1}</th>
                                <td>{meal?.title}</td>
                                <td>{meal?.likes}</td>
                                <td>{meal?.reviews}</td>
                                <td>{meal?.adminName}</td>
                                <td className='btn my-2'>Update</td>
                                <td><button className='btn text-xl'><MdDelete /></button></td>
                                <td onClick={() => handleNavigate(meal?._id)} className='btn my-2'><button>View Meal</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMeals;