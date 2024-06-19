import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Heading from '../../components/Heading';
import Swal from 'sweetalert2';

const Reviews = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: reviews, refetch } = useQuery({
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
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/delete-review?id=${id}`)
                if (res.data.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your review has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }

            }
        });
    }
    return (
        <div>
            <Heading title={'Reviews'}></Heading>
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
                                <td onClick={() => handleDelete(review?._id)}><button className='btn text-xl'><MdDelete /></button></td>
                                <td onClick={() => handleNavigate(review?.mealId)} className='btn my-2'><button>View Meal</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reviews;