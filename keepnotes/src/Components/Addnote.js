import React ,{useContext, useEffect, useRef, useState} from 'react'
import NoteContext from '../Context/Note/noteContext'
import { useNavigate } from 'react-router-dom';

const Addnote = () => {

  const context=useContext(NoteContext);
  const {addnote}=context;
  const refclear=useRef(null);
  const navigate=useNavigate();
  const [notes,Setnotes]=useState({title:"",description:"",tag:""})

  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      navigate('/Login');
    }
   // eslint-disable-next-line
  },[])

  const onchange=(e)=>{
    Setnotes({...notes,[e.target.name]:e.target.value})
  }
  const createnote=(e)=>{
    e.preventDefault();
    addnote(notes.title,notes.description,notes.tag);
    navigate('/');
    refclear.current.click();
  }
  return (
    <div className="container my-3">
      <h3>Create Note</h3>
      <form className="my-4" onSubmit={createnote}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            placeholder='Enter Title'
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onchange}
            minLength='3'
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            placeholder='Enter Description'
            name="description"
            className="form-control"
            id="description"
            onChange={onchange}
            required
            minLength='5'
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="tag"
            placeholder='Enter Tag'
            name="tag"
            className="form-control"
            id="tag"
            onChange={onchange}
            required
            minLength='3'
          />
        </div>
        <input className='d-none' type="reset" value="Reset" ref={refclear}/>
        <button type="submit"  className="btn btn-primary" >
        {/* <button type="submit" disabled={notes.title<3||notes.description<5||notes.tag<3} className="btn btn-primary" > */}
          Create Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
