import {createSlice} from "@reduxjs/toolkit"
import getWeather from "../../async/getWeather"

const initialState = {
    status: null,
    weather: null,
    isMounted: false,
  };
  
  const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
      setWeather(state, action) {
        state.weather = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(getWeather.fulfilled, (state, action) => {
        if (!state.isMounted) {
          if (action.payload) {
            state.weather = action.payload;
            state.status = null;
            state.isMounted = true;
          }
        } else {
          if (action.payload) {
            state.weather = action.payload;
            state.status = 'fulfilled';
          }
        }
      });
      builder.addCase(getWeather.pending, (state) => {
        state.status = 'pending';
      });
      builder.addCase(getWeather.rejected, (state, action) => {
        if (action.payload === 'rejected') {
          state.status = action.payload;
          state.weather = null;
        }
      });
    },
  });
  
  export default weatherSlice.reducer;
  export const { setWeather } = weatherSlice.actions;