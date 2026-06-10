import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";
import { useSnackbar } from "../../../snackbar.context";

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context
    const { showSnackbar } = useSnackbar()

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
            showSnackbar("Successfully logged in!", "success")
            return true
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message || "Login failed. Please try again."
            showSnackbar(errMsg, "error")
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            showSnackbar("Registration successful!", "success")
            return true
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message || "Registration failed."
            showSnackbar(errMsg, "error")
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
            showSnackbar("Successfully logged out.", "success")
            return true
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message || "Logout failed."
            showSnackbar(errMsg, "error")
            return false
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (err) {
                // Silently handle getMe error as it is a session check
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}