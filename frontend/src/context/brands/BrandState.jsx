import React, { useContext, useState } from "react";
import alertContext from "../alert/alertContext";
import BrandContext from "./brandContext";
import loaderContext from "../loader/loaderContext";

const BrandState = (props) => {
  const host = "http://localhost:3000";

  const lContext = useContext(loaderContext);
  const aContext = useContext(alertContext);
  const { setAlert } = aContext;
  const {setLoader} = lContext;

  const [brand, setBrand] = useState({});
  const [influencers, setInfluencers] = useState([]);
  const [details, setDetails] = useState({});

  const sendMessage = async (email, toName, message, fromEmail, fromNumber) => {
    const response = await fetch(`${host}/api/brand/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        toName: toName,
        message: message,
        fromEmail: fromEmail,
        fromNumber: fromNumber,
      }),
    });

    const json = await response.json();
    return { success: json.success, msg: json.msg };
  };

  const sendNotification = async (
    email,
    toName,
    fromName,
    fromEmail,
    fromNumber
  ) => {
    const response = await fetch(`${host}/api/brand/send-notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        toName: toName,
        fromName: fromName,
        fromEmail: fromEmail,
        fromNumber: fromNumber,
      }),
    });

    const json = await response.json();
    return { success: json.success, msg: json.msg };
  };

  const sendOTP = async (email) => {
    setLoader(10);
    const response = await fetch(`${host}/api/brand/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    setLoader(70);
    const json = await response.json();
    setLoader(100);
    return { success: json.success, msg: json.msg };
  };

  const verifyOTP = async (email, otp) => {
    setLoader(10);
    const response = await fetch(`${host}/api/brand/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
      }),
    });
    setLoader(70);
    const json = await response.json();
    setLoader(100);
    return { success: json.success, msg: json.msg };
  };

  const loginBrand = async (email, password) => {
    const response = await fetch(`${host}/api/brand/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("comToken", json.token);
    }
    return { success: json.success, msg: json.msg };
  };

  const signInBrand = async (obj) => {

    const formData = new FormData();

    formData.append("brandName", obj.brandName);
    formData.append("email", obj.email);
    formData.append("password", obj.password);
    formData.append("description", obj.description);
    formData.append("speciality", obj.speciality);
    formData.append("lookingFor", obj.lookingFor);
    formData.append("website",obj.website);
    formData.append("phoneNumber", obj.phoneNumber);

    if (obj.coverPhoto) {
      formData.append("coverPhoto", obj.coverPhoto);
    }

    const response = await fetch(`${host}/api/brand/signIn`, {
      method: "POST",
      body: formData,
    });
    const json = await response.json();

    if (json.success) {
      localStorage.setItem("comToken", json.token);
    }
    return { success: json.success, msg: json.msg };
  };

  const fetchInfluencers = async () => {
    const response = await fetch(`${host}/api/brand/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      setAlert(json.msg);
      setInfluencers(json.influencerList);
    }
  };

  const userProfile = async () => {
    const response = await fetch(`${host}/api/brand/collably/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("comToken"),
      },
    });
    const json = await response.json();
    if (json.success) {
      setAlert(json.msg);
      setBrand(json.brand);
    } else {
      setAlert(json.msg);
    }
  };

  const getDetails = async (id) => {
    const response = await fetch(`${host}/api/brand/${id}/details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      setAlert(json.msg);
      setDetails(json.details);
    } else {
      setAlert(json.msg);
    }
  };

  const updateProfile = async (field, value) => {

    let response;
    if (field==="coverPhoto") {
      response = await fetch(`${host}/api/brand/collably/updateProfile`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("comToken"),
        },
        body: value,
      });
    }else{
      response = await fetch(`${host}/api/brand/collably/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("comToken"),
        },
        body: JSON.stringify({
          field: field,
          value: value,
        }),
      });
    }
    
    const json = await response.json();
    if (json.success) {
      setAlert(json.msg);
      setBrand(json.user);
    } else setAlert(json.msg);
  };

  return (
    <BrandContext.Provider
      value={{
        sendNotification,
        sendOTP,
        verifyOTP,
        influencers,
        loginBrand,
        signInBrand,
        fetchInfluencers,
        brand,
        userProfile,
        updateProfile,
        getDetails,
        details,
        sendMessage,
      }}
    >
      {props.children}
    </BrandContext.Provider>
  );
};

export default BrandState;
