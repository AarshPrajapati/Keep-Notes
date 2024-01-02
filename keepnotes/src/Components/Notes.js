import React ,{useContext, useEffect, useState} from 'react'
import NoteContext from '../Context/Note/noteContext'
import Noteitems from './Noteitems';
import Updatenote from './Updatenote';
import nonotes from './Sorry No Notes.gif'
import { useNavigate } from 'react-router-dom';

const Notes = () => {
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
  },[])
  //const ref=useRef(); //useref is used for get the clicked card data
  const [unotes,Setunotes]=useState({Utitle:"",Udescription:"",Utag:"",Uid:""}) //state for Update note

  //set the value of model field
  const Fillnotes=(note)=>{
    Setunotes({Utitle:note.title,Udescription:note.description,Utag:note.tag,Uid:note._id})
  }
  //update the value of model field on change
  const onUchange=(e)=>{
    Setunotes({...unotes,[e.target.name]:e.target.value})
    
  }

  const UpdateNote=()=>{
    editnote(unotes.Utitle,unotes.Udescription,unotes.Utag,unotes.Uid);
    //refClose.current.click();
  }
  return (
    <>
    <Updatenote unotes={unotes} onUchange={onUchange} UpdateNote={UpdateNote}/>
    {notes.length===0 &&
    <div className='text-center'>
        <img src={nonotes} width="20%" alt='Loading'/>
        </div>
    }
    <div className='row'>
      {notes.map((notes)=>{
        // return notes.title;
            return <Noteitems key={notes._id} notes={notes} Fillnotes={Fillnotes}/>;
          })}
    </div>
    </>
  )
}

export default Notes

