import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    
    if(user){
        return children;
    }
    else if(loading){
       return <div className='flex justify-center items-center h-screen w-full'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    return <Navigate to={'/login'}></Navigate>
};

export default PrivateRoute;