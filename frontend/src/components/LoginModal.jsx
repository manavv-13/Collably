import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import brandContext from "../context/brands/brandContext";
import influencerContext from "../context/influencers/influencerContext";
import loaderContext from "../context/loader/loaderContext";
import alertContext from "../context/alert/alertContext";

function LoginModal(props) {
  const navigate = useNavigate();
  const lContext = useContext(loaderContext);
  const bContext = useContext(brandContext);
  const iContext = useContext(influencerContext);
  const aContext = useContext(alertContext);

  const {msg,setAlert} = aContext;
  const { setLoader } = lContext;
  const { loginInfluencer } = iContext;
  const { loginBrand } = bContext;

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(30);
    if (props.currUser === "influencer") {
      setLoader(50);
      const obj = await loginInfluencer(credentials.email, credentials.password)
      if (obj.success) {
        setAlert(obj.msg);
        closeModal();
        navigate("/dashboardInfluencer");
      } else {
        setAlert(obj.msg);
      }
      setLoader(100);
    } else if (props.currUser === "brand") {
      setLoader(50);
      const obj = await loginBrand(credentials.email, credentials.password)
      if (obj.success) {
        setAlert(obj.msg);
        closeModal();
        navigate("/dashboardBrand");
      } else {
        setAlert(obj.msg);
      }
      setLoader(100);
    }
  };

  const closeModal = () => {
    props.setModalOpen(false);
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
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100%] max-w-[500px] flex-col bg-white p-6 rounded-2xl gap-8 flex items-center justify-center z-50">
        <div className="w-full gap-2 flex items-center justify-center">
          <h2 className="cursor-default text-xl archivo-narrow-font font-bold">
            New User?
          </h2>
          <Link
            to={
              props.currUser === "influencer"
                ? "/signInInfluencer"
                : "/signInBrand"
            }
          >
            <p className="text-xl archivo-narrow-font font-bold text-blue-700 cursor-pointer hover:text-2xl transition-all duration-100">
              Sign-in Instead{" "}
              <i className="text-base fa-solid fa-arrow-up-right-from-square cursor-pointer"></i>
            </p>
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full gap-5">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              placeholder="Enter your E-mail"
              id="email"
              name="email"
              className="w-full p-2 bg-violet-600 text-white rounded-xl mb-4"
              onChange={onChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              id="password"
              name="password"
              className="w-full p-2 bg-violet-600 text-white rounded-xl mb-4"
              onChange={onChange}
            />
          </div>

          <div className="w-full flex justify-between">
            <button
              className="text-lg archivo-narrow-font rounded-xl bg-gradient-to-r from-red-700 to-red-400 cursor-pointer bg-gray-400 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button className="text-lg archivo-narrow-font rounded-xl bg-gradient-to-r from-[#0E0014] to-[#53007A] cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginModal;
