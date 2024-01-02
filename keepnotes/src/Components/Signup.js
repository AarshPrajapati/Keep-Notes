import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../Context/Alert/alertContext";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const context=useContext(alertContext);
  const {ShowAlert}=context;
  let navigate = useNavigate();
  const { name, email, password, cpassword } = data;

  const createuser = async (e) => {
    e.preventDefault();
    if (password === cpassword) {
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
        ShowAlert('Sorry! Someone Already use this Email','info')
      } 
      else {
        ShowAlert('invalid details','danger')

      }
    } else {
      ShowAlert('password and confirm password is different','danger')
    }
  };

  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <form className="my-3" onSubmit={createuser}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onchange}
            required
            minLength="3"
          />
        </div>
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
            minLength='5'
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onchange}
            minLength='5'
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
