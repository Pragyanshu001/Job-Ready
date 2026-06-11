import { createBrowserRouter } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Protected from "./components/Protected";
import Home from "./pages/interview/Home";
import Interview from "./pages/interview/Interview";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path:"/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    }
])