import React, { useContext } from "react";
import NoteContext from "../Context/Note/noteContext";

const Noteitems = (props) => {
  const context = useContext(NoteContext);
  const { deletenote } = context;
  const { notes ,Fillnotes} = props;
  let date= new Date(notes.reminder);
  let rm = `${date.toLocaleDateString()} , ${date.getHours()}:${date.getMinutes()}`;
  
  return (
    <>
    <div className="col">
                <div className="title">{notes.title}</div>
                <div className="tag">{notes.tag}</div>
                <div className="description">{notes.description}</div>
                <div className="funct">
                    <div className="funedit" onClick={()=>{Fillnotes(notes)}}><img  alt="editicon" src="Icons/Edit.png" width="20px" /></div>
                    <div className="fundelete" onClick={() => { deletenote(notes._id); }}><img alt="deleteicon" src="Icons/trash.png" width="20px" /></div>
                    <div class="drmdate">{rm}</div>
                </div>
      </div>
      {/* <div className="card-group col-md-4 my-3" height="300px">
        <div className="card">
       
          <div className=" card-header">{notes.title}<span className="d-inline-flex float-end badge text-bg-primary">{notes.tag}</span></div>
          
          <div className="card-body">
            <h6 className="card-text">{notes.description}</h6>
            <i
              className="fa-sharp fa-solid fa-trash"
              onClick={() => {
                deletenote(notes._id);
              }}
            ></i>
            <i
              className="fa-solid fa-file-pen m-3"
              data-bs-toggle="modal"
              data-bs-target="#updatenotes"
              onClick={()=>{Fillnotes(notes)}} //used the arrow function beacuse we transferd a parameters
            ></i>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Noteitems;
