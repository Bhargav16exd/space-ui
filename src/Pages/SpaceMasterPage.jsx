import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client";
import { BACKEND_URL } from "../../constants";
import NavigationBar from "../components/NavigationBar";


export default function SpaceMasterPage(){


    const {uniqueSpaceName} = useParams()
    const {username}        = useParams()
    const pRef = useRef([])
    const [currentActiveComponentIndex , setCurrentActiveComponentIndex] = useState(0)
    let socket = useRef(null);

    const [data , writeData] = useState({
        content : [
          {id:"1",inputType:"text",data:"" ,placeholder:"Enter your text here", style:"",image:"",imagePreview:""}
        ]
    })


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

        return () => {
            socket.current.disconnect();
        }

    },[])

  


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
              data.content.map((item,index) => {
                  return(
                      <div key={index}>
                          <TextAreaComponent item={item} index={index} pRef={pRef} handleChange={handleChange} handleKeyDown={handleKeyDown} onClickFocus={handleOnClick}/>
                      </div>
                  )
              })
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