import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import Heading from '../../components/Heading';
import Swal from 'sweetalert2';

// TODO : implement update and delete
const AllMeals = () => {
    const [sortedMeals, setSortedMeals] = useState([]);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: allMeals, refetch } = useQuery({
        queryKey: ['allMeals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-meals');
            return res.data;
        },
    })
    console.log(allMeals);

    const handleSort = async (event) => {
        const sortValue = event.target.value;
        console.log(sortValue);
        const sort = [...allMeals].sort((a, b) => {
            if (sortValue === 'likes') {
                return b.likes - a.likes;
            }
            else if (sortValue === 'reviews') {
                return parseInt(b.reviews) - parseInt(a.reviews)
            }
            else {
                return [...allMeals]
            }
        })
        setSortedMeals(sort);
    }

    const handleNavigate = (id) => {
        navigate(`/meal/${id}`)
    }
    const handleDelete = async (id) => {
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
                const res = await axiosSecure.delete(`/delete-meal?id=${id}`)
                console.log(res.data);
                if (res.data.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your meal has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }

            }
        });


    }
    // form update
    const handleUpdateNavigate = (id) => {
        navigate(`update-meal/${id}`)
    }

    return (
        <div>
            <Heading title={'Meals'}></Heading>
            <div className="overflow-x-auto px-6 font-roboto">
                <div className='w-full text-end'>
                    <select onChange={handleSort} className="bg-gray-200 py-3 px-2 border-2 border-opacity-80 " name="" id="">
                        <option value="all">Sort By</option>
                        <option value="likes">Likes</option>
                        <option value="reviews">Reviews</option>
                    </select>
                </div>
                
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
                            (sortedMeals.length > 0 ? sortedMeals : allMeals)?.map((meal, idx) => <tr key={meal._id}>
                                <th>{idx + 1}</th>
                                <td>{meal?.title}</td>
                                <td>{meal?.likes}</td>
                                <td>{meal?.reviews}</td>
                                <td>{meal?.adminName}</td>
                                <td onClick={() => handleUpdateNavigate(meal?._id)} className='btn my-2'>Update</td>
                                <td onClick={() => handleDelete(meal?._id)}><button className='btn text-xl'><MdDelete /></button></td>
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