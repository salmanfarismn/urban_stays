const Listing = require("../models/listing");
const axios = require("axios");

module.exports.index = async (req, res) => {
    let listings = await Listing.find({});
    res.render("./listings/index", { listings });
}

module.exports.renderNewForm = (req, res) => {
    res.render("./listings/new");
}

module.exports.renderFilterListing = async(req, res) => {
    let { q } = req.query;
    let listings;
    if(q) {
        listings = await Listing.find({ category: q });
    } else {
        listings = await Listing.find({});
    }
    res.render("./listings/index", { listings, currentCategory: q });
}

module.exports.showListing = async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        }).populate("owner");
    if(!listing) {
        req.flash("error", "The listing you requested doesn't exists!");
        return res.redirect("/listings");
    }
    res.render("./listings/show", { listing });
}

module.exports.createListing = async (req, res, next) => {
    const listing = new Listing(req.body.listing);
    let url= req.file.path; 
    let filename = req.file.filename;
    listing.owner = req.user._id;
    listing.image = { url, filename };

    let getLocation = `${listing.location} ${listing.country}`;
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
            q: getLocation,
            format: 'json',
            limit: 1
        },
        headers: {
            "User-Agent": "16_aribnb_clone_project (frz.salxx@email.com)" // required
        }
    });

    if(response.data.length > 0) {
        const { lat, lon } = response.data[0];
        listing.geometry = {
            type: "Point",
            coordinates: [lon, lat]
        };
    }
    await listing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "The listing you requested doesn't exists!");
        return res.redirect("/listings");
    }

    let originalImage = listing.image.url;
    originalImage = originalImage.replace("/upload", "/upload/h_300,w_250,q_auto") 

    res.render("./listings/edit", { listing, originalImage });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file !== "undefined") {
        let url= req.file.path; 
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "New Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}