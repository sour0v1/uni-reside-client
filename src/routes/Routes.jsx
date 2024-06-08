import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../pages/home/Home";
import SignUp from "../pages/signup/SignUp";
import Login from "../pages/login/Login";

const router = createBrowserRouter([
    {
        path : '/',
        element : <Root></Root>,
        children : [
            {
                path : '/',
                element : <Home></Home>
            },
            {
                path : '/sign-up',
                element : <SignUp></SignUp>
            },
            {
                path : '/login',
                element : <Login></Login>
            }
        ]
        
    }
])

export default router;