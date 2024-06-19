import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import Heading from '../../components/Heading';
import { FaRegEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

const UserReviews = () => {
    const { user } = useContext(AuthContext);
    const [reviewValue, setReviewValue] = useState('');
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: reviews, refetch } = useQuery({
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
    // console.log(reviews);
    console.log('review value -', reviewValue)
    const handleReviewValue = (event) => {
        const value = event.target.value;
        setReviewValue(value);
    }
    const handleEdit = async (id) => {
        const res = await axiosSecure.put(`/edit-reviews?id=${id}&value=${reviewValue}`)
        console.log(res.data);
        if (res.data.modifiedCount) {
            Swal.fire({
                title: "Updated!",
                text: "Review updated successfully!.",
                icon: "success"
            });
            refetch();
        }
    }
    const handleDelete = async (id) => {
        const res = await axiosSecure.delete(`/delete-review?id=${id}`)
        console.log(res.data);
        if (res.data.deletedCount) {
            Swal.fire({
                title: "Success!",
                text: "Review deleted successfully!.",
                icon: "success"
            });
            refetch();
        }
    }
    return (
        <div>
            <Heading title={'Reviews'}></Heading>
            {
                reviews?.length > 0 ?
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
                                        <td>

                                            <label htmlFor="my_modal_7" className="text-xl btn"><FaRegEdit /></label>
                                            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                                            <div className="modal" role="dialog">
                                                <div className="modal-box">
                                                    <textarea onChange={handleReviewValue} id='review' className='bg-gray-200 w-full outline-none px-3 py-2' cols={3} rows={3} defaultValue={meal?.review}></textarea>
                                                    <div className='w-full text-end'>
                                                        <button onClick={() => handleEdit(meal?._id)} className='btn'>Update</button>
                                                    </div>
                                                </div>
                                                <label className="modal-backdrop" htmlFor="my_modal_7"></label>

                                            </div>


                                        </td>
                                        <td onClick={() => handleDelete(meal?._id)}><button className='btn text-xl'><MdDelete /></button></td>
                                        <td onClick={() => handleNavigate(meal?.mealId)} className='btn my-2'><button>View Meal</button></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div> :
                    <div className='w-full text-center'>
                        <h1 className='text-2xl'>No Reviews Posted.</h1>
                    </div>
            }
        </div>
    );
};

export default UserReviews;