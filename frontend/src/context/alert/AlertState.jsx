import React, { useState } from "react";

import AlertContext from "./alertContext";

const AlertState = (props) => {
    const [user,setUser]=useState(null);

    const setCurrUser=(currUser)=>{
      setUser(currUser);
    }

    const [msg, setMsg] = useState("");

    const setAlert=(message)=>{
        setMsg(message);
    
        setTimeout(() => {
            setMsg("");
          }, 1500);
      }
  return (
    <AlertContext.Provider value={{user,setCurrUser,msg,setAlert}}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
