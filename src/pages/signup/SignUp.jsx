import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub, FaRegEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoEyeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const SignUp = () => {
    const { user, createUserByEmail, loading, setLoading, createUserByGoogle, createUserByGithub } = useContext(AuthContext)
    // console.log(user)
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [closed, setClosed] = useState(false);
    const axiosPublic = useAxiosPublic();
    const saveUser = async (name, email, image) => {
        const userInfo = {
            name, email, userPhoto : image, badge: 'bronze'
        }
        const res = await axiosPublic.post('/create-user', userInfo);
        console.log(res.data);
    }

    const onSubmit = async (data) => {
        setLoading(true);
        // console.log(data)
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const imageFile = { image: data.photo[0] }

        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        // console.log(res.data);
        const photo = res.data.data.display_url;
        // console.log(photo)

        // create user by email and pass
        createUserByEmail(email, password)
            .then(result => {
                // console.log(result.user);
                if (result.user) {
                    updateProfile(auth.currentUser, {
                        displayName: name,
                        photoURL: photo
                    })
                        .then(() => {
                            // console.log(result.user);
                            saveUser(result?.user?.displayName, result?.user?.email, result?.user?.photoURL
                            )
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
                reset();
            })
            .catch(error => {
                // console.log(error);
            })
        reset
    };
    // console.log(watch('name'));
    // sign in with google
    const handleGoogleSingIn = () => {
        createUserByGoogle()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error);
            })
    }
    // sign in with google
    const handleGithubSingIn = () => {
        createUserByGithub()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error);
            })
    }

    if (loading) {
        return <p className=" text-xl w-full flex h-screen justify-center items-center">loading...</p>
    }

    return (
        <div className='w-3/4 md:w-1/3 lg:w-1/3 mx-auto shadow-lg my-16 p-9 font-roboto '>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name">Username</label>
                    <input className='px-3 py-2 bg-gray-100' {...register("name", { required: true })} type="text" placeholder='Name' />
                    {errors.email && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input className='px-3 py-2 bg-gray-100' {...register("email", { required: true })} type="email" placeholder='Email' />
                    {errors.email && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className='flex flex-col gap-2 relative'>
                    <label htmlFor="password">Password</label>
                    <input className='px-3 py-2 bg-gray-100' {...register('password', { required: true, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, minLength: 8 })} id='password' type={`${!closed ? 'password' : 'text'}`} placeholder='Password' />
                    <span onClick={() => setClosed(!closed)} className='absolute right-2 top-11'>{!closed ? <FaRegEyeSlash /> : <IoEyeOutline />}</span>
                    {console.log('error in the pass -', errors)}
                    {errors.password?.type === 'required' && <span className='text-red-500'>This field is required</span>}
                    {errors.password?.type === 'pattern' && <span className='text-red-500'>Password must have at least one uppercase and lowercase letter and one number</span>}
                    {errors.password?.type === 'minLength' && <span className='text-red-500'>Password length must be 8 character</span>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="photo">Photo</label>
                    <input className='px-3 py-2 bg-gray-100' {...register('photo', { required: true })} id='photo' type="file" placeholder='Name' />
                    {errors.photo && <span className='text-red-500'>This field is required</span>}
                </div>
                <input className='w-full py-2 rounded bg-[#373A40] text-white hover:bg-[#0C0C0C]' value='Sign Up' type="submit" />
            </form>
            <div className='w-full text-center space-y-4 mt-4'>
                <p className=''>Or</p>
                <button onClick={handleGoogleSingIn} className='flex justify-center items-center py-2 bg-gray-100 rounded w-full gap-4 hover:bg-gray-200'>
                    <span className='text-2xl'><FcGoogle /></span>
                    <span className=''>Google</span>
                </button>
                <button onClick={handleGithubSingIn} className='flex justify-center items-center py-2 bg-gray-100 rounded w-full gap-4 hover:bg-gray-200'>
                    <span className='text-2xl'><FaGithub /></span>
                    <span className=''>GitHub</span>
                </button>
                <p>Already User?<span className='underline mx-2'><Link to={'/login'}>Log In</Link></span></p>
            </div>
        </div>
    );
};

export default SignUp;