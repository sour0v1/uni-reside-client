import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Heading from '../../components/Heading';
import Swal from 'sweetalert2';

const RequestedMeals = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: meals, refetch } = useQuery({
        queryKey: ['reqMeals'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requested-meals?email=${user?.email}`)
            return res.data;
        },
        enabled: !!user?.email
    })
    // console.log(meals);
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel Request!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/delete-request?id=${id}`)
                // console.log(res.data);
                if (res.data.deletedCount) {
                    Swal.fire({
                        title: "Success!",
                        text: "Review deleted successfully!.",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    }
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
                                meals?.map((meal, idx) => <tr key={meal._id}>
                                    <th>{idx + 1}</th>
                                    <td>{meal?.title}</td>
                                    <td>{meal?.likes}</td>
                                    <td>{meal?.reviews}</td>
                                    <td className={`${meal?.status === 'delivered' ? 'text-green-600' : 'text-orange-600'}`}>{meal?.status}</td>
                                    <td onClick={() => handleDelete(meal?._id)} className='btn my-2'>Cancel</td>
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