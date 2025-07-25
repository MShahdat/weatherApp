import React, { useRef } from 'react';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const HourlyForecast = ({hourlyData}) => {
  const scrollRef = useRef(null);


  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mt-6">
      {/* Left Scroll Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md"
        onClick={scrollLeft}
      >
        <FaChevronLeft />
      </button>

      {/* Scrollable Forecast Cards (manual) */}
      <div
        ref={scrollRef}
        className="flex gap-4 mx-1 py-2 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {
            hourlyData.map((hour,index) =>(
                <div key={index}>
                    <div  className="px-6 py-4 flex flex-col items-center shadow-lg bg-green-100 rounded-md min-w-[100px]">
                        <p>{new Date(hour.time).getHours()}:00 </p>
                        <img className="w-10 mx-auto" src={hour.condition.icon} alt="weather" />
                        <p>{hour.temp_c}°C </p>
                    </div>
                </div>
            ))
        }
        
      </div>

      {/* Right Scroll Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md"
        onClick={scrollRight}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default HourlyForecast;
