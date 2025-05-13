import React, { useContext, useEffect, useState } from "react";
import influencerContext from "../context/influencers/influencerContext";
import loaderContext from "../context/loader/loaderContext";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Footer from "./Footer";
import EditModal from "./EditModal";
import alertContext from "../context/alert/alertContext";

function ProfileInfluencer(props) {
  const lContext = useContext(loaderContext);
  const aContext = useContext(alertContext);
  const iContext = useContext(influencerContext);
  const navigate = useNavigate();

  const { msg } = aContext;
  const { setLoader } = lContext;
  const { userProfile, influencer, updateProfile } = iContext;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    userProfile();
  }, []);

  const handleEditClick = (field, value) => {
    setSelectedField(field);
    setSelectedValue(value);
    setIsModalOpen(true);
  };

  const handleBack = () => {
    setLoader(30);
    setTimeout(() => {
      setLoader(70);
      navigate(-1);
      setLoader(100);
    }, 300);
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
      <div className="container mx-auto overflow-x-hidden">
        <h1 className="cursor-default my-4 text-4xl sm:text-5xl annie-use-your-telescope-regular text-center text-white">
          Your Profile
        </h1>
        <div className="flex flex-col justify-center items-center gap-4">
          <div
            className="w-36 h-36 border-1 border-white rounded-full bg-cover bg-center overflow-hidden flex items-center justify-center"
            style={{
              backgroundImage: `url(${influencer.profilePhoto})`,
            }}
          >
            <div className="flex justify-between items-center gap-2">
              <i
                className="fa-solid fa-pen-to-square text-inherit text-xl cursor-pointer"
                onClick={() =>
                  handleEditClick("profilePhoto", influencer.profilePhoto)
                }
              ></i>
            </div>
          </div>

          {/*Cover Photo*/}
          <div
            className="w-full h-64 border-1 border-white rounded-xl bg-cover bg-center overflow-hidden flex items-center justify-center"
            style={{
              backgroundImage: `url(${influencer.coverPhoto})`,
            }}
          >
            <p className="font-semibold text-inherit text-2xl mx-4 ">
              Cover Photo
            </p>
            <div className="flex justify-between items-center gap-2">
              <i className="fa-solid fa-pen-to-square text-inherit text-xl cursor-pointer"
              onClick={() =>
                handleEditClick("coverPhoto", influencer.coverPhoto)
              }></i>
            </div>
          </div>
          {/* Name & Email Section */}
          <div className="flex justify-center items-center gap-2 w-full">
            {/* Name */}
            <div className="flex flex-col w-[40%] h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">Name</p>
              <div className="flex justify-between items-center gap-2">
                {influencer.name}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() => handleEditClick("name", influencer.name)}
                ></i>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col w-[60%] h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">Email</p>
              <div className="flex justify-between items-center gap-2">
                {influencer.email}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() => handleEditClick("email", influencer.email)}
                ></i>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="flex justify-center items-center gap-2 w-full">
            <div className="flex flex-col w-full h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">Description</p>
              <div className="flex justify-between items-center gap-2">
                {influencer.description}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("description", influencer.description)
                  }
                ></i>
              </div>
            </div>
          </div>

          {/* Phone Number & Speciality Section */}
          <div className="flex justify-center items-center gap-2 w-full">
            {/* Phone Number */}
            <div className="flex flex-col w-[40%] h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">
                Phone Number
              </p>
              <div className="flex justify-between items-center gap-2">
                {influencer.phoneNumber}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("phoneNumber", influencer.phoneNumber)
                  }
                ></i>
              </div>
            </div>

            {/* Speciality */}
            <div className="flex flex-col w-[60%] h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">Speciality</p>
              <div className="flex justify-between items-center gap-2">
                {influencer.speciality}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("speciality", influencer.speciality)
                  }
                ></i>
              </div>
            </div>
          </div>

          {/* Ig Handle & YT Handle */}
          <div className="flex justify-center items-center gap-2 w-full">
            {/* IG */}
            <div className="flex flex-col w-[40%] h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">IG Handle</p>
              <div className="flex justify-between items-center gap-2">
                {influencer.igHandle}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("igHandle", influencer.igHandle)
                  }
                ></i>
              </div>
            </div>

            {/* YT */}
            <div className="flex flex-col w-[60%] h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">YT Channel</p>
              <div className="flex justify-between items-center gap-2">
                {influencer.ytHandle}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("ytHandle", influencer.ytHandle)
                  }
                ></i>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 w-full">
            {/* IG */}
            <div className="flex flex-col w-[40%] h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">IG Handle Link</p>
              <div className="flex justify-between items-center gap-2">
                {influencer.igHandleLink}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("igHandleLink", influencer.igHandleLink)
                  }
                ></i>
              </div>
            </div>

            {/* YT */}
            <div className="flex flex-col w-[60%] h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">YT Channel Link</p>
              <div className="flex justify-between items-center gap-2">
                {influencer.ytHandleLink}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("ytHandleLink", influencer.ytHandleLink)
                  }
                ></i>
              </div>
            </div>
          </div>

          {/* Looking for */}
          <div className="flex justify-center items-center gap-2 w-full">
            <div className="flex flex-col w-full h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">
                What are you looking for?
              </p>
              <div className="flex justify-between items-center gap-2">
                {influencer.lookingFor}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("lookingFor", influencer.lookingFor)
                  }
                ></i>
              </div>
            </div>
          </div>

          {/*Prices */}
          <div className="flex justify-center items-center gap-2 w-full">
            {/* First Input */}
            <div className="flex flex-col w-[33%] h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">
                Price Per Post
              </p>
              <div className="flex justify-between items-center gap-2">
                {influencer.pricePerPost}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("pricePerPost", influencer.pricePerPost)
                  }
                ></i>
              </div>
            </div>

            {/* Second Input */}
            <div className="flex flex-col w-[33%] h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">
                Price Per Reel
              </p>
              <div className="flex justify-between items-center gap-2">
                {influencer.pricePerReel}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("pricePerReel", influencer.pricePerReel)
                  }
                ></i>
              </div>
            </div>

            <div className="flex flex-col w-[33%] h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">
                Price Per Video
              </p>
              <div className="flex justify-between items-center gap-2">
                {influencer.pricePerVideo}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("pricePerVideo", influencer.pricePerVideo)
                  }
                ></i>
              </div>
            </div>
          </div>

          {/* Logout Button */}

          <button
            onClick={handleBack}
            className="text-lg archivo-narrow-font rounded-xl bg-gradient-to-r from-red-700 to-red-400 cursor-pointer text-white px-4 py-2"
          >
            Go Back
          </button>
        </div>
      </div>

      <EditModal
        isOpen={isModalOpen}
        field={selectedField}
        value={selectedValue}
        onSave={updateProfile}
        setIsModalOpen={setIsModalOpen}
      />
      <Footer />
    </>
  );
}

export default ProfileInfluencer;
