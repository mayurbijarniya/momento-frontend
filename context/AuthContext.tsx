"use client";

import { getCurrentUser, signOutAccount } from '@/lib/api/client';
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
    signOut: async () => {},
}

type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
    signOut: () => Promise<void>;
  };

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuthUser = async () =>{
        try {
            setIsLoading(true);
            const currentAccount = await getCurrentUser();

            if(currentAccount){
                setUser({
                    id: currentAccount.id,
                    name: currentAccount.name || '',
                    username: currentAccount.username || '',
                    email: currentAccount.email || '',
                    imageUrl: currentAccount.imageUrl || '',
                    bio: currentAccount.bio || ''
                })

                setIsAuthenticated(true);
                return true;
            }

            setIsAuthenticated(false);
            return false;

        } catch (error) {
            setIsAuthenticated(false);
            return false;
        } finally{
            setIsLoading(false);
        }
    }

    const signOut = async () => {
        try {
            await signOutAccount();
        } catch (error) {
        } finally {
            setUser(INITIAL_USER);
            setIsAuthenticated(false);
        }
    }

    useEffect(() => {
        checkAuthUser();
    }, []);
    

    const value = {
     user,
     setUser,
     isLoading,
     isAuthenticated,
     setIsAuthenticated,
     checkAuthUser,
     signOut,
    }


  return (
   <AuthContext.Provider value={value}>
    {children}
   </AuthContext.Provider>
  )
}

export default AuthProvider; 

export const useUserContext = () =>  useContext(AuthContext);