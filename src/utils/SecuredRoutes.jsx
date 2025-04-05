import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


export default function SecuredRoutes(){


    const isLoggedIn = useSelector((state)=>state?.auth?.loggedInStatus)

    return isLoggedIn ? (<Outlet/>) :( <Navigate to="/login" />)
}