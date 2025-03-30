import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { BACKEND_URL } from "../../../constants";
import { toast } from "sonner";



//Save the user data in local storage
const initialState = {
    loggedInStatus  : JSON.parse(localStorage.getItem("loggedInStatus") || "false") ,
    token           : localStorage.getItem("token") || '',

}

//Function calls Signup API
export const handleSignupAPI = createAsyncThunk(
    'auth/signup',
    async function(data){
        try {

            const response =  axios.post(`${BACKEND_URL}/api/v1/user/signup`,data)

            toast.promise(response,{
                loading:"Creating account"
            })

            return (await response).data
            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
)

//Function calls Signin API
export const handleSigninAPI = createAsyncThunk(
    'auth/login',
    async function(data){
        try {

            const response =  axios.post(`${BACKEND_URL}/api/v1/user/login`,data)

            toast.promise(response,{
                loading:"Logging in"
            })

            return (await response).data
            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
)

//Function calls Logout API
export const handleLogoutAPI = createAsyncThunk(
    'auth/logout',
    async function(){
        try {
            const response = axios.get(`${BACKEND_URL}/api/v1/user/logout`,{
                headers: {
                     "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })

            toast.promise(response,{
                loading:"Logging out"
            })

            return (await response).data
            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(handleSigninAPI.fulfilled , (state,action)=>{

            console.log(action.payload?.data)

            localStorage.setItem("token",action.payload?.data?.token)
            localStorage.setItem("loggedInStatus",JSON.stringify(true))

            state.loggedInStatus = true
            state.token          = action.payload?.data?.token 

        })
        .addCase(handleLogoutAPI.fulfilled , (state,action)=>{

            localStorage.removeItem("token")
            localStorage.removeItem("loggedInStatus")

            state.loggedInStatus = false
            state.token          = ''
        })
    }
    
})

export default authSlice.reducer