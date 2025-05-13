const express = require('express');
const app = express();
const main = require('./database');
const port = 3000;
const brandRoutes = require("./routes/brand");
const influencerRoutes = require("./routes/influencer");
const cors = require("cors");
const path = require("path");
require('dotenv').config();


app.use(cors());
app.use(express.json()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
main();


app.use("/api/brand",brandRoutes);
app.use("/api/influencer",influencerRoutes);

app.listen(port, () => {
  console.log(`Collably is running on port ${port}`)
})