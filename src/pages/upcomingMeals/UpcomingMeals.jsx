import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AiOutlineLike } from 'react-icons/ai';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';

const UpcomingMeals = () => {
    const axiosPublic = useAxiosPublic();
    const [pageNo, setPageNo] = useState(1);
    // const [upcomingMeals, setUpcomingMeals] = useState([]);
    // const [totalPage, setTotalPage] = useState(1)
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: upcomingMeals, refetch } = useQuery({
        queryKey: ['upcomingMeals', pageNo],
        queryFn: async () => {
            const res = await axiosPublic.get(`/upcoming-meals?page=${pageNo}&limit=${9}`)
            return res.data;
        },
        enabled: !!pageNo,
        refetchInterval : 500
    })
    console.log('hhhh -', upcomingMeals)

    const handlePageChange = (newPagNo) => {
        setPageNo(newPagNo);
    }

    const { data: userBadge } = useQuery({
        queryKey: ['badge'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-badge?userEmail=${user?.email}`)
            return res.data.badge;
        },
        enabled: !!user?.email
    })
    console.log(userBadge);

    const handleLike = async (id) => {
        console.log(id);
        if (userBadge === 'silver' || userBadge === 'gold' || userBadge === 'platinum') {
            const res = await axiosSecure.post(`/up-like?id=${id}&userEmail=${user?.email}`);
            toast(res.data.message);
            // refetch();
        }
        else {
            Swal.fire({
                title: "Oops",
                text: "Subscribe a package to like",
                icon: "question"
            });
        }

    }
    return (
        <div className='pt-24 max-w-5xl mx-auto font-roboto mb-9'>
            <h1 className='w-full text-center text-2xl font-bold mb-9 mt-3'>Upcoming Meals</h1>
            <div className='grid grid-cols-3 gap-6'>
                {
                    upcomingMeals?.result?.map(meal => <div key={meal?._id} className=" bg-base-100 shadow-xl">
                        <figure><img src={meal?.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <div className='flex justify-between items-center'>
                                <h2 className="card-title">
                                    {meal?.title}
                                </h2>
                                <button onClick={() => handleLike(meal?._id)} className='btn text-xl'><AiOutlineLike /><span>{meal?.likes}</span></button>
                            </div>
                            <div>
                                <p>Category : <span>{meal?.category}</span></p>
                                <p>Price : $<span>{meal?.price}</span></p>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <div className='w-full flex justify-center items-center gap-9 my-6'>
                <button onClick={() => handlePageChange(pageNo - 1)} disabled = {pageNo === 1} className='btn flex justify-center items-center gap-2'>
                    <span className='text-xl'><GrPrevious /></span>
                    <span>Prev</span>
                </button>
                <button onClick={() => handlePageChange(pageNo + 1)} disabled = {pageNo === upcomingMeals?.totalPage} className='btn flex justify-center items-center gap-2'>
                    <span>Next</span>
                    <span className='text-xl'><GrNext /></span>
                </button>

            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default UpcomingMeals;