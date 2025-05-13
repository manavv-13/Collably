const express = require("express");
const router = express.Router();
const Brand = require("../models/Brand");
const Influencer = require("../models/Influencer");
const { body, validationResult } = require("express-validator");
const { isURL } = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { fetchInfluencer } = require("../middlewares/fetch");
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
  global.otpStore = { email, otp, expires: Date.now() + 4 * 60 * 1000 }; // Expires in 4 mins

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
    !global.otpStore ||
    global.otpStore.email !== email ||
    global.otpStore.otp !== parseInt(otp)
  ) {
    return res.status(400).json({ success: false, msg: "Invalid OTP" });
  }

  if (Date.now() > global.otpStore.expires) {
    return res.status(400).json({ success: false, msg: "OTP expired" });
  }

  delete global.otpStore; // Clear OTP after use
  res.json({ success: true, msg: "OTP verified successfully" });
});

//Create a new User Route :-
router.post(
  "/signIn",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
  ]),
  [
    body("email").isEmail().withMessage("Invalid E-mail!"),
    body("name").notEmpty().withMessage("Name is Required!"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be of length 6 or more!"),
    body("description")
      .isLength({ min: 200 })
      .withMessage("Description too short!"),
    body("igHandle").notEmpty().withMessage("Enter your valid IG handle!"),
    body("ytHandle")
      .notEmpty()
      .withMessage("Enter your Valid YT Channel, or else NA!"),
    body("speciality").notEmpty().withMessage("Please choose a category!"),
    body("lookingFor")
      .isLength({ min: 100 })
      .withMessage("Please define what exactly are you looking for!"),
    body("pricePerPost").isInt().withMessage("Enter a valid number!"),
    body("pricePerReel").isInt().withMessage("Enter a valid number!"),
    body("pricePerVideo").isInt().withMessage("Enter a valid number!"),
    body("phoneNumber")
      .isMobilePhone("any")
      .withMessage("Invalid Phone Number!"),
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
        name,
        password,
        description,
        igHandle,
        igHandleLink,
        ytHandle,
        ytHandleLink,
        speciality,
        lookingFor,
        pricePerPost,
        pricePerReel,
        pricePerVideo,
        phoneNumber,
      } = req.body;
      const influencer = await Influencer.findOne({ email });
      if (influencer) {
        return res
          .status(400)
          .json({ success, msg: "User Already exists! Log-In instead!" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profilePhotoPath = req.files?.profilePhoto?.[0]?.path || "";
        const coverPhotoPath = req.files?.coverPhoto?.[0]?.path || "";

        const newInfluencer = new Influencer({
          email,
          name,
          password: hashedPassword,
          description,
          igHandle,
          igHandleLink,
          ytHandle,
          ytHandleLink,
          speciality,
          lookingFor,
          pricePerPost,
          pricePerReel,
          pricePerVideo,
          phoneNumber,
          profilePhoto: profilePhotoPath,
          coverPhoto: coverPhotoPath,
        });
        await newInfluencer.save();

        //payload contains user data that like id/email that ensures that correct user is having the access
        const payload = {
          influencerId: newInfluencer._id,
          name: newInfluencer.name,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {});
        res.json({
          success: true,
          msg: "Sign-in successful",
          influencer: newInfluencer,
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

//Login Route:-
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
      const existingInfluencer = await Influencer.findOne({ email });
      if (!existingInfluencer) {
        return res
          .status(400)
          .json({ success, msg: "User Doesn't Exist! Sign-in Instead!" });
      } else {
        const isMatch = await bcrypt.compare(
          password,
          existingInfluencer.password
        );
        if (!isMatch) {
          return res.status(400).json({ success, msg: "Wrong Credentials!" });
        }
        const payload = {
          influencerId: existingInfluencer._id,
          name: existingInfluencer.name,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {});
        res.status(200).json({
          success: true,
          msg: "Log-in Successfull!",
          influencer: existingInfluencer,
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

//Influencer Edit Route:-
router.put(
  "/:name/updateProfile",
  fetchInfluencer,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
  ]),
  [
    // Field should not be empty
    body("field").notEmpty().withMessage("Field is required"),
    body("value")
      .if(
        (_, { req }) =>
          req.body.field !== "profilePhoto" && req.body.field !== "coverPhoto"
      )
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

    body("value")
      .if(body("field").equals("igHandleLink"))
      .custom((value) => {
        if (value.toLowerCase() === "na") return true;
        if (isURL(value)) return true;
        throw new Error('Please enter a valid Instagram URL or "NA"');
      }),

    body("value")
      .if(body("field").equals("ytHandleLink"))
      .custom((value) => {
        if (value.toLowerCase() === "na") return true;
        if (isURL(value)) return true;
        throw new Error('Please enter a valid YouTube URL or "NA"');
      }),

    body("value")
      .if(body("field").equals("pricePerPost"))
      .isInt()
      .withMessage("Enter a valid number!"),
    body("value")
      .if(body("field").equals("pricePerReel"))
      .isInt()
      .withMessage("Enter a valid number!"),
    body("value")
      .if(body("field").equals("pricePerVideo"))
      .isInt()
      .withMessage("Enter a valid number!"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { field, value } = req.body;
    const influencer = req.influencer;
    let success = false;

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success, msg: "Invalid Credentials!", errors: errors.array() });
    }

    try {
      let updateData = {};

      // Handle image upload
      if (field === "profilePhoto" || field === "coverPhoto") {
        if (!req.files || !req.files[field]) {
          return res.status(400).json({ success, msg: "No file uploaded!" });
        }
        updateData[field] = req.files[field][0].path;
      } else {
        updateData[field] = value;
      }

      const updatedInfluencer = await Influencer.findByIdAndUpdate(
        influencer.influencerId,
        updateData,
        { new: true }
      );

      res.status(200).json({
        success: true,
        msg: "Profile updated successfully",
        user: updatedInfluencer,
      });
    } catch (err) {
      res
        .status(400)
        .json({ success, msg: "Some Error Occured", error: err.message });
    }
  }
);

//Influencer Dashboard Route:-
router.get("/dashboard", async (req, res) => {
  let success = false;
  try {
    const brandList = await Brand.find({});
    res
      .status(200)
      .json({ success: true, msg: `Welcome!`, brandList: brandList });
  } catch (err) {
    res
      .status(400)
      .json({ success, msg: "Some Error Occured", error: err.message });
  }
});

//Influencer Profile Route:-
router.post("/:name/profile", fetchInfluencer, async (req, res) => {
  const influencer = req.influencer;
  let success = false;
  try {
    const currInfluencer = await Influencer.findById(influencer.influencerId);
    if (!currInfluencer) {
      return res.status(401).json({ success, msg: "Bad Request!" });
    }

    res.status(200).json({
      success: true,
      msg: "Here's your profile!",
      influencer: currInfluencer,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success, msg: "Some Error Occured", error: err.message });
  }
});

//Details of a Brand
router.get("/:id/details", async (req, res) => {
  let success = false;
  let { id } = req.params;
  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ success, msg: "Brand not found" });
    }
    res
      .status(200)
      .json({ success: true, msg: "Details as asked!", details: brand });
  } catch (err) {
    res
      .status(400)
      .json({ success, msg: "Some Error Occured", error: err.message });
  }
});

module.exports = router;
