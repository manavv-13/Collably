import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import brandContext from "../context/brands/brandContext";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import loaderContext from "../context/loader/loaderContext";
import alertContext from "../context/alert/alertContext";
import Footer from "./Footer";
import Navbar from "./Navbar";

function InfluencerDetails() {
  const { id } = useParams(); // Extracts the ID from the URL

  const aContext = useContext(alertContext);
  const lContext = useContext(loaderContext);
  const bContext = useContext(brandContext);

  const { msg, setAlert } = aContext;
  const { setLoader } = lContext;
  const { details, getDetails, userProfile, sendMessage, brand } = bContext;

  const comToken = localStorage.getItem("comToken");
  const isDisabled = !comToken;

  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
    getDetails(`${id}`);
    if (comToken) userProfile();
  }, []);

  const formatPrice = (price) => {
    return `₹${new Intl.NumberFormat("en-IN").format(price)}`;
  };

  const handleSend = async (e) => {
    setLoader(30);
    e.preventDefault();
    const obj = await sendMessage(
      details.email,
      details.name,
      message,
      brand.email,
      brand.phoneNumber
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
        <div className=" mx-2 col-span-5 row-span-1 col-start-1 row-start-1 sticky top-0 z-1">
          <Navbar />
        </div>

        <div
          className="mx-2 p-2 rounded-xl text-white flex justify-center items-center font-bold  col-span-5 lg:col-span-2 row-span-4 row-start-2"
          style={{
            backgroundImage: `url(${details.profilePhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="mx-2 text-white rounded-xl flex items-center text-2xl col-span-5 col-start-1 row-start-6 lg:col-span-3 row-span-4 lg:col-start-3 lg:row-start-2">
          <div className="flex flex-col gap-1 justify-center">
            <h1 className="text-white text-3xl">{details.name}</h1>
            <p className="text-white text-md my-3">{details.speciality}</p>
            <p className="text-white text-lg">{details.description}</p>
          </div>
        </div>

        <div className="mx-2 text-white rounded-xl flex justify-center items-center text-2xl  row-start-11 col-span-5 lg:col-span-3 row-span-4 col-start-1 lg:row-start-6">
          <div className="flex flex-col gap-1 justify-center">
            <Link
              to={details.igHandleLink}
              target="_blank"
              className="text-white text-md hover:underline"
            >
              IG: {details.igHandle} <i className="fa-solid fa-link ml-2"></i>
            </Link>
            {details.ytHandle === "NA" ||
            details.ytHandle === "na" ||
            details.ytHandle === "Na" ? (
              ""
            ) : (
              <Link
                to={details.ytHandleLink}
                target="_blank"
                className="text-white text-md hover:underline"
              >
                Youtube: {details.ytHandle}{" "}
                <i className="fa-solid fa-link ml-2"></i>
              </Link>
            )}
            <p className="text-white text-lg">
              Price Per Reel: {formatPrice(details.pricePerReel)}
            </p>
            <p className="text-white text-lg">
              Price Per Post: {formatPrice(details.pricePerPost)}
            </p>
            <p className="text-white text-lg">
              Price Per Video: {formatPrice(details.pricePerVideo)}
            </p>
            <h1 className="text-white text-3xl my-3">What they're looking for:</h1>
            <p className="text-white text-lg">{details.lookingFor}</p>
          </div>
        </div>

        <div className="mx-2 bg-white rounded-xl flex flex-col justify-between items-center text-2xl font-bold  col-span-5 col-start-1 row-start-16 lg:col-span-2 row-span-4 lg:col-start-4 lg:row-start-6">
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

export default InfluencerDetails;
