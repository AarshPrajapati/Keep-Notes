import noteContext from "./noteContext";
import { useContext, useState } from "react";
import alertContext from "../Alert/alertContext";

const NoteState = (props) => {
  const alert =useContext(alertContext);
  const {ShowAlert}=alert;
  // const state=[{"name":"AArsh","id":"as"},{"name":"Meet","id":"as"}]
  // const [use,Setuse]=useState(state);
  const host = "http://localhost:5000";
  // const noteintial=[]
  const [notes, Setnotes] = useState([]);

  //Get Notes //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const featchnote = async () => {
    //API call
    const fetchNote = host + "/api/notes/fetchnotes";
    try {
      const response = await fetch(fetchNote, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
      });
      const note = await response.json(); // parses JSON response into native JavaScript objects
      Setnotes(note);

    } catch (error) {
      ShowAlert(error,'danger');
    }

  };

  //Add note
  const addnote = async (title, description, tag,reminder) => {
    //API call
    const AddNote = host + "/api/notes/addnote";
    try {
      const response = await fetch(AddNote, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description,reminder, tag }),
      });
      const add= await response.json();
      if(add.success){
      ShowAlert('Note Created Succefully','success');
      }
      else{
      ShowAlert('Some Error Accured','danger');

      }
      
    } catch (error) {
      ShowAlert(error,'danger');
    }
    
  };
  //Delete Note
  const deletenote = async(id) => {
    //API call
    if(window.confirm("do you really want to delete this note")){
    const DeleteNote = host + "/api/notes/deletenote/" +id; 
    //const response = await fetch(`${host}api/notes/deletenote/${id}`, //you can also write url like this
    try {
      const response = await fetch(DeleteNote, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        }
      });
      const del= await response.json();
      if(del.success){
      ShowAlert('Note Deleted Succefully','success');
      }
      else{
      ShowAlert('Some Error Accured','danger');

      }

    } catch (error) {
      ShowAlert(error,'danger');
    }
    
  }
    // console.log("Delete note with the id " + id);
    // const newnote = notes.filter((noteintial) => {
    //   return noteintial._id !== id;
    // });
    // Setnotes(newnote);
  };
  //Edit Note
  const editnote =async (title,description,reminder,tag,id) => {
    //console.log(id,title,tag,description);
    //API call
    
    const UpdateNote = host + "/api/notes/updatenote/" +id;
    try {
      const response = await fetch(UpdateNote, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, reminder, tag }),
      });
      const up= await response.json();
      if(up.success){
      ShowAlert('Note Updated Succefully','success');
      }
      else{
      ShowAlert('Some Error Accured','danger');

      }
    } catch (error) {
      ShowAlert(error,'danger');
    }
    
  };
  return (
    <noteContext.Provider
      value={{ notes, Setnotes, addnote, deletenote, editnote, featchnote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
