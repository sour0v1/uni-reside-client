import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub, FaRegEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoEyeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const SignUp = () => {
    const {user} = useContext(AuthContext)
    console.log(user)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [closed, setClosed] = useState(false);

    const onSubmit = data => {
        console.log(data)
    };
    // console.log(watch('name'));
    return (
        <div className='w-3/4 md:w-1/3 lg:w-1/3 mx-auto shadow-lg my-16 p-9 font-roboto '>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name">Username</label>
                    <input className='px-3 py-2 bg-gray-100' {...register("name", {required :true})}  type="text" placeholder='Name' />
                    {errors.email && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input className='px-3 py-2 bg-gray-100' {...register("email", {required : true})}  type="email" placeholder='Email' />
                    {errors.email && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className='flex flex-col gap-2 relative'>
                    <label htmlFor="password">Password</label>
                    <input className='px-3 py-2 bg-gray-100' {...register('password', {required : true, pattern :  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/, minLength : 8})} id='password' type={`${!closed ? 'password' : 'text' }`} placeholder='Password' />
                    <span onClick={() => setClosed(!closed)} className='absolute right-2 top-11'>{!closed ? <FaRegEyeSlash />:<IoEyeOutline />}</span>
                    {console.log('error in the pass -',errors)}
                    {errors.password?.type === 'required' && <span className='text-red-500'>This field is required</span>}
                    {errors.password?.type === 'pattern' && <span className='text-red-500'>Password must have at least one uppercase and lowercase letter and one number</span>}
                    {errors.password?.type === 'minLength' && <span className='text-red-500'>Password length must be 8 character</span>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="photo">Photo</label>
                    <input className='px-3 py-2 bg-gray-100' id='photo' type="file" placeholder='Name' />
                </div>
                <input className='w-full py-2 rounded bg-[#373A40] text-white hover:bg-[#0C0C0C]' value='Sign Up' type="submit" />
            </form>
            <div className='w-full text-center space-y-4 mt-4'>
                <p className=''>Or</p>
                <button className='flex justify-center items-center py-2 bg-gray-100 rounded w-full gap-4 hover:bg-gray-200'>
                    <span className='text-2xl'><FcGoogle /></span>
                    <span className=''>Google</span>
                </button>
                <button className='flex justify-center items-center py-2 bg-gray-100 rounded w-full gap-4 hover:bg-gray-200'>
                    <span className='text-2xl'><FaGithub /></span>
                    <span className=''>GitHub</span>
                </button>
                <p>Already User?<span className='underline mx-2'><Link to={'/login'}>Log In</Link></span></p>
            </div>
        </div>
    );
};

export default SignUp;