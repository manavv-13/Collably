const jwt = require('jsonwebtoken');
const JWT_SECRET = "iamspiderman";

const fetchBrand =(req,res,next)=>{
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ errors: ["Access denied. No token provided."] });
    }

    try {
        const decodedData = jwt.verify(token,JWT_SECRET);
        req.brand = decodedData; // Attach userId to request
        next();
    } catch (err) {
        res
          .status(400)
          .json({ message: "Some Error Occured", error: err.message });
      }
}

const fetchInfluencer =(req,res,next)=>{
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ errors: ["Access denied. No token provided."] });
  }

  try {
      const decodedData = jwt.verify(token,JWT_SECRET);
      req.influencer = decodedData; // Attach userId to request
      next();
  } catch (err) {
      res
        .status(400)
        .json({ message: "Some Error Occured", error: err.message });
    }
}

module.exports = {fetchBrand,fetchInfluencer};