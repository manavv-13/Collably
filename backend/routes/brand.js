const express = require("express");
const router = express.Router();
const Brand = require("../models/Brand");
const Influencer = require("../models/Influencer");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { fetchBrand } = require("../middlewares/fetch");
const {
  sendOTP,
  sendNotification,
  sendMessage,
} = require("../helper/mailSender");
const upload = require("../middlewares/multer");

const generateOTP = () => Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

router.post("/send-message", async (req, res) => {
  const { email, toName, message, fromEmail, fromNumber } = req.body;

  try {
    let success = await sendMessage(
      email,
      toName,
      message,
      fromEmail,
      fromNumber
    );
    if (success) {
      res.json({ success: true, msg: "Message Sent!" });
    } else
      res.json({
        success: false,
        msg: "Some Error Occured, try again!",
        error,
      });
  } catch (error) {
    res.json({ success: false, msg: "Some error occured, try again!", error });
  }
});

router.post("/send-notification", async (req, res) => {
  const { email, toName, fromName, fromEmail, fromNumber } = req.body;

  try {
    let success = await sendNotification(
      email,
      toName,
      fromName,
      fromEmail,
      fromNumber
    );
    if (success) res.json({ success, msg: "User pinged!" });
    else
      res.json({
        success: false,
        msg: "Some error occured, try again!",
        error,
      });
  } catch (error) {
    res.json({ success: false, msg: "Some error occured, try again!", error });
  }
});

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ success: false, msg: "Email is required" });

  const otp = generateOTP();
  // Store OTP in memory/db (for validation later)
  global.brandOtpStore = { email, otp, expires: Date.now() + 4 * 60 * 1000 }; // Expires in 4 mins

  try {
    let success = await sendOTP(email, otp);
    if (success) res.json({ success, msg: "OTP sent successfully" });
    else
      res.json({
        success: false,
        msg: "Some error occured, try again!",
        error,
      });
  } catch (error) {
    res.json({ success: false, msg: "Some error occured, try again!", error });
  }
});

router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (
    !global.brandOtpStore ||
    global.brandOtpStore.email !== email ||
    global.brandOtpStore.otp !== parseInt(otp)
  ) {
    return res.status(400).json({ success: false, msg: "Invalid OTP" });
  }

  if (Date.now() > global.brandOtpStore.expires) {
    return res.status(400).json({ success: false, msg: "OTP expired" });
  }

  delete global.brandOtpStore; // Clear OTP after use
  res.json({ success: true, msg: "OTP verified successfully" });
});

//Create a new User Route :-
router.post(
  "/signIn",
  upload.fields([{ name: "coverPhoto", maxCount: 1 }]),
  [
    body("email").isEmail().withMessage("Invalid E-mail!"),
    body("brandName").notEmpty().withMessage("Name is Required!"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be of length 6 or more!"),
    body("description")
      .isLength({ min: 200 })
      .withMessage("Description too short!"),
    body("lookingFor")
    .isLength({ min: 100 })
    .withMessage("Looking For too short!"),
    body("speciality").notEmpty().withMessage("Please choose a category!"),
    body("phoneNumber")
      .isMobilePhone("any")
      .withMessage("Invalid Phone Number!"),
    body("website").isURL().withMessage("Enter a valid URL!"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success, msg: "Invalid Credentials!", errors: errors.array() });
    }
    try {
      const {
        email,
        brandName,
        password,
        description,
        speciality,
        lookingFor,
        phoneNumber,
        website,
      } = req.body;
      const brand = await Brand.findOne({ email });
      if (brand) {
        return res
          .status(400)
          .json({ success, msg: "User Already exists! Log-In instead!" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const coverPhotoPath = req.files?.coverPhoto?.[0]?.path || "";

        if (!coverPhotoPath) {
          return res
            .status(400)
            .json({ success: false, msg: "Cover photo is required" });
        }

        const newBrand = new Brand({
          email,
          brandName,
          password: hashedPassword,
          description,
          speciality,
          lookingFor,
          phoneNumber,
          website,
          coverPhoto: coverPhotoPath,
        });
        await newBrand.save();

        //payload contains user data that like id/email that ensures that correct user is having the access
        const payload = {
          brandId: newBrand._id,
          brandName: newBrand.brandName,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {});
        res.json({
          success: true,
          msg: "Sign-in successful",
          brand: newBrand,
          token,
        });
      }
    } catch (err) {
      res
        .status(400)
        .json({ success, msg: "Some Error Occured", error: err.message });
    }
  }
);

//Log-in User Route:-
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid E-mail!"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be of length 6 or more!"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success, msg: "Invalid Credentials!", errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const existingBrand = await Brand.findOne({ email });
      if (!existingBrand) {
        return res
          .status(400)
          .json({ success, msg: "User Doesn't Exist! Sign-in Instead!" });
      } else {
        const isMatch = await bcrypt.compare(password, existingBrand.password);
        if (!isMatch) {
          return res.status(400).json({ success, msg: "Wrong Credentials!" });
        }
        const payload = {
          brandId: existingBrand._id,
          brandName: existingBrand.brandName,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {});
        res.status(200).json({
          success: true,
          msg: "Log-in Successfull!",
          brand: existingBrand,
          token,
        });
      }
    } catch (err) {
      res
        .status(400)
        .json({ success, msg: "Some Error Occured", error: err.message });
    }
  }
);

//Brand Edit Route:-
router.put(
  "/:name/updateProfile",
  fetchBrand,
  upload.fields([{ name: "coverPhoto", maxCount: 1 }]),
  [
    body("field").notEmpty().withMessage("Field is required"),
    body("value")
      .if((_, { req }) => req.body.field !== "coverPhoto")
      .notEmpty()
      .withMessage("Value cannot be empty"),

    // If updating email, check for valid email format
    body("value")
      .if(body("field").equals("email"))
      .isEmail()
      .withMessage("Invalid email format"),

    // If updating description, check minimum length of 200 characters
    body("value")
      .if(body("field").equals("description"))
      .isLength({ min: 200 })
      .withMessage("Description must be at least 200 characters long"),

    body("value")
      .if(body("field").equals("phoneNumber"))
      .isMobilePhone("any")
      .withMessage("Invalid Phone Number!"),

    body("value")
      .if(body("field").equals("lookingFor"))
      .isLength({ min: 100 })
      .withMessage("Must be at least 100 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { field, value } = req.body;
    const brand = req.brand;
    let success = false;

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success, msg: "Invalid Credentials!", errors: errors.array() });
    }

    try {
      let updateData = {};

      if (field === "coverPhoto") {
        if (!req.files || !req.files[field]) {
          return res.status(400).json({ success, msg: "No file uploaded!" });
        }
        updateData[field] = req.files[field][0].path;
      } else {
        updateData[field] = value;
      }

      const updatedBrand = await Brand.findByIdAndUpdate(
        brand.brandId,
        updateData,
        { new: true }
      ); // Updates only one field
      res
        .status(200)
        .json({
          success: true,
          msg: "Profile updated successfully",
          user: updatedBrand,
        });
    } catch (err) {
      res
        .status(400)
        .json({ success, msg: "Some Error Occured", error: err.message });
    }
  }
);

//Brand Dashboard Route
router.get("/dashboard", async (req, res) => {
  let success = false;
  try {
    const influencerList = await Influencer.find({});
    res
      .status(200)
      .json({ success: true, msg: `Welcome!`, influencerList: influencerList });
  } catch (err) {
    res
      .status(400)
      .json({ success, msg: "Some Error Occured", error: err.message });
  }
});

//Brand Profile Route
router.post("/:name/profile", fetchBrand, async (req, res) => {
  const brand = req.brand;
  let success = false;
  try {
    const currBrand = await Brand.findById(brand.brandId);
    if (!currBrand) {
      return res.status(401).json({ success, msg: "Bad Request!" });
    }

    res
      .status(200)
      .json({ success: true, msg: "Here's your profile!", brand: currBrand });
  } catch (err) {
    res
      .status(400)
      .json({ success, msg: "Some Error Occured", error: err.message });
  }
});

//Details of a Influencer
router.get("/:id/details", async (req, res) => {
  let success = false;
  let { id } = req.params;
  try {
    const influencer = await Influencer.findById(id);
    if (!influencer) {
      return res.status(404).json({ success, msg: "Influencer not found" });
    }
    res
      .status(200)
      .json({ success: true, msg: "Details as asked!", details: influencer });
  } catch (err) {
    res
      .status(400)
      .json({ success, msg: "Some Error Occured", error: err.message });
  }
});

module.exports = router;
