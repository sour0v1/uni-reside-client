import { FaHome } from 'react-icons/fa';
import './Dashboard.css'
import { FiUsers } from 'react-icons/fi';
import { GiHotMeal, GiMeal } from 'react-icons/gi';
import { MdOutlinePayment, MdOutlineRateReview, MdOutlineReviews } from 'react-icons/md';
import { PiChefHat } from 'react-icons/pi';
import { RiAdminLine } from 'react-icons/ri';
import { Link, NavLink, Outlet } from 'react-router-dom';
import ScrollToTop from '../../components/ScrollToTop';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { BiFoodMenu } from 'react-icons/bi';
import { CiUser } from 'react-icons/ci';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data : userRole} = useQuery({
        queryKey : ['userRole'],
        queryFn : async () => {
            const res = await axiosSecure.get(`/user?userEmail=${user?.email}`);
            return res.data;
        },
        enabled : !!user?.email
    })
    console.log(userRole)
    const isAdmin = userRole?.role;
    return (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:max-w-6xl lg:mx-auto font-roboto my-9 bg-gray-100 p-9'>
            {/* routes */}
            {
                isAdmin === 'admin' ?
                    <div id='routes' className='flex flex-col py-6 lg:col-span-3 px-6 gap-6 bg-slate-50 shadow'>
                        <NavLink to={'admin/profile'} className={'flex justify-start items-center gap-2'}>
                            <span><RiAdminLine /></span>
                            <span>Admin Profile</span>
                        </NavLink>
                        <NavLink to={'admin/manage-users'} className={'flex justify-start items-center gap-2'}>
                            <span><FiUsers /></span>
                            <span>Manage Users</span>
                        </NavLink>
                        <NavLink to={'admin/add-meal'} className={'flex justify-start items-center gap-2'}>
                            <span><GiMeal /></span>
                            <span>Add Meal</span>
                        </NavLink>
                        <NavLink to={'admin/all-meals'} className={'flex justify-start items-center gap-2'}>
                            <span><GiHotMeal /></span>
                            <span>All Meals</span>
                        </NavLink>
                        <NavLink to={'admin/all-reviews'} className={'flex justify-start items-center gap-2'}>
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
                    </div> :
                    <div id='routes' className='flex flex-col py-6 lg:col-span-3 px-6 gap-6 bg-slate-50 shadow'>
                        <NavLink to={''} className={'flex justify-start items-center gap-2'}>
                            <span><CiUser /></span>
                            <span>My Profile</span>
                        </NavLink>
                        <NavLink to={'user/requested-meals'} className={'flex justify-start items-center gap-2'}>
                            <span><BiFoodMenu /></span>
                            <span>Requested Meals</span>
                        </NavLink>
                        <NavLink to={'user/reviews'} className={'flex justify-start items-center gap-2'}>
                            <span><MdOutlineReviews /></span>
                            <span>My Reviews</span>
                        </NavLink>
                        <NavLink to={'user/payment/history'} className={'flex justify-start items-center gap-2'}>
                            <span><MdOutlinePayment /></span>
                            <span>Payment History</span>
                        </NavLink>
                        <hr />
                        <NavLink to={'/'} className={'flex justify-start items-center gap-2'}>
                            <span><FaHome /></span>
                            <span>Home</span>
                        </NavLink>
                    </div>
            }
            {/* display */}
            <div className='lg:col-span-9 py-6 bg-slate-50 shadow'>
                <ScrollToTop></ScrollToTop>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;