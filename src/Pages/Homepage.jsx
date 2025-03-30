import { useNavigate } from "react-router-dom"
import  axios from "axios"
import {BACKEND_URL} from "../../constants"
import { useState } from "react"

export default function Homepage(){

    const navigate = useNavigate()
    const [name,setName] = useState("")


    function handleChange(e){
        setName(e.target.value)
    }

    async function onClick(){

        const res = await axios.post(`${BACKEND_URL}/api/v1/space/createSpace`,
        {name:name},
        {
            headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
        })

        if(res?.data.statusCode == 201){
            navigate(`/master/${res?.data?.data?.name}`)
        }
        
    }

    return(
        <div>
            Home Page
         

            <input type="text" className="border" placeholder="Enter Space Name " value={name} name="name" onChange={handleChange}/>

            <button onClick={onClick}>Create Space</button>
        </div>
    )
}