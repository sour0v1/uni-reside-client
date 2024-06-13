import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { AuthContext } from '../../provider/AuthProvider';

const MealDetails = () => {
    const { user } = useContext(AuthContext);
    const [count, setCount] = useState(0);
    const [isDisable, setIsDisable] = useState(false);
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    console.log(id);
    const { data: meal, isPending, refetch } = useQuery({
        queryKey: ['meal'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meal/details/?id=${id}`);
            return res.data;
        },
        enabled: !!id
    })
    // request meal
    const handleRequest = async(id) => {
        const res = await axiosSecure.get(`/user?userEmail=${user?.email}`)
        // console.log(res.data);
        const userInfo = res.data;
        if(res.data.badge === 'silver' || res.data.badge === 'gold' || res.data.badge === 'bronze'){
           console.log('true');
           const res = await axiosSecure.post(`/request-meal?id=${id}`, userInfo)
           console.log(res.data);
        }
        console.log('false')
    }
    // update 
    const handleLike = async (id) => {
        setCount(count + 1);
        setIsDisable(true);
        const likeRes = await axiosSecure.post(`/check-like?id=${id}&email=${user?.email}`)
        console.log(likeRes.data);
        if (likeRes.data.insertedId) {
            const res = await axiosSecure.put(`/update/meal/?id=${id}&email=${user?.email}&like=${count}`)
            console.log('bbb- ', res.data);
            if (res.data.modifiedCount) {
                refetch();
                return;
            }
        }
        if(likeRes.data.isLiked){
            // localStorage.setItem('isLiked', likeRes.data.isLiked);
            console.log('already liked');
        }

    }
    //    console.log(meal);
    // const {image, title, category, rating, ingradients, price} = meal;
    if (isPending) {
        return <p>Loading...</p>
    }
    return (
        <div className='py-24 max-w-5xl mx-auto font-roboto space-y-3'>

            <img className='h-[500px] w-full' src={meal?.image} alt="meal-food" />
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>{meal?.title}</h1>
                <div className='flex justify-center items-center gap-3'>
                    <button onClick={() => handleLike(meal?._id)} className='btn px-6 text-xl'>{meal.isLiked ? <AiFillLike />: <AiOutlineLike />}<span>{meal?.likes}</span></button>
                    <button onClick={() => handleRequest(meal?._id)} className='btn px-6 text-xl'><span>Request</span></button>
                </div>
            </div>
            <p>{meal?.description}</p>
        </div>
    );
};

export default MealDetails;