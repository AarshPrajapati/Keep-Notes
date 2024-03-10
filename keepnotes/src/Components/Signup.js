import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import alertContext from "../Context/Alert/alertContext";
import emailContext from "../Context/Email/emailContext";
import authContext from "../Context/Authentication/AuthContext";

const Signup = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });
  const [inputotp,Setinputotp]=useState(false);
  const [isDisabled, setisDisabled] = useState(false);
  const [otpdisable,Setotpdisable]=useState(false);
  const alert=useContext(alertContext);
  const {ShowAlert}=alert;
  const otpcontext=useContext(emailContext);
  const {Checkotp,Checkemail}=otpcontext;
  const auth=useContext(authContext);
  const {Signup,verifyemail}=auth;


  let navigate = useNavigate();
  const { name, email, password, otp } = data;

  const createuser = async (e) => {
    e.preventDefault();
    const reqfield=Object.values(data).some(value => value === ''); //it return true if any field is empty else false

    if(otp==="")
    {
      ShowAlert('Please Verify your email first');
    }
    else if(reqfield ===true)
    {
      ShowAlert('Every Input field is Required','danger');
    }
    else{
      if (await Checkotp(email,otp)) {

      const user=await Signup(name,email,password);
      if (user.success) {
         localStorage.setItem("token", user.token);
         navigate("/");
         ShowAlert('Sign up Succefully','success')
      }else if(user.error==="Email already exists"){
        ShowAlert('Sorry! Someone Already use this Email')
      } 
      else {
        ShowAlert('invalid details')

      }
    } else {
      ShowAlert('Verify Your Email')
    }
  }
  };

  const SendEmail=async(e)=>{
    e.preventDefault();
    if(email){
      setisDisabled(true);
      const ch=await Checkemail(email);
      if(ch){
        ShowAlert('Please Wait for OTP')
        const status=await verifyemail(email);
        if(status){
          Setinputotp(true);
          ShowAlert('Email Send Succefully')
        }
        else{
          Setinputotp(false);
          setisDisabled(false);
          ShowAlert("Some Error Occure");
        }
      }
      else{
         setisDisabled(false);
         Setinputotp(false);
         ShowAlert('Someone already used this email');
      }
  }
  else{
    Setinputotp(false);
    ShowAlert('Please Enter Email then verify');
  }
  }

  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const checkotp=async (e)=>{
    const status= await Checkotp(email,e.target.value);
    if(status){
      Setotpdisable(true);
      ShowAlert('OTP Correct , You can Login now');
    }
    setData({ ...data,[e.target.name]:e.target.value});
  }
  return (
    <div className="container">
            <div className={`Signupform ${props.Mode==='dark'?'dupdateform':''}`}>
                <h2>Sign up</h2>
                <form onSubmit={createuser}>
                    <label className="lb" htmlFor="Name">Name</label>
                    <input className='forminput' type="text" id="name" name="name" onChange={onchange} minLength="3"/>
                    <label className="lb" htmlFor="email">Email address</label>
                    <input className='forminput' type="email" id="email" name="email" onChange={onchange} disabled={isDisabled}/>
                    {isDisabled?"": <div onClick={SendEmail} className={`emailverify ${props.Mode==='dark'?'abh2':''}`}>verify</div> }
                    {inputotp && 
                    <div><label className="lb sotp" htmlFor="otp">OTP</label>
                    <input className='forminput' type="number" id="otp" name="otp" onChange={checkotp} disabled={otpdisable}/>
                    </div>
                    }
                    
                    <label className="lb" htmlFor="password">Password</label>
                    <input className='forminput' type="password" id="password" name="password" onChange={onchange} minLength='5'/>
                    
                    <input type="submit" className={`btnlogin nav2item ${props.Mode==='dark'?'btngreen':''}`} value="Sign Up" />
                </form>
            <p className="psign">Alredy have an Account? <Link to="/Login" className={`pasign ${props.Mode==='dark'?'abh2':''}`}>Sign in</Link></p>
            </div>
        </div>
  );
};

export default Signup;
