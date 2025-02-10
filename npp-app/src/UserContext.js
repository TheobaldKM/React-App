import React, { createContext, useContext, useState } from 'react';

// Create a context for user information
const UserContext = createContext();

// UserProvider component to wrap the entire application
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to access user information
export const useUser = () => useContext(UserContext);
