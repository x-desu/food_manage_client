import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/userContext"


const ProtectedRoutes = () => {
    const {isAuthenticated,loading} = useAuth()
    if (loading) {
        return <div>Loading...</div>
      }

      if(!isAuthenticated){
        return <Navigate to="/login" />;
      }
    
   return (
    <Outlet/>
   )
}

export default ProtectedRoutes