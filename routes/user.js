const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/userController");

router.get("/signup", userController.renderSignUpForm);

router.post("/", wrapAsync(userController.signup));

router.route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate('local', { 
            failureRedirect: '/user/login', 
            failureFlash: true
        }),
    userController.login
    );

router.get("/logout", userController.logout);

router.get("/:id/account", wrapAsync(userController.renderAccountPage));

router.delete("/:id", wrapAsync(userController.destroyAccount));

// delta-student, student@gmail.com, hello

module.exports = router;