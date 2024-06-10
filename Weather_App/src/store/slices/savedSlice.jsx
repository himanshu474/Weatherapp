import {createSlice} from '@reduxjs/toolkit';
import getDataFrom from "../../helpers/getDataFrom"

const initialState={
    savedWeather:getDataFrom(),
}

const savedSlice=createSlice({
    name:'saved',
    initialState,
    reducers:{
        addWeather(state,action){
            if(action.payload){
                const findWeather=state.savedWeather.find(
                    (weather)=>weather.name === action.payload)
                    if(findWeather){
                        findWeather.isSaved =!findWeather.isSaved
                        state.savedWeather=state.savedWeather.filter((weather)=>weather.isSaved)

                    }
                    else{
                        state.savedWeather.push({
                            name:action.payload,
                            isSaved:true,
                        })
                    }
            }
            if(!action.payload){
                return;
            }
            localStorage.setItem('saved',JSON.stringify(state.savedWeather))
        }
    }
})

export default savedSlice.reducer;
export const {addWeather}= savedSlice.actions;