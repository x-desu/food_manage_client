import axios from "axios";
import { useEffect, useState } from "react";
import { UserContext } from "./userContext";
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
export  const UserContextProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const savedTheme = localStorage.getItem("theme") || "light";
    const [theme, setTheme] = useState(savedTheme);

    useEffect(() => {
    
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.removeAttribute("data-theme");
        }
  
        localStorage.setItem("theme", theme);
      }, [theme]);
    

    const checkAuth = async() => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth`, {
                withCredentials: true, 
            })
            if(res.data?.isAuth){
                setIsAuthenticated((prev)=>true);
                setUser(res.data.user);
            } else {
                setIsAuthenticated((prev)=>false);
                setUser(null);
            }
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/user/logout`, {}, {
                withCredentials: true, 
            });
            setIsAuthenticated(false);
            setUser(null);
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    const login = async (formdata) => {
        
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, formdata, {
            withCredentials: true,
          });
          
            setIsAuthenticated(true); 
            setUser(res.data.user); 
            toast.success("signed in")
          return res.data; 
        } catch (error) {
            if (error.response) {
               
                console.error('Error response:', error.response.data); 
                toast.error(error.response.data.error || 'Something went wrong'); 
              } else if (error.request) {
              
                console.error('No response received:', error.request);
                toast.error('No response from server. Please try again later.');
              } else {
             
                console.error('Error setting up the request:', error.message);
                toast.error('An unexpected error occurred.');
              }
            }
        
      };

    useEffect(() => {
        checkAuth();
    }, []);

    return(
        <UserContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser,
            loading,
            logout,
            login,
            checkAuth,
            theme,
            setTheme
        }}>
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

