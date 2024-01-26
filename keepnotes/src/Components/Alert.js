import React, { useContext } from "react";
import alertContext from "../Context/Alert/alertContext";

const Alert = () => {
  const context=useContext(alertContext);
    const {alert}=context;

  return (
    <div>
      {alert && (
        <div className="palert">
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.msg}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;
