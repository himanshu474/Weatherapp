import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'


const getWeather = createAsyncThunk(
    'weather/getWeather',
    async function getWeatherThunk(coord, { getState, rejectWithValue }) {
        try {
          const state = getState();
          const weather = state.weather;
          const isMounted = weather.isMounted;
      
          // Check if the weather is not mounted and coord is an object (latitude and longitude)
          if (!isMounted && typeof coord === 'object') {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${coord.latitude}&lon=${coord.longitude}&appid=2736b95ff87e33632bec7c08dc4f678f`
            );
            const data = response.data;
            if (data) {
              return data;
            } else {
              return rejectWithValue('rejected');
            }
          } else {
            // If the weather is mounted or coord is not an object (assumed to be a location name)
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${coord}&units=metric&appid=2736b95ff87e33632bec7c08dc4f678f`
            );
            const data = response.data;
            if (data) {
              return data;
            } else {
              return rejectWithValue('rejected');
            }
          }
        } catch (error) {
          return rejectWithValue('rejected');
        }
      }
  );


  export default getWeather
