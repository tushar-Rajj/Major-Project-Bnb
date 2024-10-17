const User=require("../Models/user")

module.exports.renderSignupForm= (req, res) => {
    res.render("users/singup.ejs")
}

module.exports.signup=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        //  After Singup we will directly log in
        req.login(registerUser, (err) => {
            if (err) {
                return next();
            }
            req.flash("success", "Welcome To Wonderlust");
            res.redirect("/listings");
        });
        // req.flash("success","Welcome To Wonderlust");
        // res.redirect("/listings");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}


module.exports.renderLoginForm=(req, res) => {
    res.render("users/login.ejs")
}




module.exports.login= (req, res) => {
    req.flash("success", "Welcome to Wonderlust");

    // Use redirectUrl if it exists, otherwise default to "/listings"
    let redirectUrl = res.locals.redirectUrl || "/listings";

    // Clear the redirectUrl from the session after redirecting
    req.session.redirectUrl = null;

    // Redirect to the appropriate URL
    res.redirect(redirectUrl);
}

module.exports.Logout=(req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged Out ! ");
        res.redirect("/listings");
    })
}