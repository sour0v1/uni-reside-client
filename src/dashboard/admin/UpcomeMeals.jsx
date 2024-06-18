import React, { useContext } from 'react';
import Heading from '../../components/Heading';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpcomeMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: upMeals, refetch } = useQuery({
        queryKey: ['upMeals'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/up-meals`)
            return res.data;
        },
    })
    console.log(upMeals);
    const sortedUpMeals = upMeals?.sort((a, b) => b.likes - a.likes);
    console.log(sortedUpMeals);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data);

        const imageFile = { image: data.image[0] }

        const imageRes = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        // console.log(res.data);
        const title = data.title;
        const ingredients = data.ingredients;
        const category = data.category;
        const price = data.price;
        const description = data.description;
        const rating = data.rating;
        const postTime = data.postTime;
        const likes = Number(data.likes);
        const reviews = data.reviews;
        const adminName = data.adminName;
        const adminEmail = data.email;
        const image = imageRes.data.data.display_url;
        // console.log(image)
        const meals = {
            title, ingredients, category, price, description, rating, postTime, likes, reviews, adminName, adminEmail, image
        }

        const res = await axiosSecure.post('/upcoming-meal', meals);
        console.log(res.data);
        if (res.data.insertedId) {
            Swal.fire({
                title: "Success",
                text: "Meal Added Successfully!",
                icon: "success"
            });
            refetch();
        }
        // console.log(meals)

    }

    const handlePublish = async (id) => {
        const res = await axiosSecure.post(`/up-to-add?id=${id}`)
        console.log(res.data);
        if (res.data.insertedId) {
            Swal.fire({
                title: "Success",
                text: "Meal published Successfully!",
                icon: "success"
            });
            refetch();
        }
    }

    return (
        <div>
            <Heading title={'Upcoming Meals'}></Heading>
            <div className="overflow-x-auto px-6 font-roboto">
                <div className='w-full text-end'>
                    {/* The button to open modal */}
                    <label htmlFor="my_modal_7" className="btn">Add Upcoming Meal</label>

                    <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                    <div className="modal" role="dialog">
                        <div className="modal-box text-left">
                            {/* start form here */}
                            <form onSubmit={handleSubmit(onSubmit)} className="px-6 lg:grid lg:grid-cols-2 lg:gap-6 flex flex-col gap-6 lg:flex-none">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Meal Title</label>
                                    <input required {...register('title')} className="py-1 px-3 bg-gray-200 outline-none" type="text" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Image</label>
                                    <input required {...register('image')} className="py-1 px-3 bg-gray-200 outline-none" type="file" />
                                </div>
                                <div className="flex flex-col gap-2 lg:col-span-2">
                                    <label htmlFor="">Ingredients</label>
                                    <input {...register('ingredients')} className="py-1 px-3 bg-gray-200 outline-none" type="text" placeholder="Ingredient 1, Ingredient 2 " />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Category</label>
                                    {/* <input {...register('category')} className="py-1 px-3 bg-gray-200 outline-none" type="text" /> */}
                                    <select className="py-1 px-3 bg-gray-200 outline-none" {...register("category")}>
                                        <option value="null">Select</option>
                                        <option value="breakfast">breakfast</option>
                                        <option value="lunch">lunch</option>
                                        <option value="dinner">dinner</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Price</label>
                                    <input {...register('price')} className="py-1 px-3 bg-gray-200 outline-none" type="text" />
                                </div>
                                <div className="flex flex-col gap-2 lg:col-span-2">
                                    <label htmlFor="">Description</label>
                                    <textarea {...register('description')} className="bg-gray-200 outline-none px-3" cols={2} rows={2}></textarea>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Rating</label>
                                    <input {...register('rating')} className="py-1 px-3 bg-gray-200 outline-none" type="text" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Post Time</label>
                                    <input {...register('postTime')} className="py-1 px-3 bg-gray-200 outline-none" type="time" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Likes</label>
                                    <input required {...register('likes')} className="py-1 px-3 bg-gray-200 outline-none" type="number" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Reviews</label>
                                    <input {...register('reviews')} className="py-1 px-3 bg-gray-200 outline-none" type="text" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Admin Name</label>
                                    <input defaultValue={user?.displayName} {...register('adminName')} className="py-1 px-3 bg-gray-200 outline-none" type="text" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Email</label>
                                    <input defaultValue={user?.email} {...register('email')} className="py-1 px-3 bg-gray-200 outline-none" type="email" />
                                </div>
                                <input className='py-2 rounded bg-[#373A40] text-white hover:bg-[#0C0C0C] col-span-2' type="submit" value="Add Meal" />
                            </form>
                            {/* end form here */}

                        </div>
                        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                    </div>
                </div>
                {
                    sortedUpMeals.length > 0 ?
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Likes</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sortedUpMeals?.map((meal, idx) => <tr key={meal._id}>
                                        <th>{idx + 1}</th>
                                        <td>{meal?.title}</td>
                                        <td><img className='w-16' src={meal?.image} alt="food" /></td>
                                        <td>{meal?.likes}</td>
                                        <td onClick={() => handlePublish(meal?._id)}><button className='btn'>Publish</button></td>

                                    </tr>)
                                }
                            </tbody>
                        </table> :
                        <div className='w-full text-center'>
                            <h1 className='text-2xl'>Empty</h1>
                        </div>
                }
            </div>
        </div>
    );
};

export default UpcomeMeals;