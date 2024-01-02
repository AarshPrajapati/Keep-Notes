import alertContext from "./alertContext";
import React,{useState} from "react";

const DisplayAlert = (props) => { 

    const [alert,setalert]=useState({mes:"hh",type:'sas'});
    const ShowAlert=(message,type)=>{
        setalert({
          msg:message,
          type:type
        })
        setTimeout(() => {
          setalert(null);
        }, 2000);
  }
  return (
    <alertContext.Provider value={{alert,ShowAlert}} >
      {props.children}
    </alertContext.Provider>
  );
};

export default DisplayAlert;
