
var middlewareObj = {};

middlewareObj.isLoggedIn =  (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

middlewareObj.isAdming = (req, res, next) => {
    if (req.isAuthenticated()){
        
    }
    res.redirect("/login");
}

module.exports = middlewareObj;