import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../pages/home/Home";
import SignUp from "../pages/signup/SignUp";
import Login from "../pages/login/Login";
import Dashboard from "../dashboard/admin/Dashboard";
import AddMeal from "../dashboard/admin/AddMeal";
import Meals from "../pages/meals/Meals";

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
            }
        ],
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            // admin routes
            {
                path: 'add-meal',
                element: <AddMeal></AddMeal>
            }
        ]
    }
])

export default router;