import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../Context/Alert/alertContext";

const Profile = () => {
    const alertcontext=useContext(alertContext);
    const {ShowAlert} =alertcontext;
    const [userinfo,Setuserinfo]=useState({id:"",name:"",email:"",date:""});
    const navigate=useNavigate();
    const getuser= async(e)=>{
         //API call
         const data = "http://localhost:5000/api/auth/getuser";
         const response = await fetch(data, {
           method: "POST", // *GET, POST, PUT, DELETE, etc.
           headers: {
             "Content-Type": "application/json",
             "auth-token":localStorage.getItem('token')
           }
         });
         const user = await response.json(); // parses JSON response into native JavaScript objects
         /* Date format you have */
         let date = new Date(user.date);
        //  let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
         /* Date converted to YYYY-MM-DD format */
         let dateYMD = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        //  console.log(dateMDY)
         Setuserinfo({id:user._id,name:user.name,email:user.email,date:dateYMD})

    }
    const onchange=(e)=>{
        Setuserinfo({...userinfo,[e.target.name]:e.target.value})
      }
    useEffect(() => {
        getuser();
       // eslint-disable-next-line
      },[])

      const updateprofile=async(e)=>{
        e.preventDefault();
            //API call
            if(window.confirm("do you really want to Update Your Profile")){
            const update = "http://localhost:5000/api/auth/Updateuser/" + userinfo.id;
            const response = await fetch(update, {
              method: "PUT", // *GET, POST, PUT, DELETE, etc.
              headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
              },
              body: JSON.stringify({ name:userinfo.name, email:userinfo.email }),
            });
            const user = await response.json(); // parses JSON response into native JavaScript objects
            //console.log(login);
            
            if(user.success)
            {
                navigate("/");
                ShowAlert('Profile Updated Succefully','success')
            }
            else{
                ShowAlert('Some Error Occurs , Please Reload the Page','danger')
            }
        }
   
       }
  return (
    <>
      <form className="container" onSubmit={updateprofile}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            aria-describedby="name"
            value={userinfo.name}  
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            value={userinfo.email}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Joined Date
          </label>
          <input disabled type="date" name="date" className="form-control" value={userinfo.date} id="date" />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </>
  );
};

export default Profile;
