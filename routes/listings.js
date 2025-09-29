if(process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const express = require("express");
const router = express.Router({ caseSensitive: true, strict: true });
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isAuth, validateListing } = require("../middleware");
const listingController = require("../controllers/listingsController");
const multer  = require('multer');
const { storage } = require("../cloudConfig");
const upload = multer({ storage });


router.get("/", wrapAsync(listingController.renderFilterListing))
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
  )


router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isAuth,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isAuth,
    wrapAsync(listingController.destroyListing)
  );

// Edit Form
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuth,
  wrapAsync(listingController.renderEditForm)
);
module.exports = router;
