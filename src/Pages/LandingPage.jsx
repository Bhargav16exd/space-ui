import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function LandingPage(){


    const navigate = useNavigate()

    const [urlData , setUrlData] = useState({
        username:'',
        spacename:""
    })


    function handleChange(e){

        const {value,name} = e.target 

        setUrlData({
            ...urlData,
            [name]:value
        })

    }

    function handleSubmit(){
        navigate(`/joinee/${urlData.username}/${urlData.spacename}`)
    }

    


    return(
        <div>
            <h1>
                Some Random Big Heading
            </h1>

            <Link to="/login">
                <button>Login</button>
            </Link>

            <Link to="/signup">
             <button>Sign Up</button>
            </Link>

            

            


            <h1 className="text-5xl">
                Join room
            </h1>

            <div className=" p-4 ">

                <span className="flex justify-center items-center  w-fit py-2 px-2  bg-gray-200 gap-4">
                    <input type="text" placeholder="username"  className="text-center bg-gray-50" name="username" value={urlData.username} onChange={handleChange} />
                    <div className="text-2xl">/</div>
                    <input type="text" placeholder="space name" className="text-center bg-gray-50" name="spacename" value={urlData.spacename} onChange={handleChange}/>

                    <button className=" cursor-pointer" onClick={handleSubmit}>Join Space</button>
                </span>
                
                
            </div>
        </div>
    )
}