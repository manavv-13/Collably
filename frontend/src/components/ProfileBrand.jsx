import React, { useContext, useEffect, useState } from "react";
import brandContext from "../context/brands/brandContext";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import loaderContext from "../context/loader/loaderContext";
import alertContext from "../context/alert/alertContext";
import Footer from "./Footer";
import EditModal from "./EditModal";

function ProfileBrand(props) {
  const bContext = useContext(brandContext);
  const lContext = useContext(loaderContext);
  const aContext = useContext(alertContext);
  const navigate = useNavigate();

  const { msg } = aContext;
  const { setLoader } = lContext;
  const { userProfile, brand, updateProfile } = bContext;

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
            className="w-full h-64 border-1 border-white rounded-xl bg-cover bg-center overflow-hidden flex items-center justify-center"
            style={{
              backgroundImage: `url(${brand.coverPhoto})`,
            }}
          >
            <p className="font-semibold text-inherit text-2xl mx-4 ">
              Cover Photo
            </p>
            <div className="flex justify-between items-center gap-2">
              <i className="fa-solid fa-pen-to-square text-inherit text-xl cursor-pointer"
              onClick={() =>
                handleEditClick("coverPhoto", brand.coverPhoto)
              }></i>
            </div>
          </div>
          {/* Name & Email Section */}
          <div className="flex justify-center items-center gap-2 w-full">
            {/* Name */}
            <div className="flex flex-col w-[40%] h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">Name</p>
              <div className="flex justify-between items-center gap-2">
                {brand.brandName}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() => handleEditClick("brandName", brand.brandName)}
                ></i>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col w-[60%] h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">Email</p>
              <div className="flex justify-between items-center gap-2">
                {brand.email}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() => handleEditClick("email", brand.email)}
                ></i>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="flex justify-center items-center gap-2 w-full">
            <div className="flex flex-col w-full h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">Description</p>
              <div className="flex justify-between items-center gap-2">
                {brand.description}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("description", brand.description)
                  }
                ></i>
              </div>
            </div>
          </div>

          {/* Looking For Section */}
          <div className="flex justify-center items-center gap-2 w-full">
            <div className="flex flex-col w-full h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">Looking For</p>
              <div className="flex justify-between items-center gap-2">
                {brand.lookingFor}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("lookingFor", brand.lookingFor)
                  }
                ></i>
              </div>
            </div>
          </div>

          {/*Website Section */}
          <div className="flex justify-center items-center gap-2 w-full">
            <div className="flex flex-col w-full h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">Website</p>
              <div className="flex justify-between items-center gap-2">
                {brand.website}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("website", brand.website)
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
                {brand.phoneNumber}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("phoneNumber", brand.phoneNumber)
                  }
                ></i>
              </div>
            </div>

            {/* Speciality */}
            <div className="flex flex-col w-[60%] h-auto mx-1 bg-violet-300 border-1 rounded-xl p-4 border-purple-500">
              <p className="text-sm font-semibold text-gray-700">Speciality</p>
              <div className="flex justify-between items-center gap-2">
                {brand.speciality}
                <i
                  className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleEditClick("speciality", brand.speciality)
                  }
                ></i>
              </div>
            </div>
          </div>

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

export default ProfileBrand;
