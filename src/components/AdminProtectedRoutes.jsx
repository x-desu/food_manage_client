import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/userContext';

const AdminProtectedRoutes = () => {
   const {user,isAuthenticated} = useAuth()

   if(!isAuthenticated){
    <Navigate to="/login" replace />;
   }

    if (!user) {
        
        return <Navigate to="/login" replace />;
    }

    if (user.role !== 'admin') {
       
        return <Navigate to="/" replace />;
    }

   
    return <Outlet />;
};

export default AdminProtectedRoutes;