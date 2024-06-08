import img from '../assets/uni-logo.png'
import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import '../navbar/Navbar.css'
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const user = false;
    console.log(open1)
    // fixed z-10 w-full
    return (
        <>
            <div className={`font-roboto flex justify-between items-center lg:px-16 py-5 bg-[#373A40] text-white ${!open && 'px-6'}`}>
                <h1 className="text-2xl">UniReside</h1>
                <ul className={`flex justify-center items-center gap-6 flex-col lg:flex-row absolute lg:static  bg-[#151515] lg:bg-opacity-0 h-fit lg:h-auto w-full lg:w-auto py-6 lg:py-0 lg:px-0 ${open ? 'top-0' : 'bottom-[800px]'}`}>
                    <NavLink>Home</NavLink>
                    <NavLink>Meals</NavLink>
                    <NavLink>Upcoming Meals</NavLink>
                    <NavLink><IoNotificationsOutline /></NavLink>

                    {
                        user ?
                            <button onClick={() => setOpen1(!open1)}>
                                <img className='w-9 rounded-full' src={img} alt="" />
                            </button> :
                            <NavLink to={'/sign-up'}>Join Us</NavLink>
                    }
                    <button className="lg:hidden absolute lg:relative top-6 right-4 text-2xl" onClick={() => {setOpen(!open); setOpen1(false)}}><IoMdClose /></button>
                </ul>
                <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)}><HiOutlineMenu /></button>
            </div>
            <div className={`border bg-white rounded shadow-sm flex flex-col justify-center items-center px-6 py-3 absolute ${!open1 ? 'hidden' : ' text-center w-full mx-auto lg:px-9 lg:w-auto  lg:right-16 lg:top-18 gap-3'} `}>
                <p>Username</p>
                <NavLink className={'dash'}>Dashboard</NavLink>
                <button className='btn1'>Log Out</button>
                {/* <button className='text-2xl' onClick={() => setOpen1(!open1)}><RxCross1 /></button> */}
            </div>
        </>
    );
};

export default Navbar;