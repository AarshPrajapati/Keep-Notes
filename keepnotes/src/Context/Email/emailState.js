import emailContext from "./emailContext";
import React, { useContext } from "react";
import alertContext from "../Alert/alertContext";

const EmailState = (props) => {
    // const SetPrograss = props;
    const alert =useContext(alertContext);
    const {ShowAlert}=alert;
    const host = "http://localhost:5000";
    
    //Send OTP
    const Sendotp=async(sendto)=>{
    props.SetPrograss(10);
        //API call
    const fetchEmail = host + "/api/email/sendotp";
    try {
    props.SetPrograss(40);
      const response = await fetch(fetchEmail, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to:sendto }),
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

//Check OTP
  const Checkotp=async(email,otp)=>{
    // ShowAlert(email);
    //API call
    const fetchOtp = host + "/api/email/checkotp";
    try {
      const response = await fetch(fetchOtp, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email,otp}),
      });
      const send = await response.json(); // parses JSON response into native JavaScript objects
      if(send.success){
        return true
      }
      else{
        return false
      }

    } catch (error) {
      ShowAlert('Server Error Please Refresh Page');
      return false
    }

  };


//Check Email
const Checkemail=async(email)=>{
  // ShowAlert(email);
  //API call
  const fetchemail = host + "/api/email/Checkemail";
  try {
    const response = await fetch(fetchemail, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
    });
    const send = await response.json(); // parses JSON response into native JavaScript objects
    if(send.success){
      return true
    }
    else{
    return false
    }

  } catch (error) {
    ShowAlert('Server Error Please Refresh Page');
    return false
  }

};

  //Change Password
  const Changepassword=async(email,password,otp)=>{
    // ShowAlert(email);
    //API call
    const updatepassword = host + "/api/email/Changepassword";
    try {
      const response = await fetch(updatepassword, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password,otp}),
      });
      const send = await response.json(); // parses JSON response into native JavaScript objects
      if(send.success){
        return true
      }
      else{
        return false
      }

    } catch (error) {
      ShowAlert('Server Error Please Refresh Page');
      return false
    }

  };

    return (
        <emailContext.Provider
          value={{Sendotp,Checkotp,Changepassword,Checkemail}}
        >
          {props.children}
        </emailContext.Provider>
      );
}

export default EmailState
