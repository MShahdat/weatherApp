import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import HourlyForecast from './HourlyForecast';
import axios from 'axios';
const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const apiKey = '205cabab60944fa3ace85715252507';
    const apiUrl = "http://api.weatherapi.com/v1/forecast.json";
    const handleKey = (event) => {
        if(event.key === 'Enter'){
            fetchData(city);
        }
    }
    const fetchData = async(query)=>{
        try{
            const response = await axios.get(`${apiUrl}?key=${apiKey}&q=${query}&days=1`);
            console.log(response.data.forecast.forecastday[0].hour)
            setWeatherData(response.data);
            setError('');
        }catch(err){
            console.log(err)
            //console.log('there was an error or the city was not found')
            setError('there was an error or the city was not found')
        }
    }

    const CurrentLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) =>{
                const {latitude, longitude}= position.coords;
                console.log(latitude, longitude);
                const query= `${latitude}, ${longitude}`;
                fetchData(query);
            },(error) =>{
                setError(error.message);
            })
        }else{
            setError('geolocation is not supported by this browse!')
        }
    }
    return (
        <div className='bg-purple-50'>
            <p className='text-5xl font-bold text-center pt-20 text-cyan-600'>Weather Application</p>
            <div className='flex justify-center h-screen '>
                <div className='bg-white shadow-lg mt-10 p-4 rounded max-w-xl h-110'>
                    <div className='flex items-center gap-1 justify-center'>
                        <div className='flex border-2 rounded items-center px-2 py-2'>
                            <FaSearch />
                            <input onChange={(e)=>setCity(e.target.value)} onKeyUp={handleKey} className='pl-2 border-none focus:outline-none w-full' type='text' value={city} placeholder='Enter the city name'></input>
                        </div>
                        <button onClick={CurrentLocation} className='bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-900 hover:scale-105 transform duration-300'>
                            <FaMapMarkerAlt />
                        </button>
                    </div>
                    {
                        error && (
                            <p className='text-lg text-red-700 font-bold text-center' >{error}</p>
                        )
                    }
                    {
                        weatherData && (
                            <div className='mt-4 text-center'>
                                <h2 className='text-xl font-semibold'>{weatherData.location.name} </h2>
                                <img className='h-20 object-fill mx-auto mb-6' src={weatherData.current.condition.icon}></img>
                                <h2 className='text-lg font-semibold'>{weatherData.current.temp_c}°C</h2>
                                <p className='text-sm capitalize font-semibold'>{weatherData.current.condition.text} </p>
                                <HourlyForecast hourlyData = {weatherData.forecast.forecastday[0].hour}></HourlyForecast>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Weather;