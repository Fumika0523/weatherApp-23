import Header from "./components/Header"
import { FaCloud, FaSearch, FaWind } from 'react-icons/fa';
import { IoSunny } from "react-icons/io5";
import Page from "./AboutUs/page"

export default function Homepage(){

const data = [1,2,3,4,5,6]
const weekData = [1,2,3,4,5,6,7]

    return(
      <>
      <div className="flex-row flex">
        <div className="border-4 border-amber-700 w-1/6"></div>
        {/* LEFT */}
        <div className="border-4 border-amber-700 md:w-4/6 sm:w-10/12">
        {/* Search Bar */}
        <div className="relative flex items-center align-items m-5 ">
            <FaSearch className="absolute left-5 tranform -translate-1/2  text-gray-500 "/>
            <input className="h-[40px] w-full pl-12 pr-5 rounded-xl border border-gray-300 focus:outline-none " type="text" placeholder="Enter the city"/>
        </div> 

        {/* Right - Main Weather Result */}
        <div className=" mx-5 px-7 flex flex-row justify-between items-center mb-5">
          <div className="">
            <div className="font-bold text-2xl">Madrid</div>
            <div className="text-gray-500">Chance of rain:<span>10</span>%</div>
            <div className="text-5xl font-bold mt-5">31°</div>
          </div>
          <div>
            <div><IoSunny className="text-amber-500 text-9xl"/></div>
          </div>
        </div>
        {/* Today's Forecast - 2nd Column */}
        <div className="mb-5 bg-gray-800/60  rounded-[20px] flex flex-col mx-5 px-6 py-7 space-y-5">
            <p className="text-gray-500 font-bold uppercase border ">Today's Forecast</p>
            {/* Hourly Weather */}
            <div className="flex border items-center justify-between overflow-x-scroll scrollbar-hide">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-2 justify-center items-center border-r border-gray-500/50 px-5"
                  >
                    <span className="font-bold text-sm whitespace-nowrap text-gray-500">6:00 AM</span>
                    <FaCloud className="text-3xl" />
                    <span className="text-gray-100 font-bold">25°</span>
                  </div>
                  ))}
            </div>
        </div>

        {/* Today's Forecast - 3rd Column */}
         <div className="mb-5 bg-gray-800/60  rounded-[20px] flex flex-col mx-5 px-6 py-7 ">
            <p className="text-gray-500 border-4 font-bold uppercase">Air Conditions</p>
            <div className="border border-amber-700 flex flex-row">
       
                  <div className="flex-row flex gap-2 border-2 w-1/2">
                    <span><FaWind /></span>
                    <span className="flex flex-col">
                      <span>Real Feel</span>
                      <span>30°</span>
                    </span>
                  </div>
                  <div className="flex-row flex gap-2 border-2 w-1/2">
                    <span><FaWind /></span>
                    <span className="flex flex-col">
                      <span>Real Feel</span>
                      <span>30°</span>
                    </span>
                  </div>
                  
            </div>
            <div className="border border-amber-700 flex flex-row">
       
                  <div className="flex-row flex gap-2 border-2 w-1/2">
                    <span><FaWind /></span>
                    <span className="flex flex-col">
                      <span>Real Feel</span>
                      <span>30°</span>
                    </span>
                  </div>
                  <div className="flex-row flex gap-2 border-2 w-1/2">
                    <span><FaWind /></span>
                    <span className="flex flex-col">
                      <span>Real Feel</span>
                      <span>30°</span>
                    </span>
                  </div>
                  
            </div>
        
        </div>
        </div>  

        {/* RIGHT */}
        <div className="border-4 border-amber-700 w-2/6 md:block  hidden">
          <div className="mb-5 bg-gray-800/60 mt-20 rounded-[20px] flex flex-col mx-5 px-6 py-7 space-y-5">
            <div className="text-gray-500 font-bold uppercase border ">7 Day Forecast</div>
            <div className="border-2 ">
              {weekData.map((element,index)=>( 
              
                <div key={index} className="flex border-b  border-gray-400 items-center justify-between py-4">
                  <span>Today</span>
                  <span className="flex items-center gap-2 flex-row"> <FaCloud className="text-5xl" />Cloud</span>
                  <span>36/22</span>
                </div>
           
              ))}
            </div>
          </div>
        </div>
      </div>
      < Page />
    
      </>
    )
}