const User = require("../models/user");

module.exports.renderSignUpForm = (req, res) => {
    res.render("./listings/signup");
}

module.exports.signup = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust!");
            return res.redirect("/listings")
        });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("./listings/login");
}

module.exports.login = async(req, res) => {
        req.flash("success", "login successful!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "logged you out!");
        res.redirect("/listings");
    });
}

module.exports.renderAccountPage = async(req, res) => {
    let { id } = req.user;
    const user = await User.findById(id);
    if(!user) {
        req.flash("error", "User not found!");
        return res.redirect("/user/login");
    }
    res.render("./listings/account", {user});
}

module.exports.destroyAccount = async(req, res) => {
    let { id } = req.user;
    const user = await User.findByIdAndDelete(id);
    console.log(user);
    req.flash("success", "User account is deleted!");
    res.redirect("/listings");
}