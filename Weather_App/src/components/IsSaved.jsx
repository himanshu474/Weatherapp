import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useAppSelector } from '../hooks/hooks';
// import { WeatherResponse } from '../types';
import { RiPlayListAddLine } from 'react-icons/ri';

const IsSaved = ({ weather }) => {
  const { savedWeather } = useAppSelector((state) => state.saved);
  const findWeather = savedWeather.find((el) => {
    if (el.name === (weather?.name)) {
      return true;
    }
  });

  return findWeather ? (
    <span className='flex items-center'>
      <AiFillDelete className='h-4 mr-2' />{' '}
      <span className='text-sm font-medium'>Delete from saved</span>
    </span>
  ) : (
    <span className='flex items-center'>
      <RiPlayListAddLine className='h-4 mr-2' />{' '}
      <span className='text-sm font-medium'>Add to saved</span>
    </span>
  );
};

export default IsSaved;
