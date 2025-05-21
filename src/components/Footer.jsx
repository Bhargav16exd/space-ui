import Logo from "../assets/logo.png"
export default function Footer(){

    return(

        <div className="border-t border-gray-100 flex justify-center items-center px-4  ">


            <div className="w-full max-w-6xl py-5 flex flex-col gap-6 md:flex-row items-center justify-between">

                <span className="flex justify-center items-center gap-2">
                    <img src={Logo} alt="Space Share Logo" className="h-8 w-8" />
                    <h1 className="text-xl font-bold bg-[linear-gradient(to_right,black_30%,#333a47_60%)] text-transparent bg-clip-text">SpaceShare</h1>
                </span>
                <p className="tracking-tight text-gray-600">
                © 2025 SpaceShare. All rights reserved.
                </p>

            </div>

            
        </div>
    )

}