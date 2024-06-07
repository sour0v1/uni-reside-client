
import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    console.log(open)
    return (
        <div className={`font-roboto flex justify-between items-center lg:px-16 py-5 bg-[#001C30] bg-opacity-30 ${!open && 'px-6'}`}>
            <h1 className="text-2xl">UniReside</h1>
            <ul className={`flex justify-center items-center gap-6 flex-col lg:flex-row absolute lg:static  bg-orange-500 lg:bg-[#001C30] lg:bg-opacity-0 h-fit lg:h-auto w-full lg:w-auto py-6 lg:py-0 lg:px-0 ${open ? 'top-0' : 'bottom-[800px]'}`}>
                <NavLink>Home</NavLink>
                <NavLink>Meals</NavLink>
                <NavLink>Upcoming Meals</NavLink>
                <NavLink><IoNotificationsOutline /></NavLink>
                <button className="lg:hidden absolute lg:relative top-6 right-4 text-2xl" onClick={() => setOpen(!open)}><IoMdClose /></button>
            </ul>
            <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)}><HiOutlineMenu /></button>
        </div>
    );
};

export default Navbar;