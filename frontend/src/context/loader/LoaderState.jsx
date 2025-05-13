import React, { useState } from "react";

import LoaderContext from "./loaderContext";

const LoaderState = (props) => {
    const [progress,setProgress] = useState(0);

    const setLoader=(progress)=>{
      setProgress(progress);
    }
  return (
    <LoaderContext.Provider value={{progress,setLoader}}>
      {props.children}
    </LoaderContext.Provider>
  );
};

export default LoaderState