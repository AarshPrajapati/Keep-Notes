import React from "react"; //rafc
import Notes from "./Notes";


const Home = () => {
  return (
    <>
      <div className="ynoteparent">
      <h3 className="ynote">Your Notes</h3>
        <Notes/>
      </div>
      </>
  );
};

export default Home;
