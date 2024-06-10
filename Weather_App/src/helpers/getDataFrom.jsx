// import weather from "../store/slices/savedSlice"


const getDataFrom=()=>{
    const data=localStorage.getItem('saved');
    if(data){
        return JSON.parse(data)
    }
    else{
        return [];
    }
}

export default getDataFrom;