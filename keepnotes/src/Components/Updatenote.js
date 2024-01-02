import React from "react";
// import noteContext from "../Context/Note/noteContext";

const Updatenote = (props) => {
  const {unotes,onUchange,UpdateNote}=props;

  return (
    <div
      className="modal fade"
      id="updatenotes"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      //ref={ref} 
    >
      <form onSubmit={UpdateNote}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Update Note
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="Utitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="Utitle"
                name="Utitle"
                aria-describedby="emailHelp"
                onChange={onUchange}
                value={unotes.Utitle}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Udescription" className="form-label">
                Description
              </label>
              <input
                type="text"
                name="Udescription"
                className="form-control"
                id="Udescription"
                onChange={onUchange}
                value={unotes.Udescription}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Utag" className="form-label">
                Tag
              </label>
              <input
                type="Utag"
                name="Utag"
                className="form-control"
                id="Utag"
                onChange={onUchange}
                value={unotes.Utag}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              
            >
              Close
            </button>
            <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      
      </div>
      </form>
    </div>
  );
};

export default Updatenote;
