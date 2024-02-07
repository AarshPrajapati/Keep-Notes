import React ,{useContext, useEffect, useState} from 'react'
import NoteContext from '../Context/Note/noteContext'
import Noteitems from './Noteitems';
import Updatenote from './Updatenote';
import nonotes from './Sorry No Notes.gif'
import { useLocation, useNavigate } from 'react-router-dom';

const Notes = () => {
  const location=new useLocation();
    const context=useContext(NoteContext);
  const {notes,featchnote,editnote}=context;
  const navigate=useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      // console.log(localStorage.getItem('token'))
       featchnote();
    }
    else{
        navigate('/Login');
    }
   // eslint-disable-next-line
  },[editnote,location]) //Usestate will again run when editnote function is called
  //const ref=useRef(); //useref is used for get the clicked card data
  const [unotes,Setunotes]=useState({Utitle:"",Udescription:"",Ureminder:"",Utag:"",Uid:""}) //state for Update note
  const [unotestyle,Setunotestyle]=useState({opacity:0,display:"none"});
  const [rowstyle,Setrowstyle]=useState(null);
  //set the value of model field
  const Fillnotes=(note)=>{
    Setunotestyle({opacity:"1",display:"flex"});
    // Setrowstyle({opacity:0.5,"pointer-events": 'none'});
    Setrowstyle({opacity:0.5,pointerEvents: 'none'});
    Setunotes({Utitle:note.title,Udescription:note.description,Ureminder:note.reminder,Utag:note.tag,Uid:note._id})
  }
  //update the value of model field on change
  const onUchange=(e)=>{
    Setunotes({...unotes,[e.target.name]:e.target.value})
    
  }
  //Close note popup
  const close=()=>{
    Setunotestyle({opacity:"0",display:"none"});
    Setrowstyle({opacity:1});
    Setunotes({Utitle:"",Udescription:"",Ureminder:"",Utag:"",Uid:""});
  }
  const UpdateNote=(e)=>{
    e.preventDefault();
  
    const currentdate=new Date();
    const reminder=new Date(unotes.Ureminder);
    if(reminder>currentdate)
    {
      Setunotestyle(null);
      Setrowstyle(null);
    editnote(unotes.Utitle,unotes.Udescription,unotes.Ureminder,unotes.Utag,unotes.Uid);
    //refClose.current.click();
    }
    else
    {
      alert('Please select the date grather than current date');
    }
  }
  return (
    <>
    <Updatenote  close={close} unotestyle={unotestyle} unotes={unotes} onUchange={onUchange} UpdateNote={UpdateNote}/>
    {notes.length===0 &&
    <div className='nonotes'>
        <img src={nonotes} width="20%" alt='Loading'/>
        </div>
    }
    <div className='row' style={rowstyle}>
      
      {notes.map((notes)=>{
        // return notes.title;
            return <Noteitems key={notes._id} notes={notes} Fillnotes={Fillnotes}/>;
          })}
    </div>
    </>
  )
}

export default Notes

