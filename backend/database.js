const mongoose = require('mongoose');
async function main() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");
    }catch(err){
        console.log(err);
    }

}

module.exports = main;