import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {io}          from "socket.io-client"
import NavigationBar from "../components/NavigationBar";
import { BACKEND_URL } from "../../constants";
import axios from "axios";
import people from "../assets/people.png"

export default function ClientPage(){

    const {uniqueSpaceName} = useParams()
    const {username}        = useParams()
    const [isSecured , setIsSecured] = useState(null)
    const [peopleCount , setPeopleCount] = useState(1)
    const navigate = useNavigate()


    const [data,setData]    = useState([])

    async function checkIsSecured(){
        const res = await axios.get(`${BACKEND_URL}/api/v1/space/exists/${username}/${uniqueSpaceName}`)

        if(res.data?.exist){
            setIsSecured(true)
        }else{
            setIsSecured(false)
            return false
        }
    }

    let socket ;

   
    useEffect(()=>{

        checkIsSecured()

        socket = io(BACKEND_URL,{
            query:{
                space:`${username}/${uniqueSpaceName}`,
                role :'Joinee'
            }
        })

        socket.on("chat",(val)=>{
            setData(val)
        })

        socket.on('user-joined',(val)=>{
            setPeopleCount(val)
        })

    },[])


    useEffect(()=>{

        if(isSecured== false){
            navigate('/');
        }

    },[isSecured])

    return(

        <>

            {
                isSecured ? 

                <>
                <NavigationBar/>
        
                <div className="bg-[#F9FAFB] min-h-screen w-screen py-6 flex flex-col justify-center items-center px-4 pb-16">
                    
                <div className="w-full max-w-6xl flex flex-col-reverse gap-6 md:flex-row">

                    <div className="min-h-screen bg-white w-full md:mx-8 max-w-3xl border border-gray-100 rounded-xl shadow-md py-16 px-6 text-center "> 
                    
                    {
                        data?.length === 0 ? 
                        <div className="flex flex-col justify-center items-center text-sm text-gray-500">
                            <p>
                            Waiting for content...
                            </p>
                            <p className="text-xs font-gray-400">
                            Content will appear here as it's shared
                            </p>
                        </div>

                        :
                        data?.map((item)=> <p key={item?.id} className="leading-7 text-gray-800 my-6">{item?.data}</p>)
                    }
                    
                    </div>

                        {/* Space Information */}
                    <div className="h-fit bg-white p-6 rounded-xl border border-gray-100 shadow-xs">

                        <h1 className="text-lg font-bold text-gray-800 mb-4">
                        Space Connected 
                        </h1>

                        <p className="text-sm text-gray-500 mb-2">
                        Username : {username}
                        </p>

                        <p className="text-sm text-gray-500 mb-2">
                        Space-name : {uniqueSpaceName}
                        </p>

                        <div>

                            <span className=" flex justify-start items-center gap-4 my-4">
                                <img src={people} alt="" className="h-5 w-5" />

                                <h1 className="text-green-800 bg-green-100 py-0.5 px-4 rounded-full ">
                                    {peopleCount} online
                                </h1>
                            </span>
                        </div>

                    </div>




                </div>
                
                </div>
                
                 </>
                :
                
                <>Loading</>
            }        

        </>
       
    )
}