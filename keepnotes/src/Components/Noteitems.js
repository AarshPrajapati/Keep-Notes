import React, { useContext } from "react";
import NoteContext from "../Context/Note/noteContext";

const Noteitems = (props) => {
  const context = useContext(NoteContext);
  const { deletenote } = context;
  const { notes ,Fillnotes} = props;
  let date= new Date(notes.reminder);
   let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
   let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
   let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
   let dateYMD = `${day}/${month}/${year}`;
 
  let rm = `${dateYMD} , ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;
  
  return (
    <>
    <div className={`col ${props.Mode==='dark'?'Mcol':''}`}>
                <div className="title">{notes.title}</div>
                <div className={`tag ${props.Mode==='dark'?'ynmode':''}`}>{notes.tag}</div>
                <div className="description">{notes.description}</div>
                <div className="funct">
                    <div className="funedit" onClick={()=>{Fillnotes(notes)}}><img  alt="editicon" src="Icons/Edit.png" width="20px" /></div>
                    <div className="fundelete" onClick={() => { deletenote(notes._id); }}><img alt="deleteicon" src="Icons/trash.png" width="20px" /></div>
                    <div className={`drmdate ${props.Mode==='dark'?'ynmode':''}`}>{rm}</div>
                </div>
      </div>
      
    </>
  );
};

export default Noteitems;
