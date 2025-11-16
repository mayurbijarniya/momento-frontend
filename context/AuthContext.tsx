"use client";

import { getCurrentUser } from '@/lib/appwrite/api';
import { IUser } from '@/types';
import {ReactNode, createContext, useContext, useEffect, useState } from 'react'
 
export const INITIAL_USER = {
    id:'',
    name:'',
    username: '',
    email:'',
    imageUrl:'',
    bio:''
};


const INITIAL_STATE = { 
    user:INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
}

type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
  };

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuthUser = async () =>{
        try {
            const currentAccount = await getCurrentUser();

            if(currentAccount){
                setUser({
                    id: (currentAccount as any).$id || (currentAccount as any).id,
                    name: (currentAccount as any).name,
                    username: (currentAccount as any).username,
                    email: (currentAccount as any).email,
                    imageUrl: (currentAccount as any).imageUrl,
                    bio: (currentAccount as any).bio
                })

                setIsAuthenticated(true);

                return true;
            }

            return false;

        } catch (error) {
            return false;
        } finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem('cookieFallback');
        if(token === null || token === '[]' ) 
        {
            setIsAuthenticated(false);
            setIsLoading(false);
        }else{
            checkAuthUser();  
        }
    }, []);
    

    const value = {
     user,
     setUser,
     isLoading,
     isAuthenticated,
     setIsAuthenticated,
     checkAuthUser,
    }


  return (
   <AuthContext.Provider value={value}>
    {children}
   </AuthContext.Provider>
  )
}

export default AuthProvider; 

export const useUserContext = () =>  useContext(AuthContext);