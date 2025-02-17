import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Heading from "../../components/Heading";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddMeal = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading, setLoading } = useContext(AuthContext);
    // const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        setLoading(true);
        // console.log(data);

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
        const price = Number(data.price);
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

        const res = await axiosSecure.post('/add-meals', meals);
        // console.log(res.data);
        if (res.data.insertedId) {
            Swal.fire({
                title: "Success",
                text: "Meal added Successfully!",
                icon: "success"
            });
            setLoading(false);
        }

    }

    // console.log(watch("example"));
    if (loading) {
        return <div className='flex justify-center items-center h-screen w-full'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    return (
        <div className="font-roboto lg:px-0">
            <Heading title={'Add Meal'}></Heading>
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
                    <input {...register('postTime')} className="py-1 px-3 bg-gray-200 outline-none" type="date" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Likes</label>
                    <input {...register('likes')} className="py-1 px-3 bg-gray-200 outline-none" type="number" />
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
        </div>
    );
};

export default AddMeal;