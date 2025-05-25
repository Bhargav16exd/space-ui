import { useNavigate } from "react-router-dom"
import  axios from "axios"
import {BACKEND_URL} from "../../constants"
import { useEffect, useState } from "react"
import NavigationBar from "../components/NavigationBar"
import Stack from "../assets/stack.png"
import up from "../assets/up.png"
import down from "../assets/down.png"
import archive from "../assets/archive.png"

export default function Homepage(){

    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [isOpen , setIsOpen] = useState(false)
    const [dropDownValue , setDropDownValue] = useState('')

    const [showRecentSpace , setShowRecentSpace] = useState(true)
    const [showArchiveSpace , setShowArchiveSpace] = useState(false)

    const selfDestructTime = ['1hr' , '6hr' , '12hr' , '24hr']


    function handleShowRecentSpace(){
        setShowRecentSpace(true)
        setShowArchiveSpace(false)
    }

    function handleShowArchiveSpace(){
        setShowArchiveSpace(true)
        setShowRecentSpace(false)

    }


    function handleOnSelectDropDownItem(time){
        setDropDownValue(time)
        setIsOpen(!isOpen)
    }

    function handleDropdown(){
        setIsOpen(!isOpen)
    }


    function handleChange(e){
        setName(e.target.value)
    }

    async function onClick(){

        if(!name){
            return
        }

        if(!name.trim()){
            return
        }

        if(!dropDownValue){
            return
        }

        
        const res = await axios.post(`${BACKEND_URL}/api/v1/space/createSpace`,
        {name:name , selfDestructTime:dropDownValue},
        {
            headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
        })

        if(res?.data.statusCode == 201){
            navigate(`/master/${res?.data?.data?.name}`)
        }
        
    }

    async function getAllSpaceDetails(){

        const res = await axios.get(`${BACKEND_URL}/api/v1/space/getAllSpaces`,
        {
            headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
        })

        if(res?.data.statusCode == 200){
            setSpaces(res?.data?.data)
        }
    }

    useEffect(()=>{
      getAllSpaceDetails()
    },[])

    return(
        
        <section className="bg-[#F9FAFB] min-h-screen">

            <NavigationBar/>

            <div className=" px-4 py-12 flex justify-center items-center ">

            <div className="flex flex-col w-full max-w-6xl md:flex-row">

                 {/* Left Section */}
                <div className="min-w-[70%] md:px-8">

                    <h1 className="font-bold text-3xl mb-6">
                        Welcome back !
                    </h1>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs ">

                        <span className="flex py-2 rounded-xl">
                            <span className={` w-1/2 flex justify-center items-center gap-4 mx-2 rounded-xl cursor-pointer ${showRecentSpace && 'border border-gray-200' }`} onClick={handleShowRecentSpace}>
                                <img src={Stack} alt="Stack Logo" className="h-5 w-5" />
                                <p className="text-xl font-bold">
                                    Recent
                                </p>
                            </span>
                            <span className={`w-1/2 flex justify-center items-center gap-4 mx-2 cursor-pointer rounded-xl ${ showArchiveSpace && 'border border-gray-200' } `} onClickCapture={handleShowArchiveSpace}>
                               <img src={archive} alt="Stack Logo" className="h-10 w-10" />
                                <p className="text-xl font-bold">
                                    Archive
                                </p>

                            </span>
                           
                        </span>


                        {
                            showRecentSpace && <RecentSpaceComponent/>
                        }

                        {
                            showArchiveSpace && <ArchiveSpaceComponent/>
                        }


                        
                    </div>

                </div>

                {/* Right Seciton */}
                <div className="mt-16 flex flex-col gap-6 md:mt-0">

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">
                    
                    <span className="flex text-xl font-semibold gap-2">
                        <p>+</p>
                        <p>
                            Create New Space
                        </p>
                    </span>


                    <p className="text-sm text-gray-500 mt-2">
                        Create a new collaborative space for your team
                    </p>

                    <div className="mt-6 flex flex-col gap-2">
                        <label htmlFor="" className="text-sm font-semibold">Space Name</label>
                        <input type="text" className="border border-gray-200 rounded-lg p-2 px-4 text-sm outline-none" placeholder="Enter space name " value={name} name="name" onChange={handleChange}/>
                    </div>


                    <div className="mt-6 flex flex-col gap-2">
                        <label htmlFor="" className="text-sm font-semibold">Self Destruct Time</label>
                        <div className="border border-gray-200 rounded-lg p-2 px-4  outline-none cursor-pointer flex items-center justify-between " onClick={handleDropdown}>

                            <span className="text-sm text-gray-500"> { dropDownValue ? dropDownValue : "Choose Self Destruct Time" }</span>
                            {
                                isOpen ?
                                <img src={up} alt="Up Arrow Image" className="h-4 w-4"/>
                                 :
                                <img src={down} alt="Down Arrow Image" className="h-4 w-4" />
                            }

                        </div>

                        {
                                isOpen && (
                                    <div className="border border-gray-200 rounded-lg py-2 px-2">
                                        {
                                            selfDestructTime.map((el)=>(
                                                <DropDownComponent timeValue={el} key={el} handleOnSelectDropDownItem={handleOnSelectDropDownItem}/>
                                            ))
                                        }
                                    </div>
                                )
                        }
                    </div>
                    
                    <button onClick={onClick} className="cursor-pointer bg-[#101827] rounded-md text-sm text-white py-3 mt-6 px-4 w-full">Create Space</button>

                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">

                    <h1 className="font-semibold">
                        Quick Tips
                    </h1>

                    <span className="flex gap-2 text-sm justify-start items-center my-2 text-gray-700">

                        <div className="bg-gray-100 rounded-full h-6 w-6 flex justify-center items-center p-1">1</div>
                        <p>Create a space with a descriptive name</p>

                    </span>

                    <span className="flex gap-2 text-sm justify-start items-center my-2 text-gray-700">

                        <div className="bg-gray-100 rounded-full h-6 w-6 flex justify-center items-center p-1">2</div>
                        <p>Invite team members to collaborate</p>

                    </span>
                    
                    <span className="flex gap-2 text-sm justify-start items-center my-2 text-gray-700">

                        <div className="bg-gray-100 rounded-full h-6 w-6 flex justify-center items-center p-1">3</div>
                        <p>Start editing in real-time together</p>

                    </span>

                </div>

                </div>

            </div>

            


          
            </div>
        </section>
        
    )
}


function RecentSpaceComponent(){

    const [spaces,setSpaces] = useState([])

    async function getAllSpaceDetails(){

        const res = await axios.get(`${BACKEND_URL}/api/v1/space/recent`,
        {
            headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
        })

        if(res?.data.statusCode == 200){
            setSpaces(res?.data?.data)
        }
    }

    useEffect(()=>{
      getAllSpaceDetails()
    },[])

    return(
        <div className="p-6">

            {
                spaces.length > 0 ? 

                    spaces.map((space)=>(
                        <div className="text-sm my-8 py-4 px-4 rounded-xl border border-gray-100" key={space.name}>
                            {space?.name}
                        </div>))

                        :
                            
                        <div className="text-sm my-8 py-4 px-4 rounded-xl border border-gray-100">
                            No Spaces Found
                        </div>
            }

                        
        </div>
    )
}

function ArchiveSpaceComponent(){

    const [spaces,setSpaces] = useState([])

    async function getAllSpaceDetails(){

        const res = await axios.get(`${BACKEND_URL}/api/v1/space/archive`,
        {
            headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
        })

        if(res?.data.statusCode == 200){
            setSpaces(res?.data?.data)
        }
    }

    useEffect(()=>{
      getAllSpaceDetails()
    },[])

    return(
        
         <div className="p-6">

            {
                spaces.length > 0 ? 

                    spaces.map((space)=>(
                        <div className="text-sm my-8 py-4 px-4 rounded-xl border border-gray-100" key={space.name}>
                            {space?.name}
                        </div>))

                        :
                            
                        <div className="text-sm my-8 py-4 px-4 rounded-xl border border-gray-100">
                            No Spaces Found
                        </div>
            }

                        
        </div>
    )
}


function DropDownComponent({timeValue, handleOnSelectDropDownItem}){

    return(
        <div className=" p-2 px-4 ext-sm cursor-pointer flex items-center text-gray-500 rounded-lg hover:bg-gray-100" onClick={()=>handleOnSelectDropDownItem(timeValue)} >{timeValue}</div>
    )

}