const sampleData = require("./data");
const mongoose = require("mongoose");
const Listing = require("../models/listing");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("Some error has occured", err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

console.log(sampleData.data);
let initDB = async () => {
   await Listing.deleteMany({});
   sampleData.data = sampleData.data.map((obj) => ({ ...obj, owner: "68ce9b7225bfee1a1d60bd67" }));
   await Listing.insertMany(sampleData.data);
    console.log("data was initialized");
}

initDB();