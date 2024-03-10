import React from "react"; //rafc
import Notes from "./Notes";


const Home = (props) => {
  
  return (
    <>
      <div className="ynoteparent">
      <h3 className="ynote">Your Notes</h3>
        <Notes Mode={props.Mode}/>
      </div>
      </>
  );
};

export default Home;
