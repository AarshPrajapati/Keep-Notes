import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import emailContext from '../Context/Email/emailContext';
import alertContext from '../Context/Alert/alertContext';

const Changepassword = (props) => {

  const location=useLocation();
  const navigate=useNavigate();
  useEffect(() => {
    if(!location.state.access)
    {
      navigate('/Forgetpassword');
    }
   // eslint-disable-next-line
  },[])

  const context=useContext(emailContext);
  const alert=useContext(alertContext);
  const {ShowAlert}=alert;
  const {Checkotp,Changepassword}=context;
  const [data,Setdata]=useState({email:location.state.email,password:"",otp:""});
  
  const [otp,Setotp]=useState(false);
  const [isDisabled, setisDisabled] = useState(false);


  const onchange=async (e)=>{
    Setdata({...data,[e.target.name]:e.target.value})
    const status= await Checkotp(location.state.email,e.target.value);
    if(status){
      setisDisabled(true);
      Setotp(true);
      ShowAlert('OTP Correct , Enter New Password');
    }
  }

  const updatepass =async(e)=>{
    e.preventDefault();
    if(otp && await Checkotp(location.state.email,data.otp)){
      const status=await Changepassword(data.email,data.password,data.otp)
      if(status){
        navigate('/Login');
        ShowAlert('Password Updated Succefully');
      }
    }
    else{
      ShowAlert('Incorrect OTP');
    }
  }

  return (
    <>
      <div className="container">
            <div className={`loginform ${props.Mode==='dark'?'dupdateform':''}`}>
                <h2>New Password</h2>
                <form onSubmit={updatepass}>
                    <label className="lb" htmlFor="otp">OTP</label>
                    <input className="forminput input" type="number" name="otp" onChange={onchange} disabled={isDisabled} required/>
                    <label className="lb" htmlFor="password">New Password</label>
                    <input className='forminput' type="password" name="password" onChange={onchange} required/>
                    <input type="submit" className={`btnlogin nav2item ${props.Mode==='dark'?'btngreen':''}`}  value="Update Password"/>
                </form>
                
            <p className="psign">Remember Password? <a className={`pasign ${props.Mode==='dark'?'abh2':''}`} href="/Login.html">Login</a></p>
            </div>
        </div>
    </>
  )
}

export default Changepassword
