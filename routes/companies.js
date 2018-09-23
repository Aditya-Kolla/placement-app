const express   = require('express'),
    router      = express.Router(),
    Company     = require('../models/company'),
    middleware  = require('../middleware');

//COMPANY ROUTES
//INDEX ROUTE
router.get("/companies", middleware.isLoggedIn, (req, res) => {
    Company.find({}, (err, foundCompanies) => {
        if (err) {
            console.log(err);
        } else {
            res.render("companies/index", { companies: foundCompanies });
        }
    });
});

//NEW ROUTE
router.get("/companies/new", middleware.isLoggedIn, (req, res) => {
    res.render("companies/new");
});

//CREATE ROUTE
router.post("/companies", middleware.isLoggedIn, (req, res) => {
    Company.create(req.body.company, (err, createdBlog) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/companies");
        }
    });
});

//SHOW ROUTE
router.get("/companies/:id", middleware.isLoggedIn, (req, res) => {
    Company.findById(req.params.id, (err, foundCompany) => {
        if (err) {
            console.log(err);
        } else {
            res.render("companies/show", { company: foundCompany });
        }
    });
});

//EDIT ROUTE
router.get("/companies/:id/edit", middleware.isLoggedIn, (req, res) => {
    Company.findById(req.params.id, (err, foundCompany) => {
        if (err) {
            res.redirect("/companies");
        } else {
            res.render("companies/edit", { company: foundCompany });
        }
    });
});

//UPDATE ROUTE
router.put("/companies/:id", middleware.isLoggedIn, (req, res) => {
    Company.findByIdAndUpdate(req.params.id, req.body.company, (err, updatedBlog) => {
        if (err) {
            res.redirect("/");
        } else {
            res.redirect("/companies/" + req.params.id);
        }
    });
});

//DELETE ROUTE
router.delete("/companies/:id", middleware.isLoggedIn, (req, res) => {
    Company.findByIdAndRemove(req.params.id, err => {
        if (err) {
            res.redirect("/companies");
        } else {
            res.redirect("/companies");
        }
    });
});

module.exports = router;

