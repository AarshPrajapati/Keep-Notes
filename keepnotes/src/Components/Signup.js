import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import alertContext from "../Context/Alert/alertContext";
import emailContext from "../Context/Email/emailContext";
import authContext from "../Context/Authentication/AuthContext";

const Signup = () => {
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
  const {verifyemail}=auth;


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
      //API call
      const Login = "http://localhost:5000/api/auth/Createuser";
      const response = await fetch(Login, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const user = await response.json(); // parses JSON response into native JavaScript objects
      //console.log(login);
      if (user.success) {
        localStorage.setItem("token", user.token);
        //console.log(json.authtoken);
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
        console.log(status);
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
            <div className="Signupform">
                <h2>Sign up</h2>
                <form onSubmit={createuser}>
                    <label className="lb" htmlFor="Name">Name</label>
                    <input type="text" id="name" name="name" onChange={onchange} minLength="3"/>
                    <label className="lb" htmlFor="email">Email address</label>
                    <input type="email" id="email" name="email" onChange={onchange} disabled={isDisabled}/>
                    {isDisabled?"": <div onClick={SendEmail} className="emailverify">verify</div> }
                    {inputotp && 
                    <div><label className="lb sotp" htmlFor="otp">OTP</label>
                    <input type="number" id="otp" name="otp" onChange={checkotp} disabled={otpdisable}/>
                    </div>
                    }
                    
                    <label className="lb" htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={onchange} minLength='5'/>
                    
                    {/* <label className="lb" htmlFor="cpassword">Confirm Password</label> 
                    <input type="password" id="cpassword" name="cpassword" onChange={onchange} minLength='5'/> */}
                    <input type="submit" className="btnlogin nav2item" value="Sign Up" />
                </form>
            <p className="psign">Alredy have an Account? <Link to="/Login" className="pasign">Sign in</Link></p>
            </div>
        </div>
    // <div className="loginmain">
    // <div className="signupcontainer">
    // <h3 className="ltext">Sign up</h3>
    //   <form className="my-3" onSubmit={createuser}>
    //     <div className="mb-3">
    //       <label htmlhtmlFor="name" className="form-label">
    //         Name
    //       </label>
    //       <input
    //         type="text"
    //         className="form-control authfield"
    //         id="name"
    //         name="name"
    //         aria-describedby="emailHelp"
    //         onChange={onchange}
    //         minLength="3"
    //       />
    //     </div>
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
    //       />
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
    //     <div className="mb-3">
    //       <label htmlhtmlFor="exampleInputPassword1" className="form-label">
    //         Confirm Password
    //       </label>
    //       <input
    //         type="password"
    //         className="form-control authfield"
    //         id="cpassword"
    //         name="cpassword"
    //         onChange={onchange}
    //         minLength='5'
    //       />
    //     </div>
    //     <button type="submit" className="btnlogin">
    //       Sign up
    //     </button>
    //     <br></br><br></br>
    //     <p className="form-label">
    //         Alerdy have an Account?    
    //         <Link to="/Login" className="mx-2">Login</Link>
    //       </p>
    //   </form>
    // </div>
    // </div>
  );
};

export default Signup;
