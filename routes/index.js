const express   = require('express'),
    router      = express.Router(),
    passport    = require('passport'),
    middleware = require('../middleware');
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
            res.redirect("/profile/edit");
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
router.get("/logout", middleware.isLoggedIn, (req, res) => {
    req.logout();
    res.redirect("/");
});

//User profile routes
router.get("/profile", middleware.isLoggedIn, (req, res) => {
    res.render("users/profile");
});

//Edit profile - get edit page
router.get("/profile/edit", middleware.isLoggedIn,(req, res) => {
    res.render("users/edit");
});

//Edit profile - put request
router.put("/profile", middleware.isLoggedIn,(req, res) => {
    User.findByIdAndUpdate(req.user.id, req.body.user, (err, updatedUser) => {
        if(err){
            res.redirect("/profile");
        } else {
            res.redirect("/profile");
        }
    })
});

//Wrong link
router.get("*", (req, res) => res.send("Sorry, page not found...What are you doing man?"));



module.exports = router;

