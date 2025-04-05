import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import NavigationBar from "../components/NavigationBar"



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
        <div className="overflow-hidden">

            <NavigationBar/>

            {/* Hero Section */}
            <div className="w-full px-4 py-20 md:py-24 flex flex-col justify-center items-center">

                <span className="bg-gray-100 py-2 px-4 text-sm text-center rounded-full font-medium w-fit">
                    Seamless Collaboration
                </span>

                <h1 className=" tracking-tight text-center font-bold text-6xl text-wrap my-10  md:text-8xl bg-[linear-gradient(to_right,#101827,#333a47,#101827)] text-transparent bg-clip-text ">
                    Collabrate in Real-Time
                </h1>

                <p className="text-center tracking-tight text-gray-600 my-2 md:text-xl max-w-2xl">
                    Share and edit content together with your team, just like Google Docs.
                    Create a space, invite collaborators, and start working together instantly.
                </p>

                <Link to="/signup">
                    <button className="border mt-6 border-gray-200 rounded-md font-medium  py-2 px-4 cursor-pointer">
                        Get Started
                    </button>
                </Link>


                {/* Join Space Section */}
               <div className="w-full border border-gray-100 shadow-md rounded-xl  mt-20 md:mt-28 px-4 max-w-4xl ">

                    <h1 className="text-center text-xl font-bold my-8 md:text-2xl">Join Space</h1>


                    <span className="flex flex-col md:flex-row justify-center items-center py-2 px-4  bg-[#F9FAFB] gap-4 rounded-xl">

                        <input type="text" placeholder="username"  className="text-sm w-full outline-none text-center border border-gray-300 bg-white py-4 mt-4 md:mt-0 rounded-xl" name="username" value={urlData.username} onChange={handleChange} />

                        <div className="text-lg text-gray-300 hidden md:block">/</div>

                        <input type="text" placeholder="space name" className="text-sm w-full outline-none text-center border border-gray-300 bg-white py-4 my-2 rounded-xl" name="spacename" value={urlData.spacename} onChange={handleChange}/>

                        <button className="w-full bg-[#101827] md:max-w-32 text-sm font-semibold text-white rounded-lg py-4 px-6 cursor-pointer" onClick={handleSubmit}>Join Space</button>
                    </span>

                    <p className="text-center text-gray-600 text-sm my-8">
                        Enter a username and space name to join an existing collaboration
                    </p>

                </div>


                {/* Ending Section */}
                <div className="bg-[#F9FAFB] w-full mt-24 rounded-xl px-6 flex flex-col justify-center items-center py-10">

                    <h1 className="tracking-tight text-center font-bold text-3xl text-wrap my-6 md:text-4xl bg-[linear-gradient(to_right,#101827,#333a47,#101827)] text-transparent bg-clip-text ">
                        Ready to Collabrate ?
                    </h1>

                    <p className="text-center tracking-tight text-gray-600 my-2 md:text-xl max-w-2xl">
                        Join thousands of teams already using SpaceShare to work better together.
                    </p>

                    <Link to={'/signup'}>
                        <button className="my-6 bg-[#101827] md:max-w-52 text-sm font-semibold text-white rounded-lg py-4 px-6 cursor-pointer">Get Started for Free</button>
                    </Link>
                </div>


            </div>

            <Footer/>
            
            

        </div>
    )
}





