import React, { useContext } from "react";
import { Link } from "react-router";
import alertContext from "../context/alert/alertContext";
import { useLocation } from "react-router-dom";
import loaderContext from "../context/loader/loaderContext";

function Navbar(props) {
  const aContext = useContext(alertContext);
  const lContext = useContext(loaderContext);

  const { setLoader } = lContext;
  const { user } = aContext;

  const location = useLocation();

  const isInfluencerLoggedIn = !!localStorage.getItem("infToken");
  const isBrandLoggedIn = !!localStorage.getItem("comToken");

  let profileLink = "#";
  let isDisabled = true;

  if (user === "influencer" && isInfluencerLoggedIn) {
    profileLink = "/profileInfluencer";
    isDisabled = false;
  } else if (user === "brand" && isBrandLoggedIn) {
    profileLink = "/profileBrand";
    isDisabled = false;
  }

  const handleLinkClick = () => {
    setLoader(30);
    setTimeout(() => {
      setLoader(70);
      setLoader(100);
    }, 300);
  };

  const handleNicheChange = (e) => {
    setLoader(30);
    if (user === "influencer") {
      setLoader(50);
      props.setSelectedNicheInf(e.target.value);
    } else {
      setLoader(50);
      props.setSelectedNicheBrand(e.target.value);
    }
    setTimeout(() => {
      setLoader(70);
      setLoader(100);
    }, 300);
  };

  return (
    <>
      <div className="container mx-auto mt-5 flex justify-center sticky top-5 z-1">
        <div className="w-fit flex justify-center items-center gap-6 rounded-4xl p-4 bg-gradient-to-r from-[#0E0014] to-[#53007A] drop-shadow-[0px_0px_5px_white]">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="cursor-pointer text-white"
          >
            Home
          </Link>
          <Link
            to={`${user === "influencer" ? "/dashboardInfluencer" : "/dashboardBrand"}`}
            onClick={handleLinkClick}
            className="cursor-pointer text-white"
          >
            Dashboard
          </Link>
          <Link
            onClick={handleLinkClick}
            to={isDisabled ? "#" : profileLink}
            className={`${
              isDisabled
                ? "text-gray-300 cursor-not-allowed"
                : "text-white cursor-pointer"
            }`}
          >
            Profile
          </Link>
          <h1
            className="cursor-pointer text-white"
            onClick={() => {
              if (user === "influencer") {
                if (isInfluencerLoggedIn) {
                  localStorage.removeItem("infToken");
                  window.location.reload();
                } else {
                  props.setInfModalOpen(true);
                }
              } else {
                if (isBrandLoggedIn) {
                  localStorage.removeItem("comToken");
                  window.location.reload();
                } else {
                  props.setBrandModalOpen(true);
                }
              }
            }}
          >
            {user === "influencer"
              ? isInfluencerLoggedIn
                ? "Logout"
                : "Login"
              : isBrandLoggedIn
              ? "Logout"
              : "Login"}
          </h1>

          <select
            className="cursor-pointer text-white"
            onChange={handleNicheChange}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              width: "35px",
            }}
            value="" // Keeps the visible text always as "Filter"
          >
            <option value="" disabled hidden>
              Filter
            </option>
            <option className="bg-purple-900" value="">All Niche</option>
            <option className="bg-purple-900" value="Technology & Gadgets">Technology & Gadgets</option>
            <option className="bg-purple-900" value="Fashion & Beauty">Fashion & Beauty</option>
            <option className="bg-purple-900" value="Health & Fitness">Health & Fitness</option>
            <option className="bg-purple-900" value="Food & Cooking">Food & Cooking</option>
            <option className="bg-purple-900" value="Finance & Business">Finance & Business</option>
            <option className="bg-purple-900" value="Gaming & Esports">Gaming & Esports</option>
            <option className="bg-purple-900" value="Travel & Adventure">Travel & Adventure</option>
            <option className="bg-purple-900" value="Education & Motivation">Education & Motivation</option>
            <option className="bg-purple-900" value="Lifestyle & Vlogs">Lifestyle & Vlogs</option>
            <option className="bg-purple-900" value="Entertainment & Comedy">Entertainment & Comedy</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Navbar;
