import React, { useContext } from "react";
import NoteContext from "../Context/Note/noteContext";

const Noteitems = (props) => {
  const context = useContext(NoteContext);
  const { deletenote } = context;
  const { notes ,Fillnotes} = props;
  return (
    <>
      <div className="card-group col-md-4 my-3" height="300px">
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
      </div>
    </>
  );
};

export default Noteitems;
