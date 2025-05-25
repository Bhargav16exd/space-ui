import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { io } from "socket.io-client";
import { BACKEND_URL } from "../../constants";
import NavigationBar from "../components/NavigationBar";
import people from "../assets/people.png"
import axios from "axios";



export default function SpaceMasterPage(){


    const {uniqueSpaceName} = useParams()
    const {username}        = useParams()
    const [peopleCount , setPeopleCount] = useState(1)
    const navigate = useNavigate()
    const pRef = useRef([])
    const [currentActiveComponentIndex , setCurrentActiveComponentIndex] = useState(0)
    let socket = useRef(null);

    const [data , writeData] = useState()

    function writeDefaultCanvas(){

       writeData({
        content : [
          {id:"1",inputType:"text",data:"" ,placeholder:"Enter your text here", style:"",image:"",imagePreview:""}
        ]

      })

    }

    async function getLatestData(){

        const space = `${username}/${uniqueSpaceName}`

        const res = await axios.post(`${BACKEND_URL}/api/v1/space/latest` ,{space})

        if(res?.data?.message == "No Such Space Exist"){
          writeDefaultCanvas()
          return
        }

        if(res?.data?.data){
            const val = res?.data?.data?.content
            const countVal = res?.data?.data?.count

            if(val){
              val.map((el)=>{

                if(el.data){
                  setIncomingAPIDataToWriteData(el)
                }
                
              })
            }
            setPeopleCount(countVal)

            if(!val){
             writeDefaultCanvas()
            }

        }

        if(res?.data?.success == true && !res?.data?.data){
          writeDefaultCanvas()
        }
    }

    function setIncomingAPIDataToWriteData(el){

      writeData((prevData)=>{

         if(prevData){
            const newAppendedEl = {id:el?.id ,inputType:"text",data:el?.data ,placeholder:"Enter your text here", style:"",image:"",imagePreview:""}
            const updatedData = {
            ...prevData,
            content : [ ...prevData?.content , newAppendedEl ]
            }
          return updatedData
        }
        else{

           const newAppendedEl = {id:el?.id ,inputType:"text",data:el?.data ,placeholder:"Enter your text here", style:"",image:"",imagePreview:""}
            const updatedData = {
            content : [ newAppendedEl ]
            }
          return updatedData
           
        }

         

      })
    }


    useEffect(()=>{

        socket.current = io(BACKEND_URL,{
            query:{
                space:`${username}/${uniqueSpaceName}`,
                role:'Space Master'
            },
            auth:{
                token:localStorage.getItem("token")
            }
        })

        socket.current.on('user-joined',(val)=>{
                setPeopleCount(val)
        })

        getLatestData()

        return () => {
            socket.current.disconnect();
        }

    },[])

  
    async function handleArchive(){

      if(!data.content[0].data){
        alert("Empty Space Cannot Be Archived")
        return
      }


      const res = await axios.post(`${BACKEND_URL}/api/v1/space/archive` ,{spacename:uniqueSpaceName},{
            headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
      })

      if(res?.data?.message == "Archived Successfully" && res?.data?.statusCode == 200 ){
        navigate('/homepage')
      }


    }


    function handleChange(e,index){

    
        const {value} = e.target 
        const textarea = e.target 
    
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    
        writeData((prevData)=>{
          
          const newContent = [...prevData.content]
    
          newContent[index].data = value

          const updatedData = {
            ...prevData,
            content:newContent
          }
            socket.current.emit("chat", updatedData)

            return updatedData
        })

    }


    function handleKeyDown(e,index){

        if(e.key === 'Enter'){
    
          e.preventDefault()
    
          writeData((prevData)=>{
    
            const newContent = [...prevData.content , {id:`${prevData.content.length+1}` ,  inputType:"text" , data:"" , placeholder:"Enter your text here" , style:"",image:'',imagePreview:""}]
            const updatedData = { ...prevData , content:newContent}
            socket.current.emit("chat", updatedData)
            return updatedData
    
          })
          
          setTimeout(() => {
            const nextIndex = index + 1;
            if (pRef.current[nextIndex]) {
              pRef.current[nextIndex]?.focus(); 
              setCurrentActiveComponentIndex(index+1)
            }
          }, 0);
    
          
    
        }
        else if(e.key === "Backspace" && data.content[index].data === ""){
          
          e.preventDefault();
          writeData((prev) => {
            const newContent = [...prev.content];
            if (newContent.length > 1) {
              newContent.splice(index, 1);
            }
            const updatedData = { ...prev, content: newContent };
            socket.current.emit("chat", updatedData)
            return updatedData
           
          });
    
          setTimeout(() => {
            const prevIndex = index - 1;
            if (pRef.current[prevIndex]) {
              pRef.current[prevIndex]?.focus(); // Auto-focus previous input after deletion
              setCurrentActiveComponentIndex(index-1)
            }
          }, 0);

         
        }
        else if(e.key === "ArrowUp"){
    
          setTimeout(() => {
            const prevIndex = index - 1;
            if(pRef.current[prevIndex]){
    
             pRef.current[prevIndex]?.focus()
    
             const length = pRef.current[prevIndex].value.length;
             pRef.current[prevIndex].setSelectionRange(length,length)
    
             setCurrentActiveComponentIndex(index-1)
            }
          }, 0);
    
        }
        else if(e.key === "ArrowDown"){
    
          setTimeout(() => {
    
            const nextIndex = index + 1;
            if(pRef.current[nextIndex]){
    
             pRef.current[nextIndex]?.focus()
             const length = pRef.current[nextIndex].value.length;
             pRef.current[nextIndex].setSelectionRange(length,length)
    
             setCurrentActiveComponentIndex(index+1)
            }
          }, 0);
    
        }
    }

    function handleOnClick(index){
        setCurrentActiveComponentIndex(index)
    }
      



    return(
    <>

      <NavigationBar/>

      <div className="bg-[#F9FAFB] min-h-screen w-screen py-6 flex flex-col justify-center items-center px-4 pb-16 ">

      <div className="w-full max-w-6xl flex flex-col-reverse gap-6 md:flex-row">

        {/* Writing Canvas */}
        <div className="min-h-screen bg-white w-full md:mx-8 max-w-3xl border border-gray-100 rounded-xl shadow-md py-16 px-6 text-center">

          {
            data ?
            
              data.content.map((item,index) => {
                  return(
                      <div key={index}>
                          <TextAreaComponent item={item} index={index} pRef={pRef} handleChange={handleChange} handleKeyDown={handleKeyDown} onClickFocus={handleOnClick}/>
                      </div>
                  )
              })
          
          :
           <>
            Loading
           </>

          }
          
        </div>

        {/* Space Information */}
        <div className="h-fit bg-white p-6 rounded-xl border border-gray-100 shadow-xs">

            <h1 className="text-lg font-bold text-gray-800 mb-4">
              Space Information
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

            <button className="bg-[#101827] rounded-md font-semibold text-white py-2 px-4 cursor-pointer my-6" onClick={handleArchive}>Archive</button>
        </div>


      </div>

      </div>
    
    </>
        
    )
}

function TextAreaComponent({item,index,pRef,handleChange,handleKeyDown,onClickFocus}){
    return(
  
      <textarea
                     ref={(el)=> pRef.current[index] = el}
                     value={item.data} 
                     onKeyDown = {(e) => handleKeyDown(e,index)} 
                     onChange  = {(e) => {
                      const target = e.target
                      target.style.height = "auto"
                      target.style.height = `${target.scrollHeight}px`
                      handleChange(e,index)}}  
                     className={` py-4 px-4 outline-none w-full max-w-3xl resize-none`}
                     placeholder={item.placeholder}
                     onFocus={()=> onClickFocus(index)}
                     
      />
  
    )
}