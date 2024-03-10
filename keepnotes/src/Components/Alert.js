import React, { useContext } from "react";
import alertContext from "../Context/Alert/alertContext";

const Alert = (props) => {
  const context=useContext(alertContext);
    const {alert}=context;

  return (
    <div>
      {alert && (
        <div className="palert">
          <div className={`alert alert-${alert.type} ${props.Mode==='dark'?'btngreen':''}`} role="alert">
            {alert.msg}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;
