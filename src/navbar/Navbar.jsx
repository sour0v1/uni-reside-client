import img from '../assets/uni-logo.png'
import { useContext, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import '../navbar/Navbar.css'
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from '../provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { RxCross1 } from 'react-icons/rx';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useScroll from '../hooks/useScroll';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const scrollDirection = useScroll();
    const navigate = useNavigate();
    // console.log(open1)
    const { user } = useContext(AuthContext);
    // const user = false;
    // fixed z-10 w-full
    const axiosSecure = useAxiosSecure();
    const { data: userRole } = useQuery({
        queryKey: ['userRole'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?userEmail=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    })
    // console.log(userRole)
    const isAdmin = userRole?.role;
    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                // console.log('sign out successfully');
                navigate('/');
            })
            .catch(error => {
                // console.log(error);
            })
    }
    // console.log('boom', window.scrollY)
    return (
        <>
            <div className={`font-roboto flex justify-between items-center lg:px-16 py-5 bg-[#373A40] bg-opacity-35 fixed z-10 w-full text-white ${!open ? 'px-6' : 'pr-6'} ${scrollDirection === 'down' ? '-translate-y-full transition-transform duration-300' : '-translate-y-0 transition-transform duration-300'}`}>
                <div className='flex justify-center items-center gap-2'>
                    <h1 className='bg-white text-white bg-opacity-40 opacity-90 font-bold text-4xl w-9 h-9 flex justify-center items-center'>U</h1>
                    <h1 className="text-2xl font-semibold opacity-90">UniReside</h1>
                </div>
                <ul className={`flex justify-start items-center gap-6 flex-col lg:flex-row absolute lg:static  bg-[#373A40] lg:bg-opacity-0 h-screen lg:h-auto w-1/2 lg:w-auto py-6 lg:py-0 lg:px-0 ${open ? 'top-0' : 'left-[800px]'}`}>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/meals'}>Meals</NavLink>
                    <NavLink to={'/upcoming-meals'}>Upcoming Meals</NavLink>
                    <NavLink><IoNotificationsOutline /></NavLink>

                    {
                        user ?
                            <button onClick={() => setOpen1(!open1)}>
                                <img className='w-9 h-9 rounded-full' src={user?.photoURL} alt="" />
                            </button> :
                            <>
                                <NavLink to={'/sign-up'}>Join Us</NavLink>
                                <NavLink to={'/login'}>Sign In</NavLink>
                            </>
                    }

                </ul>
                {
                    open ?
                        <button className="lg:hidden text-2xl" onClick={() => { setOpen(!open); setOpen1(false) }}><IoMdClose /></button> :
                        <button className="lg:hidden text-2xl" onClick={() => { setOpen(!open); setOpen1(false) }}><HiOutlineMenu /></button>
                }

                <div className={`font-roboto border text-black bg-white shadow-sm flex flex-col justify-start w-1/2 lg:w-fit h-screen lg:h-auto gap-3 items-center px-6 py-6 absolute lg:rounded ${!open1 ? '-left-[800px]' : ' z-20  top-0 left-0 lg:left-auto lg:top-16 lg:right-16'} `}>
                    <p className='font-medium'>{user?.displayName || 'Unknown'}</p>
                    <NavLink to={`/dashboard/${isAdmin === 'admin' ? 'admin/profile' : 'user/user-profile'}`} className={'dash'}>Dashboard</NavLink>
                    <button className='btn1' onClick={handleLogOut}>Log Out</button>
                    <button className='text-2xl bg-gray-100 hover:bg-gray-200 px-2 py-2 rounded-full' onClick={() => setOpen1(!open1)}><RxCross1 /></button>
                </div>
            </div>

        </>
    );
};

export default Navbar;