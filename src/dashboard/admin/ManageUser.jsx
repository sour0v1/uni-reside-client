import React, { useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';

const ManageUser = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: users, isPending, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-users`)
            return res.data;
        },
    })
    // console.log(users);
    const handleMakeAdmin = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
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
    if (isPending) {
        return <p>loading...</p>
    }
    return (
        <div>
            <div className="overflow-x-auto px-6 font-roboto">
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
                            users?.map((user, idx) => <tr key={user._id}>
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