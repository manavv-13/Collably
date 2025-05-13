import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import brandContext from "../context/brands/brandContext";
import Footer from "./Footer";
import { motion } from "motion/react";
import alertContext from "../context/alert/alertContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function CreateBrand() {
  const navigate = useNavigate();
  const bContext = useContext(brandContext);
  const aContext = useContext(alertContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const { msg, setAlert } = aContext;

  const [credentials, setCredentials] = useState({
    brandName: "",
    email: "",
    password: "",
    cPassword: "",
    description: "",
    speciality: "",
    phoneNumber: "",
    lookingFor: "",
    website: "",
    coverPhoto: null,
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.files[0] });
  };

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");

  const { signInBrand, sendOTP, verifyOTP } = bContext;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cPassword) {
      const obj = await sendOTP(credentials.email);
      if (obj.success) {
        setAlert(obj.msg);
        setShowOtpModal(true);
      } else {
        setAlert(obj.msg);
      }
    } else {
      setAlert("Passwords don't match. Try Again!");
    }
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
          Create an account as a Brand!
        </h1>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex justify-center items-center gap-2 w-full">
              {/* First Input */}
              <div className="flex flex-col w-[40%] h-auto mx-1">
                <label
                  htmlFor="brandName"
                  className="text-white mb-1 archivo-narrow-font text-lg"
                >
                  Brand Name
                </label>
                <input
                  id="brandName"
                  name="brandName"
                  onChange={onChange}
                  className="w-full p-2 bg-violet-600 text-white rounded-xl"
                  placeholder="Enter your Company Name"
                />
              </div>

              {/* Second Input */}
              <div className="flex flex-col w-[60%] h-auto mx-1">
                <label
                  htmlFor="email"
                  className="text-white mb-1 archivo-narrow-font text-lg"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  onChange={onChange}
                  className="w-full p-2 bg-violet-600 text-white rounded-xl"
                  placeholder="Enter your E-Mail"
                />
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 w-full">
              {/* First Input */}
              <div className="flex flex-col w-[50%] h-auto mx-1 relative">
                <label
                  htmlFor="password"
                  className="text-white mb-1 archivo-narrow-font text-lg"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={onChange}
                  className="w-full p-2 bg-violet-600 text-white rounded-xl mb-4"
                  placeholder="Enter a strong Password"
                ></input>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[50px] transform -translate-y-1/2 text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Second Input */}
              <div className="flex flex-col w-[50%] h-auto mx-1 relative">
                <label
                  htmlFor="cPassword"
                  className="text-white mb-1 archivo-narrow-font text-lg"
                >
                  Confirm Password
                </label>
                <input
                  id="cPassword"
                  name="cPassword"
                  type={showCPassword ? "text" : "password"}
                  onChange={onChange}
                  className="w-full p-2 bg-violet-600 text-white rounded-xl mb-4"
                  placeholder="Confirm Password"
                ></input>
                <button
                  type="button"
                  onClick={() => setShowCPassword((prev) => !prev)}
                  className="absolute right-3 top-[50px] transform -translate-y-1/2 text-white"
                >
                  {showCPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 w-full">
              {/* First Input */}
              <div className="flex flex-col w-full h-auto mx-1">
                <label
                  htmlFor="description"
                  className="text-white mb-1 archivo-narrow-font text-lg"
                >
                  What Describes you the best?
                </label>
                <textarea
                  id="description"
                  name="description"
                  onChange={onChange}
                  className="w-full p-2 bg-violet-600 text-white rounded-xl mb-4"
                  placeholder="Type Here"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 w-full">
              <div className="flex flex-col w-[40%] h-auto mx-1">
                <label
                  htmlFor="phoneNumber"
                  className="text-white mb-1 archivo-narrow-font text-lg"
                >
                  Phone No.
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={onChange}
                  className="w-full p-2 bg-violet-600 text-white rounded-xl mb-4"
                  placeholder="Enter your Phone No."
                ></input>
              </div>
              <div className="flex flex-col w-[60%] h-auto mx-1">
                <label
                  htmlFor="speciality"
                  className="text-white archivo-narrow-font text-lg"
                >
                  Select your niche
                </label>
                <select
                  id="speciality"
                  name="speciality"
                  onChange={onChange}
                  className="w-full p-2 bg-violet-600 text-white rounded-xl mb-4"
                  defaultValue=""
                >
                  <option value="" disabled>-- Select a Speciality --</option>
                  <option value="Technology & Gadgets">Technology & Gadgets</option>
                  <option value="Fashion & Beauty">Fashion & Beauty</option>
                  <option value="Health & Fitness">Health & Fitness</option>
                  <option value="Food & Cooking">Food & Cooking</option>
                  <option value="Finance & Business">Finance & Business</option>
                  <option value="Gaming & Esports">Gaming & Esports</option>
                  <option value="Travel & Adventure">Travel & Adventure</option>
                  <option value="Education & Motivation">Education & Motivation</option>
                  <option value="Lifestyle & Vlogs">Lifestyle & Vlogs</option>
                  <option value="Entertainment & Comedy">Entertainment & Comedy</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 w-full">
              {/* First Input */}
              <div className="flex flex-col w-full h-auto mx-1">
                <label
                  htmlFor="lookingFor"
                  className="text-white mb-1 archivo-narrow-font text-lg"
                >
                  Tell Influencers what you're looking for
                </label>
                <textarea
                  id="lookingFor"
                  name="lookingFor"
                  onChange={onChange}
                  className="w-full p-2 bg-violet-600 text-white rounded-xl mb-4"
                  placeholder="Type Here"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 w-full">
              {/* First Input */}
              <div className="flex flex-col w-full h-auto mx-1">
                <label
                  htmlFor="website"
                  className="text-white mb-1 archivo-narrow-font text-lg"
                >
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  onChange={onChange}
                  className="w-full p-2 bg-violet-600 text-white rounded-xl mb-4"
                  placeholder="Enter your brand/company website..."
                ></input>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 w-full">
              {/* First Input */}
              <div className="flex flex-col w-full h-auto mx-1">
                <label className="text-white mb-1 archivo-narrow-font text-lg">
                  Upload Cover Photo
                </label>

                <input
                  type="file"
                  accept="image/*"
                  id="coverPhoto"
                  name="coverPhoto"
                  className="w-full p-2 bg-violet-600 text-white rounded-xl mb-1 cursor-pointer"
                  onChange={onFileChange}
                />
                <p className="text-sm text-gray-400 mb-2">
                  *This will be visible to influencers on their dashboard.
                </p>
              </div>
            </div>

            <button className="text-3xl annie-use-your-telescope-regular rounded-3xl bg-gradient-to-r from-[#0E0014] to-[#53007A]  cursor-pointer drop-shadow-[0px_0px_5px_white] hover:drop-shadow-[0px_0px_8px_white] transition-all duration-300 text-white px-4 py-2 h-auto mb-4">
              Create Account
            </button>
          </div>
        </form>

        {showOtpModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-70 z-50">
            <div className="bg-white text-black  p-6 rounded-lg w-[90%] max-w-md">
              <h2 className="archivo-narrow-font text-lg mb-4">
                Verify your E-mail!
              </h2>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                placeholder="Enter OTP sent to your email"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowOtpModal(false)}
                  className="text-lg archivo-narrow-font rounded-xl bg-gradient-to-r from-red-700 to-red-400 cursor-pointer bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    const obj = await verifyOTP(credentials.email, otp);
                    if (obj.success) {
                      const obj1 = await signInBrand(credentials);
                      if (obj1.success) {
                        setAlert(obj1.msg);
                        navigate("/dashboardBrand");
                      } else {
                        setAlert(obj1.msg);
                      }
                    } else {
                      setAlert(obj.msg);
                    }
                  }}
                  className="text-lg archivo-narrow-font rounded-xl bg-gradient-to-r from-[#0E0014] to-[#53007A] cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default CreateBrand;
