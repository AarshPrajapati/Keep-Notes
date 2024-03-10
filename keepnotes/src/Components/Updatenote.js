import React from "react";


const Updatenote = (props) => {
  const {unotes,onUchange,UpdateNote,unotestyle,close}=props;
  let date=new Date(unotes.Ureminder);
  const year =date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Create the formatted date string
  const rm = `${year}-${month}-${day}T${hours}:${minutes}`;

  return (

    <div>
        <div className="unote" style={unotestyle}>
            <form className={`updateform ${props.Mode==='dark'?'dupdateform':''}`} onSubmit={UpdateNote}>
                <h2>Update Note</h2>
                <label htmlFor="title" name="Utitle" id="Utitle">Title</label>
                <input className='forminput' type="text" name="Utitle" onChange={onUchange} value={unotes.Utitle} />
                <label htmlFor="description" name="Udescription" id="Udescription">Description</label>
                <input className='forminput' type="text" name="Udescription" onChange={onUchange} value={unotes.Udescription} />
                <label htmlFor="reminder" name="Ureminder" id="Ureminder">Reminder</label>
                <input className='rmdate forminput' type="datetime-local" name="Ureminder" value={rm}  onChange={onUchange} required  />
                <label htmlFor="tag" name="Utag" id="Utag">Tag</label>
                <input className='forminput' type="text" name="Utag" onChange={onUchange} value={unotes.Utag} />
                <img className="imgclose" alt="imgclose" src="Icons/close.png" onClick={close}/>
                <div className="upbtn">
                <input type="submit" className={`btncreatenote nav2item ${props.Mode==='dark'?'btngreen':''}`} value="Update Note"/>
                <button type="button" className={`btncancle nav2item ${props.Mode==='dark'?'btngreen':''}`} name="cancle" onClick={close}>Close</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Updatenote;
