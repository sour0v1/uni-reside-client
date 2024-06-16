import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../pages/home/Home";
import SignUp from "../pages/signup/SignUp";
import Login from "../pages/login/Login";
import Dashboard from "../dashboard/admin/Dashboard";
import AddMeal from "../dashboard/admin/AddMeal";
import Meals from "../pages/meals/Meals";
import MealDetails from "../pages/mealDetails/MealDetails";
import UserProfile from "../dashboard/user/UserProfile";
import RequestedMeals from "../dashboard/user/RequestedMeals";
import UserReviews from "../dashboard/user/UserReviews";
import Payment from "../pages/payment/Payment";
import PaymentHistory from "../dashboard/user/PaymentHistory";
import AdminProfile from "../dashboard/admin/AdminProfile";
import ManageUser from "../dashboard/admin/ManageUser";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/sign-up',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/meals',
                element: <Meals></Meals>
            },
            {
                path : '/meal/:id',
                element : <MealDetails></MealDetails>
            },
            {
                path : '/subscription/payment/:membership',
                element : <Payment></Payment>
            }
           
        ],
    },
    // dashboard
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            // admin routes
            {
                path : 'admin/profile',
                element : <AdminProfile></AdminProfile>
            },
            {
                path: 'admin/add-meal',
                element: <AddMeal></AddMeal>
            },
            {
                path : 'admin/manage-users',
                element : <ManageUser></ManageUser>
            },
            // user routes
            {
                path : 'user/user-profile',
                element : <UserProfile></UserProfile>
            },
            {
                path : 'user/requested-meals',
                element : <RequestedMeals></RequestedMeals>
            },
            {
                path : 'user/reviews',
                element : <UserReviews></UserReviews>
            },
            {
                path : 'user/payment/history',
                element : <PaymentHistory></PaymentHistory>
            }
            
        ]
    }
])

export default router;