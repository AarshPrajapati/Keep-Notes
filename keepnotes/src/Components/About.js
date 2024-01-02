import React, { useContext } from 'react'//rafc
import noteContext from '../Context/Note/noteContext'

const About = () => {
  const context=useContext(noteContext);
  const {notes}=context;
 // const a=useContext(noteContext)
  return (
    <div>
      Name is and Grade is
     { notes.map((notes)=>{
            return notes.title;
          })}
    </div>
  )
}

export default About
