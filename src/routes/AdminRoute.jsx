import React, { useContext } from 'react';
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const [isAdmin, isLoading] = useAdmin();
    const { user, loading } = useContext(AuthContext);

    if (loading || isLoading) {
        return <div className='flex justify-center items-center h-screen w-full'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    else if( user && isAdmin){
       return children;
    }
    return <Navigate to={'/login'}></Navigate>
};

export default AdminRoute;