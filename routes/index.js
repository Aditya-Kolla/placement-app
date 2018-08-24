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
    let newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/companies");
        });
    });
});

//Get the login page
router.get("/login", (req, res) => {
    res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/companies",
    failureRedirect: "/login"
}), (req, res) => {
});

//Handle logout logic
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

//Wrong link
router.get("*", (req, res) => res.send("Sorry, page not found...What are you doing man?"));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;

