import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types";
import { getToken, getUser, removeToken, removeUser } from "../utils/token";

interface AuthContextType {
    isLoggedIn: boolean
    currentUser: User | null
    login: () => void
    logout: () => void

}
const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    currentUser: null,
    login: () => {},
    logout: () => {}
})

export function AuthProvider({ children } : { children: React.ReactNode }) {
    const [isLoggedIn , setIsLoggedIn] = useState<boolean>(false)
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect(() => {
       const token = getToken()
       const user = getUser() as User | null
       if(token && user){
        setIsLoggedIn(true)
        setCurrentUser(user)
       }
    }, [])

    function login() {
        const user = getUser() as User | null
        setIsLoggedIn(true)
        setCurrentUser(user)
    }

    function logout() {
        removeToken()
        removeUser()
        setIsLoggedIn(false)
        setCurrentUser(null)
    }


    return(
        <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
   return useContext(AuthContext)
}