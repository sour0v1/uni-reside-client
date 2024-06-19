import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import { IoSearch } from 'react-icons/io5';
import Heading from '../../components/Heading';

const ManageUser = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { data, isPending, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-users`)
            return res.data;
        },
    })
    // setUsers(data);
    // console.log(users);
    const handleMakeAdmin = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/update-user?email=${email}`)
                    .then(result => {
                        console.log(result.data)
                        if (result.data.modifiedCount) {
                            Swal.fire({
                                title: "Success!",
                                text: "Made admin successfully!",
                                icon: "success"
                            });
                            refetch();
                        }

                    })
            }
        });
    }
    const handleSearch = async (event) => {
        const searchValue = event.target.value;
        console.log(searchValue);

        if(searchValue){
            setCount(true);
        }
        else{
            setCount(false);
        }

        const res = await axiosSecure.get(`/user-search?searchValue=${searchValue}`)
        console.log(res.data);
        setUsers(res.data);
    }
    if (isPending) {
        return <p>loading...</p>
    }
    return (
        <div>
            <Heading title={'Manage Users'}></Heading>
            <div className="overflow-x-auto px-6 font-roboto">
                <div className='flex justify-center items-center relative w-full text-center border'>
                    <div className='lg:w-2/3 relative'>
                        <input onChange={handleSearch} className='w-full py-2 px-3 bg-gray-200 my-3 rounded-full' type="text" placeholder='Email or UserName'/>
                        <span className='absolute text-xl right-4 top-5 opacity-70'><IoSearch /></span>
                    </div>
                </div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Subscription</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            (count ? users : data)?.map((user, idx) => <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.badge}</td>
                                <td>{user?.role}</td>
                                {
                                    user?.role === 'user' &&
                                    <td onClick={() => handleMakeAdmin(user?.email)} className='btn my-3'>Make Admin</td>
                                }
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;