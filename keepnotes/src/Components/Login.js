import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../Context/Alert/alertContext";

const Login = () => {
    const [data,setData]=useState({email:"",password:""})
    const context=useContext(alertContext);
    const {ShowAlert}=context;
    let navigate=useNavigate();
    const loginuser= async(e)=>{
        e.preventDefault();
         //API call
         const Login = "http://localhost:5000/api/auth/Login";
         const response = await fetch(Login, {
           method: "POST", // *GET, POST, PUT, DELETE, etc.
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({ email:data.email,password: data.password }),
         });
         const login = await response.json(); // parses JSON response into native JavaScript objects
         //console.log(login);
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
    const onchange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
      }
  return (
    <div className="container">
      <form className="my-1" onSubmit={loginuser}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onchange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onchange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
