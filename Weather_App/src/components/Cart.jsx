import axios from 'axios';
import React, { useState, useEffect } from 'react';
import getIcon from '../helpers/getIcon';
import { useAppDispatch } from '../hooks/hooks';
import { addWeather } from '../store/slices/savedSlice';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { IsSaved } from './IsSaved';

const Cart = ({ name, index }) => {
  const [weather, setWeather] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=2736b95ff87e33632bec7c08dc4f678f`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  return (
    <div className='w-[360px] h-[250px] sm:w-[500px] text-gray-800 bg-[#fefefe]  rounded-md p-3 flex flex-col shadow-md border-2 border-gray-400 dark:bg-[#1F2937] dark:text-white dark:border-gray-600'>
      <div className='flex justify-between items-center'>
        <span className='font-bold text-lg'>
          {index + 1}. {weather?.name}, {weather?.sys.country}
        </span>
        <img
          className='h-14'
          src={getIcon(weather?.weather[0].id ? weather?.weather[0].id : 800)}
          alt=''
        />
      </div>
      <span className='mb-1'>
        <span className='font-semibold'>Temperature:</span>{' '}
        {Math.ceil(weather?.main.temp)}°C
      </span>
      <span className='mb-1'>
        <span className='font-semibold'>Info: </span>
        {weather?.weather[0].main}
      </span>
      <span className='mb-1'>
        <span className='font-semibold'>Humidity: </span>
        {weather?.main.humidity}%
      </span>
      <span className='mb-4'>
        <span className='font-semibold'>Feels Like: </span>
        {Math.ceil(weather?.main.feels_like)}°C
      </span>
      <div className='flex justify-between'>
        <a
          className='dark:text-white bg-gray-200 hover:bg-gray-300 text-gray-700 dark:hover:bg-[#0e48c5]
            dark:bg-[#1956db] transition-all focus:ring-2 focus:ring-gray-400 font-medium rounded px-3 lg:px-4 py-1.5 lg:py-2 focus:outline-none text-sm flex items-center'
          target='_blank'
          href={`https://www.google.se/search?q=weather+${weather?.name}`}
        >
          <HiOutlineExternalLink className='mr-2 h-4'/>
          More info
        </a>

        <button
          className='
            dark:text-white bg-gray-200 hover:bg-gray-300 text-gray-700 dark:hover:bg-[#0e48c5]
            dark:bg-[#1956db] transition-all focus:ring-2 focus:ring-gray-400 rounded px-3 lg:px-4 py-1.5 lg:py-2 focus:outline-none text-sm'
          onClick={() => {
            dispatch(addWeather(weather?.name));
          }}
        >
          <IsSaved weather={weather} />
        </button>
      </div>
    </div>
  );
};

export default Cart
