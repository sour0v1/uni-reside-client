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
import Reviews from "../dashboard/admin/Reviews";
import AllMeals from "../dashboard/admin/AllMeals";
import ServeMeals from "../dashboard/admin/ServeMeals";
import UpcomingMeals from "../pages/upcomingMeals/UpcomingMeals";
import UpcomeMeals from "../dashboard/admin/UpcomeMeals";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

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
                path: '/meal/:id',
                element: <MealDetails></MealDetails>
            },
            {
                path: '/subscription/payment/:membership',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: '/upcoming-meals',
                element: <UpcomingMeals></UpcomingMeals>
            }

        ],
    },
    // dashboard
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // admin routes
            {
                path: 'admin/profile',
                element: <AdminProfile></AdminProfile>
            },
            {
                path: 'admin/add-meal',
                element: <AddMeal></AddMeal>
            },
            {
                path: 'admin/manage-users',
                element: <AdminRoute>
                    <PrivateRoute><ManageUser></ManageUser></PrivateRoute>
                </AdminRoute>
            },
            {
                path: 'admin/all-reviews',
                element: <AdminRoute><PrivateRoute>
                    <Reviews></Reviews>
                </PrivateRoute></AdminRoute>
            },
            {
                path: 'admin/all-meals',
                element: <AdminRoute><PrivateRoute>
                    <AllMeals></AllMeals>
                </PrivateRoute></AdminRoute>
            },
            {
                path: 'admin/serve-meals',
                element: <AdminRoute><PrivateRoute>
                    <ServeMeals></ServeMeals>
                </PrivateRoute></AdminRoute>
            },
            {
                path: 'admin/upcoming-meals',
                element: <AdminRoute><PrivateRoute>
                    <UpcomeMeals></UpcomeMeals>
                </PrivateRoute></AdminRoute>
            },
            // user routes
            {
                path: 'user/user-profile',
                element: <PrivateRoute>
                    <UserProfile></UserProfile>
                </PrivateRoute>
            },
            {
                path: 'user/requested-meals',
                element: <PrivateRoute><RequestedMeals></RequestedMeals></PrivateRoute>
            },
            {
                path: 'user/reviews',
                element: <PrivateRoute><UserReviews></UserReviews></PrivateRoute>
            },
            {
                path: 'user/payment/history',
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
            }

        ]
    }
])

export default router;