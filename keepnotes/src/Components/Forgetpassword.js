import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import emailContext from '../Context/Email/emailContext'

const Forgetpassword = (props) => {
  const navigate=useNavigate();
   
  const context=useContext(emailContext);
  const {Sendotp}=context;

  const [sendto,Setsendto]=useState(null);
  const [isDisabled, setisDisabled] = useState(false);
  const onchange=(e)=>{
    Setsendto({...sendto,[e.target.name]:e.target.value})
  }

  const SendEmail=async(e)=>{
    e.preventDefault();
    setisDisabled(true);
    const status=await Sendotp(sendto.email);
    if(status){
      setisDisabled(false);
    navigate('/Changepassword',{state:{
      email:sendto.email,
      access:'true'
    }});
    }
    else{
      setisDisabled(false);
      alert("Some Error Occure");
    }
  }

  return (
    <>
      <div className="container">
            <div className={`loginform fpassform ${props.Mode==='dark'?'dupdateform':''}`}>
                <h2>Forget Password</h2>
                <h5>Enter Email Address to verify your Account</h5>
                <form onSubmit={SendEmail}>
                    <label className="lb" for="email" >Email Address</label>
                    <input className='forminput' type="email" name="email" onChange={onchange} disabled={isDisabled}/>
                    <input type="submit" className={`btnlogin nav2item ${props.Mode==='dark'?'btngreen':''}`} value="Send OTP" disabled={isDisabled}/>
                </form>       
            <p className="psign">Remember Password? <Link className={`pasign ${props.Mode==='dark'?'abh2':''}`} to="/Login">Login</Link></p>
            </div>
        </div>
    </>
  )
}

export default Forgetpassword
