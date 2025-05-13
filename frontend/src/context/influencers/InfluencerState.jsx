import React, { useContext, useState } from "react";
import InfluencerContext from "./influencerContext";
import alertContext from "../alert/alertContext";

const InfluencerState = (props) => {
  const host = "http://localhost:3000";

  const aContext = useContext(alertContext);
  const { setAlert } = aContext;

  const [brands, setBrands] = useState([]);
  const [influencer, setInfluencer] = useState({});
  const [details, setDetails] = useState({});

  const sendMessage = async (email, toName, message, fromEmail, fromNumber) => {
    const response = await fetch(`${host}/api/influencer/send-message`, {
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
    const response = await fetch(`${host}/api/influencer/send-notification`, {
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
    const response = await fetch(`${host}/api/influencer/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const json = await response.json();
    return { success: json.success, msg: json.msg };
  };

  const verifyOTP = async (email, otp) => {
    const response = await fetch(`${host}/api/influencer/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
      }),
    });
    const json = await response.json();
    return { success: json.success, msg: json.msg };
  };

  const loginInfluencer = async (email, password) => {
    const response = await fetch(`${host}/api/influencer/login`, {
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
      localStorage.setItem("infToken", json.token);
    }
    return { success: json.success, msg: json.msg };
  };

  const signInInfluencer = async (obj) => {
    const formData = new FormData();
  
    formData.append("name", obj.name);
    formData.append("email", obj.email);
    formData.append("password", obj.password);
    formData.append("description", obj.description);
    formData.append("igHandle", obj.igHandle);
    formData.append("ytHandle", obj.ytHandle);
    formData.append("ytHandleLink", obj.ytHandleLink);
    formData.append("igHandleLink", obj.igHandleLink);
    formData.append("speciality", obj.speciality);
    formData.append("lookingFor", obj.lookingFor);
    formData.append("pricePerPost", obj.pricePerPost);
    formData.append("pricePerReel", obj.pricePerReel);
    formData.append("pricePerVideo", obj.pricePerVideo);
    formData.append("phoneNumber", obj.phoneNumber);
  
    if (obj.profilePhoto) {
      formData.append("profilePhoto", obj.profilePhoto);
    }
  
    if (obj.coverPhoto) {
      formData.append("coverPhoto", obj.coverPhoto);
    }
  
    const response = await fetch(`${host}/api/influencer/signIn`, {
      method: "POST",
      body: formData,
    });
  
    const json = await response.json();
  
    if (json.success) {
      localStorage.setItem("infToken", json.token);
    }
  
    return { success: json.success, msg: json.msg };
  };
  

  const fetchBrand = async () => {
    const response = await fetch(`${host}/api/influencer/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      setAlert(json.msg);
      setBrands(json.brandList);
    }
  };

  const userProfile = async () => {
    const response = await fetch(`${host}/api/influencer/manav/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("infToken"),
      },
    });
    const json = await response.json();
    if (json.success) {
      setAlert(json.msg);
      setInfluencer(json.influencer);
    } else {
      setAlert(json.msg);
    }
  };

  const getDetails = async (id) => {
    const response = await fetch(`${host}/api/influencer/${id}/details`, {
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
    
    // Handle file upload separately
    if (field === "profilePhoto" || field==="coverPhoto") {
      response = await fetch(`${host}/api/influencer/manav/updateProfile`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("infToken"), // No need for Content-Type with FormData
        },
        body: value, // value is FormData with the file
      });
    } else {
      // Regular field update
      response = await fetch(`${host}/api/influencer/manav/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("infToken"),
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
      setInfluencer(json.user);
    } else {
      setAlert(json.msg);
    }
  };
  

  return (
    <InfluencerContext.Provider
      value={{
        sendMessage,
        sendNotification,
        sendOTP,
        verifyOTP,
        brands,
        fetchBrand,
        loginInfluencer,
        signInInfluencer,
        influencer,
        userProfile,
        updateProfile,
        getDetails,
        details,
      }}
    >
      {props.children}
    </InfluencerContext.Provider>
  );
};
export default InfluencerState;
