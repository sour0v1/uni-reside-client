import { FaHome } from 'react-icons/fa';
import './Dashboard.css'
import { FiUsers } from 'react-icons/fi';
import { GiHotMeal, GiMeal } from 'react-icons/gi';
import { MdOutlineRateReview } from 'react-icons/md';
import { PiChefHat } from 'react-icons/pi';
import { RiAdminLine } from 'react-icons/ri';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='grid grid-cols-12 gap-6 max-w-6xl mx-auto font-roboto my-9 bg-gray-100 p-9'>
            {/* routes */}
            <div id='routes' className='flex flex-col py-6 col-span-3 px-6 gap-6 bg-slate-50 shadow'>
                <NavLink to={'admin-profile'} className={'flex justify-start items-center gap-2'}>
                    <span><RiAdminLine /></span>
                    <span>Admin Profile</span>
                </NavLink>
                <NavLink to={'manage-users'} className={'flex justify-start items-center gap-2'}>
                    <span><FiUsers /></span>
                    <span>Manage Users</span>
                </NavLink>
                <NavLink to={'add-meal'} className={'flex justify-start items-center gap-2'}>
                    <span><GiMeal /></span>
                    <span>Add Meal</span>
                </NavLink>
                <NavLink to={'all-meals'} className={'flex justify-start items-center gap-2'}>
                    <span><GiHotMeal /></span>
                    <span>All Meals</span>
                </NavLink>
                <NavLink to={'all-reviews'} className={'flex justify-start items-center gap-2'}>
                    <span><MdOutlineRateReview /></span>
                    <span>All Reviews</span>
                </NavLink>
                <NavLink to={'serve-meals'} className={'flex justify-start items-center gap-2'}>
                    <span><PiChefHat /></span>
                    <span>Serve Meals</span>
                </NavLink>
                <NavLink to={'upcoming-meals'} className={'flex justify-start items-center gap-2'}>
                    <span><GiMeal /></span>
                    <span>Upcoming Meals</span>
                </NavLink>
                <hr />
                <NavLink to={'/'} className={'flex justify-start items-center gap-2'}>
                    <span><FaHome /></span>
                    <span>Home</span>
                </NavLink>
            </div>
            {/* display */}
            <div className='col-span-9 py-6 bg-slate-50 shadow'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;