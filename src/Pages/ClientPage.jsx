import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {io}          from "socket.io-client"

export default function ClientPage(){

    const {uniqueSpaceName} = useParams()
    const {username}        = useParams()
    
    const [data,setData]    = useState([])

    let socket ;

   
    useEffect(()=>{

        socket = io('http://localhost:9000',{
            query:{
                space:`${username}/${uniqueSpaceName}`,
                role :'Joinee'
            }
        })

        socket.on("chat",(val)=>{
            setData(val)
        })

    },[])

    return(
        <div className="bg-[#F9FBFD] min-h-screen w-screen py-6 flex flex-col justify-center items-center px-4 ">
            Client Page
            <h1>Connected Space : {uniqueSpaceName}</h1>
            <div className="min-h-screen bg-white w-full max-w-4xl border border-gray-200 shadow-md py-16 px-6 ">

                {data?.map((item)=> <p key={item?.id} className="leading-7 text-gray-800 my-6">{item?.data}</p>)}

            </div>
            
        </div>
    )
}