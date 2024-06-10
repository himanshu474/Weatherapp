import { configureStore } from '@reduxjs/toolkit';
import savedSlice from './slices/savedSlice';
import weatherSlice from './slices/weatherSlice';

const store = configureStore({
  reducer: {
    weather: weatherSlice,
    saved: savedSlice,
  },
});

export default store;