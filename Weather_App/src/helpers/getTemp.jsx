import htemp from '../assets/icons/h-temp.svg';
import ctemp from '../assets/icons/c-temp.svg';

const getTempIcon=(temp)=>{
if(temp>0){
    return htemp
}
else if(temp<0){
    return ctemp
}
else return htemp
}
export default getTempIcon