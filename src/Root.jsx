
import Navbar from './navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const Root = () => {
    const location = useLocation();
    console.log(location.pathname);
    const noHeaderFooter = location.pathname.includes('sign-up');
    const noHeaderFooter1 = location.pathname.includes('login');
    console.log(noHeaderFooter)
    return (
        <div>
            {
               (noHeaderFooter || noHeaderFooter1) || <Navbar></Navbar> 
            }
            <Outlet></Outlet>
        </div>
    );
};

export default Root;