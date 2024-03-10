import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import alertContext from "../Context/Alert/alertContext";
import authContext from "../Context/Authentication/AuthContext";

const Login = (props) => {
    const [data,setData]=useState({email:"",password:""})
    const context=useContext(alertContext);
    const login=useContext(authContext);
    const {Login}=login;
    const {ShowAlert}=context;
    let navigate=useNavigate();
    const loginuser= async(e)=>{
        e.preventDefault();
        if(data.email===""&&data.password==="")
        {
          ShowAlert("Input fields can't be empty",'danger')

        }
        else{
         //Function Call
         const login=await Login(data.email,data.password)
         if(login.success)
         {
            localStorage.setItem('token',login.token);
            navigate("/");
            ShowAlert('Login Succefully','success')
         }
         else{
            //alert("invalid details")
            ShowAlert('Invalid Details','danger')
         }
        }
  
    }
    const onchange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
      }
  return (
    <div className= "container">
            <div className={`loginform ${props.Mode==='dark'?'dupdateform':''}`}>
                <h2>Sign In</h2>
                <form onSubmit={loginuser}>
                    <label className="lb" htmlFor="email">Email address</label>
                    <input className='forminput' type="email" id="email" name="email" onChange={onchange}/>
                    <label className="lb" htmlFor="password">Password</label>
                    <input className='forminput' type="password" id="password" name="password" onChange={onchange}/>
                    <input type="submit" className={`btnlogin nav2item ${props.Mode==='dark'?'btngreen':''}`} value="Login" />
                </form>
                
            <p className="psign">
            <Link to="/Forgetpassword" className={`fpass pasign ${props.Mode==='dark'?'abh2':''}`}>Forget Password</Link>       
            Don't have an Account? <Link to="/Signup" className={`pasign ${props.Mode==='dark'?'abh2':''}`}>Signup</Link>
            </p>
            </div>
        </div>
  );
};

export default Login;
