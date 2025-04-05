import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {io}          from "socket.io-client"
import NavigationBar from "../components/NavigationBar";

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
            console.log(val)
            setData(val)
        })

    },[])

    return(
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
            </div>




        </div>
           
        </div>
        
        </>
       
    )
}