import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import influencerContext from "../context/influencers/influencerContext";
import alertContext from "../context/alert/alertContext";
import loaderContext from "../context/loader/loaderContext";
import LoginModal from "./LoginModal";
import Footer from "./Footer";
import Navbar from "./Navbar";

function DashboardInfluencer() {
  const aContext = useContext(alertContext);
  const iContext = useContext(influencerContext);
  const lContext = useContext(loaderContext);

  const { setLoader } = lContext;
  const { user, setCurrUser, msg, setAlert } = aContext;
  const { brands, fetchBrand, influencer, sendNotification, userProfile } =
    iContext;

  const [selectedNiche, setSelectedNiche] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const transition = {
    duration: 0.5,
    delay: 0.3,
    ease: [0, 0.71, 0.2, 1.01],
  };

  const infToken = localStorage.getItem("infToken");
  const isDisabled = !infToken;

  useEffect(() => {
    setCurrUser("influencer");
    fetchBrand();
    if (infToken) userProfile();
  }, []);

  const handleLinkClick = () => {
    setLoader(30);
    setTimeout(() => {
      setLoader(70);
      setLoader(100);
    }, 300);
  };

  const handleInterestedClick = async (toEmail, toName) => {
    setLoader(30);
    const obj = await sendNotification(
      toEmail,
      toName,
      influencer.name,
      influencer.email,
      influencer.phoneNumber
    );
    setLoader(50);
    if (obj.success) {
      setAlert(obj.msg);
      setLoader(100);
    } else {
      setAlert(obj.msg);
      setLoader(100);
    }
  };

  const filteredBrands = selectedNiche
    ? brands.filter((brand) => brand.speciality?.includes(selectedNiche))
    : brands;

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
      <div className="container mx-auto">
        {modalOpen && (
          <LoginModal setModalOpen={setModalOpen} currUser={user} />
        )}
        <Navbar
          setInfModalOpen={setModalOpen}
          setSelectedNicheInf={setSelectedNiche}
        />

        {filteredBrands.length === 0 ? (
          <div className="text-white text-2xl text-center mt-10">
            Nothing to show here!!
          </div>
        ) : (
          filteredBrands.map((element) => {
            return (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={transition}
                key={element._id}
                className="flex justify-between items-center mt-15 mx-2"
              >
                <div
                  className="w-full h-80 p-2 bg-purple-900 rounded-xl mb-4 cursor-pointer relative"
                  style={{
                    backgroundImage: `url(${element.coverPhoto})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h1 className="cursor-default text-5xl annie-use-your-telescope-regular text-outline-black font-semibold">
                    {element.brandName}
                  </h1>
                  <p className="cursor-default text-2xl archivo-narrow-font text-outline-black mb-2">
                    {element.speciality}
                  </p>
                  <Link
                    to={`/${element._id}/brandDetails`}
                    onClick={handleLinkClick}
                    className="relative inline-block text-xl archivo-narrow-font text-outline-black cursor-pointer group transition-all duration-300"
                  >
                    See Details
                    <i className="mx-2 text-base fa-solid fa-arrow-up-right-from-square cursor-pointer"></i>
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current transition-all duration-500 group-hover:w-full"></span>
                  </Link>

                  <div className="flex justify-center items-center gap-6 absolute bottom-0 right-5">
                    <button
                      className={`text-2xl archivo-narrow-font rounded-3xl bg-gradient-to-r from-[#003F0E] to-[#007A12] 
    ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} 
    drop-shadow-[0px_0px_5px_white] hover:drop-shadow-[0px_0px_8px_white] 
    transition-all duration-300 text-white px-4 py-2 h-auto mb-4`}
                      disabled={isDisabled}
                      onClick={() => {
                        handleInterestedClick(element.email, element.brandName);
                      }}
                    >
                      Interested
                    </button>

                    <button
                      className={`text-2xl archivo-narrow-font rounded-3xl bg-gradient-to-r from-[#660000] to-[#AF0000] 
    ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} 
    drop-shadow-[0px_0px_5px_white] hover:drop-shadow-[0px_0px_8px_white] 
    transition-all duration-300 text-white px-4 py-2 h-auto mb-4`}
                      disabled={isDisabled}
                    >
                      Ignore
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
      <Footer />
    </>
  );
}

export default DashboardInfluencer;
