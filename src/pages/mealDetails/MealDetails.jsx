import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AiOutlineLike } from 'react-icons/ai';
import { AuthContext } from '../../provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const MealDetails = () => {
    const { user } = useContext(AuthContext);
    const [count, setCount] = useState(true)
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    // console.log(id);
    // all meals
    const { data: meal, isPending, refetch } = useQuery({
        queryKey: ['meal'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meal/details/?id=${id}`);
            return res.data;
        },
        enabled: !!id
    })
    // Review Count
    const { data: review, isPending: isLoading, refetch: reload } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review-count?id=${id}`);
            return res.data;
        },
        enabled: !!id
    })
    // console.log(review);
    const { data: userBadge } = useQuery({
        queryKey: ['badge'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-badge?userEmail=${user?.email}`)
            return res.data.badge;
        },
        enabled: !!user?.email
    })
    // handle like
    const handleLike = async (id) => {
        // console.log(id);
        if (user) {
            const res = await axiosSecure.post(`/like?mealId=${id}&userEmail=${user?.email}`);
            toast(res.data.message);
            refetch();
        }
        else {
            Swal.fire({
                title: "Oops",
                text: "Log in required",
                icon: "question"
            });
        }

    }
    // handle request
    const handleRequest = async (id, title, likes, reviews) => {
        // console.log(id);
        const info = {
            title, likes, reviews, userName: user?.displayName, userEmail: user?.email, status: 'pending'
        }
        if (user) {
            if (userBadge === 'silver' || userBadge === 'gold' || userBadge === 'platinum') {
                const res = await axiosSecure.post(`/request?mealId=${id}&userEmail=${user?.email}`, info);
                toast(res.data.message);
                // refetch();
            }
            else {
                Swal.fire({
                    title: "Oops",
                    text: "Subscribe a package to request",
                    icon: "question"
                });
            }
        }
        else {
            Swal.fire({
                title: "Oops",
                text: "Require log in",
                icon: "question"
            });
        }

    }
    // post review
    const post = document.getElementById('review');
    const handleReview = async () => {
        // console.log(post.value);
        const reviewInfo = {
            mealId: meal?._id,
            title: meal?.title,
            likes: meal?.likes || 0,
            review: post.value,
            userEmail: user?.email

        }
        if (user) {
            const res = await axiosSecure.post('/review', reviewInfo);
            // console.log(res.data);
            if (res.data.insertedId) {
                reload();
                toast('Posted Successfully!');
            }
        }
        else {
            Swal.fire({
                title: "Sorry",
                text: "Please log in",
                icon: "question"
            });
        }
    }
    const handleChange = (event) => {
        if (event.target.value) {
            return setCount(false);
        }
        return setCount(true);
    }
    // console.log('count',count)
    if (isPending && isLoading) {
        return <p>Loading...</p>
    }
    return (
        <>
            <div className='pt-24'>

            </div>
            <div className='max-w-5xl mx-auto font-roboto space-y-3 shadow-lg mb-9 p-6'>
            <Helmet>
                <title>UniReside | Meal Details</title>
            </Helmet>

                <img className='lg:h-[500px] w-full' src={meal?.image} alt="meal-food" />
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl font-bold'>{meal?.title}</h1>
                    <div className='flex justify-center items-center gap-3'>
                        <button onClick={() => handleLike(meal?._id)} className='btn px-6 text-xl flex'><span><AiOutlineLike /></span><span>{meal?.likes}</span></button>
                        <button onClick={() => handleRequest(meal?._id, meal?.title, meal?.likes, meal?.reviews)} className='btn px-6 text-xl'><span>Request</span></button>
                    </div>
                </div>
                <p>{meal?.description}</p>
                <p><span className='font-medium'>Ingredients : </span>{meal?.ingredients}</p>
                <p><span className='font-medium'>Rating : </span>{meal?.rating}</p>
                <p><span className='font-medium'>Distributor : </span>{meal?.adminName}</p>
                <p><span className='font-medium'>Review : </span>{review?.length || 0}</p>
                <textarea onChange={handleChange} className='w-full bg-gray-100 px-3 py-2' placeholder='Post a review' id="review" cols={3} rows={3}></textarea>
                <div className='w-full flex justify-end'>
                    <button onClick={handleReview} disabled={count} className={`py-2 px-4 text-white ${count ? 'bg-[#373A40]' : 'bg-[#0C0C0C]'}`}>Post</button>
                </div>
                <ToastContainer></ToastContainer>
            </div>
        </>
    );
};

export default MealDetails;