import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import alertContext from "../Context/Alert/alertContext";
import authContext from "../Context/Authentication/AuthContext";

const Profile = (props) => {
  const location=new useLocation();
    const alertcontext=useContext(alertContext);
    const AuthContext=useContext(authContext);
    const {Getuser,Updateuser}=AuthContext;
    const {ShowAlert} =alertcontext;
    const [userinfo,Setuserinfo]=useState({id:"",name:"",email:"",date:""});
    const navigate=useNavigate();

    const getuser= async(e)=>{

         const user = await Getuser(); 
         /* Date format you have */
         let date = new Date(user.date);
        //  let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
         /* Date converted to YYYY-MM-DD format */
         let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
         let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
         let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
         let dateYMD = `${year}-${month}-${day}`;
         Setuserinfo({id:user._id,name:user.name,email:user.email,date:dateYMD})

    }
    const onchange=(e)=>{
        Setuserinfo({...userinfo,[e.target.name]:e.target.value})
      }
    useEffect(() => {
      if(localStorage.getItem('token')){
        const featch=async()=>{ await getuser();}
        featch();
      }
      else{
        navigate('/Login');
      }
       // eslint-disable-next-line
      },[location])

      const updateprofile=async(e)=>{
        e.preventDefault();
            //API call
            if(window.confirm("do you really want to Update Your Profile")){
              const user = await Updateuser(userinfo.id,userinfo.name);            
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
    <div className="profilecontainer">
        <h2>Profile</h2>
        <form className="profileform" onSubmit={updateprofile}>
                <label className="lb" htmlFor="Name" >Name</label>
                <input className='forminput' type="text" name="name" id="name" value={userinfo.name}  onChange={onchange}/>
                <label className="lb" htmlFor="email">Email address</label>
                <input className='forminput' type="email" name="email"  id="email" value={userinfo.email} disabled/>
                <label className="lb" htmlFor="date">Joining Date</label>
                <input className='forminput' type="date" name="date" value={userinfo.date} id="date" disabled/>
                <input type="submit" className={`btnlogin nav2item ${props.Mode==='dark'?'btngreen':''}`} value="Update"/>
        </form>
    </div>
    </>
  );
};

export default Profile;
