import alertContext from "../Alert/alertContext";
import AuthContext from "./AuthContext";
import React, { useContext } from 'react'

const AuthState = (props) => {

    const alert =useContext(alertContext);
    const {ShowAlert}=alert;
    const host = process.env.REACT_APP_API_HOST;

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

      //Login USer
      const Login =async(Email,Password)=>{
        //API call
        const Login = host + "/api/auth/Login";
        const response = await fetch(Login, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email:Email,password:Password }),
        });
        const login = await response.json(); // parses JSON response into native JavaScript objects
        
        if(login.success){
          return login
        }
        else{
          return false
        }
      }
    
      //Signup User
      const Signup=async(name,email,password)=>{
        //API call
        const Signup = host + "/api/auth/Createuser";
        const response = await fetch(Signup, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
        const user = await response.json(); // parses JSON response into native JavaScript objects

        return user
      }

      //Get USer Details
      const Getuser=async()=>{
        //API call
        const data = host+"/api/auth/getuser";
        const response = await fetch(data, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          }
        });
        const user=await response.json();
        return user
      }

      //Update User Details
      const Updateuser=async(id,Name)=>{
        //API call
        const update = host+"/api/auth/Updateuser/"+id;
            const response = await fetch(update, {
              method: "PUT", // *GET, POST, PUT, DELETE, etc.
              headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
              },
              body: JSON.stringify({ name:Name }),
            });
            const user=await response.json();
            return user;

      }
  return (
    <AuthContext.Provider
    value={{verifyemail,Login,Signup,Getuser,Updateuser}}
    >
    {props.children}
  </AuthContext.Provider>
  )
}

export default AuthState
