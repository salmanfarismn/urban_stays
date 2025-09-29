const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isReviewAuth } = require("../middleware");
const reviewController = require("../controllers/reviewController");

// CREATE REVIEW ROUTE
router.post("/", isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview));

// DELETE REVIEW
router.delete("/:reviewId", 
    isLoggedIn,
    isReviewAuth,
    wrapAsync(reviewController.destroyReview));

module.exports = router;