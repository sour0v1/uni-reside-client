
import Navbar from './navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const Root = () => {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <div>
            {
                location.pathname !== '/sign-up' || location.pathname !== '/login' &&
                <Navbar></Navbar> 
            }
            <Outlet></Outlet>
        </div>
    );
};

export default Root;