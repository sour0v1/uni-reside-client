
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { IoSearch } from 'react-icons/io5';
import Heading from '../../components/Heading';
import Swal from 'sweetalert2';

const ServeMeals = () => {
    const axiosSecure = useAxiosSecure();
    const [searchMeals, setSearchMeals] = useState([]);
    const [count, setCount] = useState(false);
    const { data: requestedMeals, refetch } = useQuery({
        queryKey: ['requestedMeals'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-requested-meals`)
            return res.data;
        },
    })
    console.log(requestedMeals);
    const handleStatus = async (id, email) => {
        const res = await axiosSecure.put(`/update-status?id=${id}&email=${email}`)
        console.log(res.data);
        if (res.data.modifiedCount) {
            Swal.fire({
                title: "Success",
                text: "Meal delivered",
                icon: "success"
            });
            refetch();
        }

    }
    const handleSearch = async (event) => {
        const searchValue = event.target.value;
        console.log(searchValue);

        if (searchValue) {
            setCount(true);
        }
        else {
            setCount(false);
        }

        const res = await axiosSecure.get(`/requested-meal-search?searchValue=${searchValue}`)
        console.log(res.data);
        setSearchMeals(res.data);
    }
    return (
        <div>
            <Heading title={'Serve Meals'}></Heading>
            <div className="overflow-x-auto px-6 font-roboto">
                <div className='flex justify-center items-center relative w-full text-center border'>
                    <div className='lg:w-2/3 relative'>
                        <input onChange={handleSearch} className='w-full py-2 px-3 bg-gray-200 my-3 rounded-full' type="text" placeholder='Email or UserName' />
                        <span className='absolute text-xl right-4 top-5 opacity-70'><IoSearch /></span>
                    </div>
                </div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>User Email</th>
                            <th>Username</th>
                            <th>status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            (count ? searchMeals : requestedMeals)?.map((meal, idx) => <tr key={meal._id}>
                                <th>{idx + 1}</th>
                                <td>{meal?.title}</td>
                                <td>{meal?.userEmail}</td>
                                <td>{meal?.userName}</td>
                                <td className={`${meal?.status === 'delivered' ? 'text-green-600' : 'text-orange-600'}`}>{meal?.status}</td>
                                {
                                    meal?.status === 'pending' && <td onClick={() => handleStatus(meal?.mealId, meal?.userEmail)} className='btn my-3 ml-3'>Serve</td>
                                }
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServeMeals;