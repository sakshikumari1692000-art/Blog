import type React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children : React.ReactNode
}

function ProtectedRoute(props: ProtectedRouteProps){
 const {isLoggedIn} = useAuth()
 if(!isLoggedIn){
    return <Navigate to = "/login" />
 }
 return <>{props.children}</>
}

export default ProtectedRoute