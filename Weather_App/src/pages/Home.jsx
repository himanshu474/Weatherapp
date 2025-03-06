import React, { useState, useCallback } from 'react';
import Input from '../components/Input';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import getWeather from '../async/getWeather';
import { debounce } from 'lodash';
import getIcon from '../helpers/getIcon';
import getTempIcon from '../helpers/getTemp';
import { addWeather } from '../store/slices/savedSlice';
import IsSaved  from '../components/IsSaved';

const Home = ({ theme }) => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const { weather } = useAppSelector((state) => state.weather);
  const { savedWeather } = useAppSelector((state) => state.saved);
  
  const findWeather = savedWeather.find((el) => {
    if (el.name === (weather?.name)) {
      return true;
    }
  }); 


  const searchHandler = useCallback(
    debounce((e) => {
      dispatch(getWeather(e));
    }, 1000),
    []
  );
  const onChangeInput = useCallback(
    (e) => {
      setValue(e.target.value);
      searchHandler(e.target.value);
    },
    []
  );
  return (
    <main className={theme ? 'dark' : ''}>
    <div className="max-w-screen-xl mx-auto px-4 lg:px-6 flex flex-col items-center py-10">
      {/* Weather Icon */}
      <img
        className="h-40 mb-6"
        src={getIcon(weather?.weather[0].id ? weather?.weather[0].id : 800)}
        alt="Weather Icon"
      />
      
      {/* Temperature */}
      <span className="text-5xl text-black dark:text-black mb-6 font-bold flex items-center justify-center space-x-3">
        <img
          className="h-20"
          src={getTempIcon(Math.ceil(weather?.main.temp ? weather.main.temp : 0))}
          alt="Temperature Icon"
        />
        <span>{Math.ceil(weather?.main.temp ? weather.main.temp : 0)}°C</span>
      </span>
      
      {/* Location */}
      <span className="text-xl mb-4 font-semibold text-black dark:text-black">
        <span className="text-2xl">{weather?.name}, </span>
        <span className="uppercase text-2xl">{weather?.sys.country}</span>
      </span>
      
      {/* Weather Details */}
      <ul className="flex flex-col sm:flex-row items-center mb-8 space-y-3 sm:space-y-0 sm:space-x-6 text-black dark:text-black">
        <li className="flex items-center">
          <span className="font-semibold mr-2">Feels like:</span>
          <span>{Math.ceil(weather?.main.feels_like ? weather?.main.feels_like : 0)}°C</span>
        </li>
        <li className="flex items-center">
          <span className="font-semibold mr-2">Humidity:</span>
          <span>{weather?.main.humidity}%</span>
        </li>
        <li className="flex items-center">
          <span className="font-semibold mr-2">Info:</span>
          <span>{weather?.weather[0].main}</span>
        </li>
      </ul>
      
      {/* Save Button */}
      <button
        className="text-white bg-blue-600 hover:bg-blue-700 transition-all focus:ring-2 focus:ring-blue-400 font-medium rounded-lg px-4 py-2 focus:outline-none"
        onClick={() => {
          dispatch(addWeather(weather?.name));
        }}
      >
        <IsSaved weather={weather} />
      </button>
    </div>
  </main>
  
  
  
  
  );
};

export default Home;
