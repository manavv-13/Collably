import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import influencerContext from "../context/influencers/influencerContext";
import { motion } from "motion/react";
import loaderContext from "../context/loader/loaderContext";
import Footer from "./Footer";
import Navbar from "./Navbar";
import alertContext from "../context/alert/alertContext";

function BrandDetails() {
  const { id } = useParams(); // Extracts the ID from the URL
  const iContext = useContext(influencerContext);
  const lContext = useContext(loaderContext);
  const aContext = useContext(alertContext);

  const { msg, setAlert } = aContext;
  const { setLoader } = lContext;
  const { details, getDetails, sendMessage, influencer, userProfile } =
    iContext;

  const [message, setMessage] = useState("");

  const infToken = localStorage.getItem("infToken");
  const isDisabled = !infToken;

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
    getDetails(`${id}`);
    if (infToken) userProfile();
  }, []);

  const handleSend = async (e) => {
    setLoader(30);
    e.preventDefault();
    const obj = await sendMessage(
      details.email,
      details.brandName,
      message,
      influencer.email,
      influencer.phoneNumber
    );
    setLoader(50);
    setMessage("");
    if (obj.success) setAlert(obj.msg);
    else setAlert(obj.msg);
    setLoader(100);
  };

  return (
    <>
      {msg && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-purple-500 text-white px-5 py-3 rounded-xl shadow-md border border-white"
        >
          <i className="fas fa-info-circle text-white text-lg"></i>
          <p className="text-sm md:text-base font-medium">{msg}</p>
        </motion.div>
      )}
      <div className="container mx-auto grid grid-cols-5 grid-rows-9 gap-4 min-h-screen">
        <div className="mx-2 col-span-5 row-span-1 col-start-1 row-start-1 sticky top-0 z-1">
          <Navbar />
        </div>

        {/*Pitch Deck*/}
        <div className="mx-2 p-2 rounded-xl text-white text-2xl flex justify-center items-center col-span-5 row-span-4 col-start-1 row-start-2">
          <div className="gap-1">
            <h1 className="text-white text-3xl">{details.brandName}</h1>
            <p className="text-white text-md my-3">{details.speciality}</p>
            <p className="text-white text-lg">{details.description}</p>
          </div>
        </div>

        {/*Description*/}
        <div className="mx-2 text-white rounded-xl flex col-span-5 lg:col-span-3 row-span-4 col-start-1 row-start-6">
          <div className="gap-1">
            <h1 className="text-white text-3xl">What they're looking for:</h1>
            <p className="text-white text-xl my-3">{details.lookingFor}</p>
            <Link
              to={details.website}
              target="_blank"
              className="relative inline-block text-white text-xl font-bold group"
            >
              Check us out here! <i className="fa-solid fa-link ml-2"></i>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        {/*Contact*/}
        <div className="mx-2 bg-white rounded-xl flex flex-col justify-between items-center text-2xl font-bold col-span-5 row-span-4 lg:col-span-2 lg:row-span-4 lg:col-start-4 lg:row-start-6 bg-red-500">
          <div className="mt-4 flex justify-center items-center w-full">
            <p className="text-md text-center">Want to Contact Personally?</p>
          </div>

          <form
            onSubmit={handleSend}
            className={`w-full flex flex-col justify-center items-center ${
              isDisabled ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <label
              htmlFor="message"
              className="mb-1 archivo-narrow-font text-lg"
            >
              Type Your Message!
            </label>
            <textarea
              className="w-[90%] h-[200px] p-2 bg-violet-600 text-white rounded-xl mb-4"
              placeholder="Type Here"
              onChange={onChange}
              name="message"
              id="message"
              value={message}
            ></textarea>
            <button
              className={`text-2xl annie-use-your-telescope-regular rounded-3xl bg-gradient-to-r from-[#0E0014] to-[#53007A] drop-shadow-[0px_0px_5px_white] hover:drop-shadow-[0px_0px_8px_white] transition-all duration-300 text-white px-4 py-2 w-[20%] h-auto mb-4 ${
                isDisabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BrandDetails;
