const express   = require('express'),
    router      = express.Router(),
    passport    = require('passport'),
    User        = require('../models/user');

//Direct Route
router.get("/", (req, res) => {
    res.render("index");
});

//AUTH ROUTES
//get signup page
router.get("/signup", (req, res) => {
    res.render("signup");
});

//Handling signup logic
router.post("/signup", (req, res) => {
    let newUser = new User({ username: req.body.username , name:req.body.name});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/profile");
        });
    });
});

//Get the login page
router.get("/login", (req, res) => {
    res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login"
}), (req, res) => {
});

//Handle logout logic
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

//User profile routes
router.get("/profile", (req, res) => {
    res.render("profile");
});

//Wrong link
router.get("*", (req, res) => res.send("Sorry, page not found...What are you doing man?"));



module.exports = router;

