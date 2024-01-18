import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import alertContext from "../Context/Alert/alertContext";

const Login = () => {
    const [data,setData]=useState({email:"",password:""})
    const context=useContext(alertContext);
    const {ShowAlert}=context;
    let navigate=useNavigate();
    const loginuser= async(e)=>{
        e.preventDefault();
        if(data.email===""&&data.password==="")
        {
          ShowAlert("Input fields can't be empty",'danger')

        }
        else{
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
  
    }
    const onchange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
      }
  return (
    <div className="container">
            <div className="loginform">
                <h2>Sign In</h2>
                <form onSubmit={loginuser}>
                    <label className="lb" htmlFor="email">Email address</label>
                    <input type="email" id="email" name="email" onChange={onchange}/>
                    <label className="lb" htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={onchange}/>
                    <input type="submit" className="btnlogin nav2item" value="Login" />
                </form>
                
            <p className="psign">Don't have an Account? <Link to="/Signup" className="pasign">Signup</Link></p>
            </div>
        </div>
    // <div className="loginmain">
    // <div className="logincontainer">
    //   <h3 className="ltext">Sign in</h3>
    //   <form className="my-1" onSubmit={loginuser}>
    //     <div className="mb-3">
    //       <label htmlhtmlFor="exampleInputEmail1" className="form-label">
    //         Email address
    //       </label>
    //       <input
    //         type="email"
    //         className="form-control authfield"
    //         id="email"
    //         name="email"
    //         aria-describedby="emailHelp"
    //         onChange={onchange}
    //       /><i data-lucide="mail"></i>
   
    //     </div>
    //     <div className="mb-3">
    //       <label htmlhtmlFor="exampleInputPassword1" className="form-label">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         className="form-control authfield"
    //         id="password"
    //         name="password"
    //         onChange={onchange}
    //         minLength='5'
    //       />
    //     </div>
    //     <button type="submit" className="btnlogin">
    //       Login
    //     </button>
    //     <div className="mb-3 my-3">
    //     <p className="form-label">
    //         Don't have an Account?    
    //         <Link to="/Signup" className="mx-2">Signup</Link>
    //       </p>
    //     </div>
    //   </form>
    // </div>
    // </div>
  );
};

export default Login;
