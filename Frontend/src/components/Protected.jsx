import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'
import Loader from "./Loader.jsx";

const Protected = ({ children }) => {
    const { loading, user } = useAuth()


    if (loading) {
        return <Loader message="Verifying authentication..." />
    }

    if (!user) {
        return <Navigate to={'/login'} />
    }

    return children
}

export default Protected