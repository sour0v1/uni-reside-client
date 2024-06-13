import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AiOutlineLike } from 'react-icons/ai';
import { AuthContext } from '../../provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MealDetails = () => {
    const { user } = useContext(AuthContext);
    // const [count, setCount] = useState('')
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    console.log(id);
    // all meals
    const { data: meal, isPending, refetch } = useQuery({
        queryKey: ['meal'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meal/details/?id=${id}`);
            return res.data;
        },
        enabled: !!id
    })
    // handle like
    const handleLike = async (id) => {
        console.log(id);
        const res = await axiosSecure.post(`/like?mealId=${id}&userEmail=${user?.email}`);
        toast(res.data.message);
        refetch();
    }
    // handle request
    const handleRequest = async (id, title, likes, reviews) => {
        console.log(id);
        const info = {
            title, likes, reviews, userName : user?.displayName, userEmail : user?.email, status : 'pending'
        }
        const res = await axiosSecure.post(`/request?mealId=${id}&userEmail=${user?.email}`, info);
        toast(res.data.message);
    }
    if (isPending) {
        return <p>Loading...</p>
    }
    return (
        <div className='py-24 max-w-5xl mx-auto font-roboto space-y-3'>

            <img className='h-[500px] w-full' src={meal?.image} alt="meal-food" />
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>{meal?.title}</h1>
                <div className='flex justify-center items-center gap-3'>
                    <button onClick={() => handleLike(meal?._id)} className='btn px-6 text-xl flex'><span><AiOutlineLike /></span><span>{meal?.likes}</span></button>
                    <button onClick={() => handleRequest(meal?._id, meal?.title, meal?.likes, meal?.reviews)} className='btn px-6 text-xl'><span>Request</span></button>
                </div>
            </div>
            <p>{meal?.description}</p>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MealDetails;