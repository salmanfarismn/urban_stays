const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews");
const User = require("./user");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        type: {
        type: String,          // always "Point"
        enum: ["Point"],       // must be Point
        required: false        // set true if you want to force every listing to have coordinates
        },
        coordinates: {
        type: [Number],        // array of numbers
        required: false        // [longitude, latitude]
        }
    },
    category: {
        type: String,
        enum: ["trending", "rooms", "cities", "pools", , "mountains", "castles", "camping", "farms", "arctic", "beach", "surfing"],
    }
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;