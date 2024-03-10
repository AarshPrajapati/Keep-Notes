import React ,{useContext, useEffect, useRef, useState} from 'react'
import NoteContext from '../Context/Note/noteContext'
import { useLocation, useNavigate } from 'react-router-dom';

const Addnote = (props) => {
  const location=useLocation();
  const context=useContext(NoteContext);
  const {addnote}=context;
  const refclear=useRef(null);
  const navigate=useNavigate();
  const [notes,Setnotes]=useState({title:"",description:"",tag:"",reminder:""})

  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      navigate('/Login');
    }
   // eslint-disable-next-line
  },[location])

  const onchange=(e)=>{
    Setnotes({...notes,[e.target.name]:e.target.value})
  }
  const createnote=(e)=>{
    e.preventDefault();
    const currentdate=new Date();
    const reminder=new Date(notes.reminder);
    if(notes.tag.length>10){
      alert('Tag Max Length is 10 character')
    }
    if(reminder>currentdate){
      addnote(notes.title,notes.description,notes.tag,notes.reminder);
      navigate('/');
      refclear.current.click();
    }
    else{
      alert('Please select the date grather than current date');
    }

  }
  return (
    <div>
        <div className="container">
            <form className="CreateForm" onSubmit={createnote}>
                <h2>Create Note</h2>
                <label htmlFor="title" name="title" id="title">Title</label>
                <input className='forminput' type="text" name="title"  onChange={onchange} minLength='3' required />
                <label htmlFor="description" name="description" id="description">Description</label>
                <input className='forminput' type="text" name="description"  onChange={onchange} minLength='5' required  />
                <label htmlFor="reminder" name="reminder" id="reminder">Reminder <p>(You will be Notified 10 minute before about this note via e-mail)</p></label>
                <input type="datetime-local" className='forminput rmdate' name="reminder"  onChange={onchange} required  />
                <label htmlFor="tag" name="tag" id="tag">Tag</label>
                <input className='forminput' type="text" name="tag" title='Max Length is 10 character'  onChange={onchange} minLength='3' maxLength='10' required  />
                <input type="reset" className="btnreset" value="Reset" ref={refclear} />
                <input type="submit" className={`btncreatenote nav2item nav2item ${props.Mode==='dark'?'btngreen':''}`} value="Create Note" />
            </form>
        </div>
    </div>

  );
};

export default Addnote;
