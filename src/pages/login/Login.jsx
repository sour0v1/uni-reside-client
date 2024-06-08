import React from 'react';
import { FaGithub, FaRegEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    return (
        <div className='w-3/4 md:w-2/3 lg:w-1/3 mx-auto shadow-lg my-16 p-9 font-roboto '>
            <form className='space-y-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input className='px-3 py-2 bg-gray-100' id='email' type="email" placeholder='Email' />
                </div>
                <div className='flex flex-col gap-2 relative'>
                    <label htmlFor="password">Password</label>
                    <input className='px-3 py-2 bg-gray-100' id='password' type="password" placeholder='Password' />
                    <span className='absolute right-2 top-11'><FaRegEyeSlash /></span>
                </div>
                <input className='w-full py-2 rounded bg-[#373A40] text-white hover:bg-[#0C0C0C]' value='Log In' type="submit" />
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
            </div>
        </div>
    );
};

export default Login;