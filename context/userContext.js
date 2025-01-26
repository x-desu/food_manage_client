import { createContext, useContext } from "react";

export const UserContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    user: null,
    setUser: () => {},
    loading: true,
    logout: () => {},
    login: () => {}
});

export const useAuth = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useAuth must be used within a UserContextProvider');
    }
    return context;
};