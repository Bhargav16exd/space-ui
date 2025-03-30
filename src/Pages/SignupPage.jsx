import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "sonner"
import {useDispatch} from "react-redux"
import { handleSignupAPI } from "../redux/slices/authSlice";

export default function Signup (){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [signupData,setSignupData] = useState({
        username:"",
        password:"",
        confirmPassword:""
    })
    
    function handleChange(e){
        const {name,value} = e.target
    
        setSignupData({
            ...signupData,
            [name]:value
        })
    }
    
    async function handleSubmit(e) {
    
        e.preventDefault()
    
        if(!signupData.username || !signupData.password || !signupData.confirmPassword ){
            toast.error('Username or password is empty')
            return
        }

        if(signupData.password != signupData.confirmPassword){
            toast.error('Password doesnt match')
            return
        }      
        
        // Calls handleSignupAPI to signup
        const res = await dispatch(handleSignupAPI(signupData))

        console.log(res)


        // Redirect to login page if signup is successful
        if(res?.payload?.statusCode == 201){
            navigate('/login')
        }
        else{
            return
        }

    }

    return (
        <div className="h-screen w-screen bg-[#f3f4f6] flex justify-center items-center">

            <form className="h-auto w-[80%] flex justify-center items-center flex-col bg-[#ffffff] border rounded-lg py-4 px-6 sm:w-[35%]">
                <div className="w-full flex justify-center items-start flex-col my-2">

                    <h1 className=" font-semibold text-3xl my-2">Sign Up for Log</h1>
                    <p className="text-gray-500 text-sm my-2">Create your account to start blogging</p>

                </div>
                <div className="w-full flex justify-center items-start flex-col my-2">
                    <label className="my-1 font-medium">
                        Username
                    </label>
                    <input  autoComplete="new-username" type="text" placeholder="Enter your username" name="username"  value={signupData.username} onChange={handleChange} className="my-1 outline-none border rounded-md w-full py-2 px-2"  />
                </div>
                <div className="w-full flex justify-center items-start flex-col my-2">
                    <label className="my-1 font-medium">
                        Password
                    </label>
                    <input autoComplete="new-password" type="password" placeholder="Create a password" name="password" value={signupData.password}  onChange={handleChange} className="my-1 outline-none border rounded-md w-full py-2 px-2"  />
                </div>
                <div className="w-full flex justify-center items-start flex-col my-2">
                    <label className="my-1 font-medium">
                        Confirm Password
                    </label>
                    <input  autoComplete="new-password" type="password" placeholder="Confirm your password" name="confirmPassword" value={signupData.confirmPassword} onChange={handleChange} className="my-1 outline-none border rounded-md w-full py-2 px-2"  />
                </div>
                <div className="my-1 bg-black text-white text-center border rounded-md w-full py-2 px-2" onClick={handleSubmit}>
                    Sign Up
                </div>
                <div className="text-base my-3 text-gray-600 flex">
                    Already have an account ?  <div className="text-blue-500 mx-2"> <Link to={'/login'}>Login</Link></div>
                </div>
            </form>

        </div>
    );
}