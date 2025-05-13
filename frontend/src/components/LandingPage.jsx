import React, { useContext } from 'react'
import { useNavigate } from "react-router";
import loaderContext from '../context/loader/loaderContext';

function LandingPage() {
  const lContext = useContext(loaderContext);
  const {setLoader} = lContext;
  const navigate = useNavigate();

  const handleBrand=()=>{
    setLoader(30);

    setTimeout(() => {
      setLoader(70);
  
      navigate("/dashboardBrand");
  
      setLoader(100);
    }, 300); // Delay for visual effect
  }

  const handleInfluencer=()=>{
    setLoader(30);

    setTimeout(() => {
      setLoader(70);
  
      navigate("/dashboardInfluencer");
  
      setLoader(100);
    }, 300); // Delay for visual effect
} 
    return (
      <div className="flex flex-col h-screen gap-5 justify-center items-center overflow-hidden">
        <div className="w-screen text-lg">
          <h1 className="cursor-default mb-7 text-5xl sm:text-8xl annie-use-your-telescope-regular text-center text-white">Welcome to Collably! </h1>
          <p className="cursor-default mb-7 text-2xl sm:text-4xl archivo-narrow-font text-center text-white">One stop for influencers to find their brand deals!</p>
          <p className="cursor-default text-4xl sm:text-5xl archivo-narrow-font text-center text-white">What are you?</p>
        </div>

        <div className="flex flex-wrap w-screen justify-center items-center gap-12 mt-4">
          <button className="text-3xl annie-use-your-telescope-regular rounded-3xl bg-gradient-to-r from-[#0E0014] to-[#53007A]  cursor-pointer drop-shadow-[0px_0px_5px_white] hover:drop-shadow-[0px_0px_8px_white] transition-all duration-300 text-white px-4 py-2 w-40 h-auto" onClick={handleInfluencer}>INFLUENCER</button>
          <button className="text-3xl annie-use-your-telescope-regular rounded-3xl bg-gradient-to-r from-[#0E0014] to-[#53007A] cursor-pointer drop-shadow-[0px_0px_5px_white] hover:drop-shadow-[0px_0px_8px_white] transition-all duration-300 text-white px-4 py-2 w-40 h-auto" onClick={handleBrand}>BRAND</button>
        </div>
      </div>
    );
  }
  

export default LandingPage
