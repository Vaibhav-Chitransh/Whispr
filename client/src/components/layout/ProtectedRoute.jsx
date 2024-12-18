import { userStore } from '@/store/userStore'
import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {user} = userStore();
    
    if(!user) {
        return <Navigate to='/login' replace />
    }

    return children;
}

export default ProtectedRoute
