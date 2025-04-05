import { Link, useNavigate } from "react-router-dom"
import Logo from "../assets/logo.png"
import { useDispatch, useSelector } from "react-redux"
import { handleLogoutAPI } from "../redux/slices/authSlice"

export default function NavigationBar(){

    const isLoggedIn = useSelector((state)=>state?.auth?.loggedInStatus)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogoutClick = async () => {
        
        const res = await dispatch(handleLogoutAPI())

        if(res?.payload?.statusCode === 200){
            navigate("/login")
        }

    }


    return(

        <div className="border-b border-gray-100 flex justify-center items-center px-4 bg-white ">


            <div className="w-full max-w-6xl py-5 flex items-center justify-between">
    
                <Link to="/">
                    <span className="flex justify-center items-center gap-2">

                    <img src={Logo} alt="Space Share Logo" className="h-8 w-8" />
                    <h1 className="text-xl font-bold bg-[linear-gradient(to_right,black_30%,#333a47_60%)] text-transparent bg-clip-text">SpaceShare</h1>

                    </span>
                </Link>

                <span className="flex items-center gap-8 text-sm">

                {
                    isLoggedIn ?

                    <Link to="/homepage">
                     <button className="cursor-pointer ">Dashboard</button>
                     </Link>
                    :

                    <Link to="/login">
                       <button className="cursor-pointer ">Login</button>
                    </Link>

                }

                {
                    isLoggedIn ?
                    <button className="bg-[#101827] rounded-md font-semibold text-white py-2 px-4 cursor-pointer" onClick={handleLogoutClick}>Logout</button>
                    :
                    <Link to="/signup">
                        <button className="bg-[#101827] rounded-md font-semibold text-white py-2 px-4 cursor-pointer">Sign Up</button>
                    </Link>

                }
               

                
                </span>

            </div>

            
        </div>
    )

}