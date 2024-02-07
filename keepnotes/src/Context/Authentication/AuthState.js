import alertContext from "../Alert/alertContext";
import AuthContext from "./AuthContext";
import React, { useContext } from 'react'

const AuthState = (props) => {

    const alert =useContext(alertContext);
    const {ShowAlert}=alert;
    const host = "http://localhost:5000";

    //Verify Email by sending otp
    const verifyemail=async(email)=>{
        props.SetPrograss(10);
            //API call
        const fetchEmail = host + "/api/auth/verifyemail";
        try {
        props.SetPrograss(40);
          const response = await fetch(fetchEmail, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ to:email }),
          });
          props.SetPrograss(60);
          const send = await response.json(); // parses JSON response into native JavaScript objects
          console.log(send)
          if(send.success){
            ShowAlert('Please Cheack your Email Address');
            props.SetPrograss(100);
            return true
          }
          else{
            ShowAlert("Error")
            props.SetPrograss(100);
            return false
          }
    
        } catch (error) {
          props.SetPrograss(100);
          ShowAlert('Server Error');
          return false
        }
    
      };
    

  return (
    <AuthContext.Provider
    value={{verifyemail}}
    >
    {props.children}
  </AuthContext.Provider>
  )
}

export default AuthState
