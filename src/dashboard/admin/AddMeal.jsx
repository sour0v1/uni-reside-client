import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddMeal = () => {
    const axiosSecure = useAxiosSecure();
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
        const reviews = data.reviews;
        const adminName = data.adminName;
        const adminEmail = data.email;
        const image = imageRes.data.data.display_url;
        // console.log(image)
        const meals = {
            title, ingredients, category, price, description, rating, postTime, reviews, adminName, adminEmail, image
        }

       const res = await axiosSecure.post('/add-meals', meals);
       console.log(res.data);

    }

    // console.log(watch("example"));
    return (
        <div className="font-roboto px-9 lg:px-0">
            <form onSubmit={handleSubmit(onSubmit)} className="px-9 grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Meal Title</label>
                    <input {...register('title')} className="py-1 px-3 bg-gray-200 outline-none" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Image</label>
                    <input {...register('image')} className="py-1 px-3 bg-gray-200 outline-none" type="file" />
                </div>
                <div className="flex flex-col gap-2 lg:col-span-2">
                    <label htmlFor="">Ingredients</label>
                    <input {...register('ingredients')} className="py-1 px-3 bg-gray-200 outline-none" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Category</label>
                    {/* TODO : change to select input */}
                    <input {...register('category')} className="py-1 px-3 bg-gray-200 outline-none" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Price</label>
                    <input {...register('price')} className="py-1 px-3 bg-gray-200 outline-none" type="number" />
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                    <label htmlFor="">Description</label>
                    <textarea {...register('description')} className="bg-gray-200 outline-none px-3" name="" id="" cols={2} rows={2}></textarea>
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
                    <input {...register('likes')} className="py-1 px-3 bg-gray-200 outline-none" type="number" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Reviews</label>
                    <input {...register('reviews')} className="py-1 px-3 bg-gray-200 outline-none" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Admin Name</label>
                    <input {...register('adminName')} className="py-1 px-3 bg-gray-200 outline-none" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Email</label>
                    <input {...register('email')} className="py-1 px-3 bg-gray-200 outline-none" type="email" />
                </div>
                <input className='py-2 rounded bg-[#373A40] text-white hover:bg-[#0C0C0C] col-span-2' type="submit" value="Add Meal" />
            </form>
        </div>
    );
};

export default AddMeal;