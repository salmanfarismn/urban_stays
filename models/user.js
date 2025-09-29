const Review = require("../models/reviews");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Listing = require("./listing");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
});

userSchema.post("findOneAndDelete", async(user) => {
    if(user) {
        await Review.deleteMany({ author: user._id });
        await Listing.deleteMany({ owner: user._id})
    }
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);