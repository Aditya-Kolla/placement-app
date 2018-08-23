//SETUP
const LocalStrategy         = require("passport-local"),
  bodyParser                = require("body-parser"),
  passport                  = require('passport'),
  mongoose                  = require("mongoose"),
  express                   = require("express"),
  app                       = express();

const User  = require('./models/user'),
  Company   = require('./models/company');

//CONFIGURE APP
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost:27017/placement_app', { useNewUrlParser: true });

//PASSPORT SETUP
app.use(require('express-session')({
  secret: "THIS IS THE BIGGEST SECRET!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//ROUTES
//Direct Route
app.get("/", (req, res) => {
  res.render("index");
});

//COMPANY ROUTES
//INDEX ROUTE
app.get("/companies", isLoggedIn, (req, res) => {
  Company.find({}, (err, foundCompanies) => {
    if (err) {
      console.log(err);
    } else {
      res.render("companies/index", { companies: foundCompanies });
    }
  });
});

//NEW ROUTE
app.get("/companies/new", isLoggedIn, (req, res) => {
  res.render("companies/new");
});

//CREATE ROUTE
app.post("/companies", isLoggedIn, (req, res) => {
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
app.get("/companies/:id", isLoggedIn, (req, res) => {
  Company.findById(req.params.id, (err, foundCompany) => {
    if (err) {
      console.log(err);
    } else {
      res.render("companies/show", { company: foundCompany });
    }
  });
});

//EDIT ROUTE
app.get("/companies/:id/edit", isLoggedIn, (req, res) => {
  Company.findById(req.params.id, (err, foundCompany) => {
    if (err) {
      res.redirect("/companies");
    } else {
      res.render("companies/edit", { company: foundCompany });
    }
  });
});

//UPDATE ROUTE
app.put("/companies/:id", isLoggedIn, (req, res) => {
  Company.findByIdAndUpdate(req.params.id, req.body.company, (err, updatedBlog) => {
    if (err) {
      res.redirect("/");
    } else {
      res.redirect("/companies/" + req.params.id);
    }
  });
});

//DELETE ROUTE
app.delete("/companies/:id", isLoggedIn, (req, res) => {
  Company.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.redirect("/companies");
    } else {
      res.redirect("/companies");
    }
  });
});

//AUTH ROUTES
//get signup page
app.get("/signup", (req, res) => {
  res.render("signup");
});

//Handling signup logic
app.post("/signup", (req, res) => {
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if(err){
      console.log(err);
      return res.render("signup");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/companies");
    });
  });
});

//Get the login page
app.get("/login", (req, res) => {
  res.render("login");
});

//handling login logic
app.post("/login", passport.authenticate("local", {
  successRedirect: "/companies",
  failureRedirect: "/login"
}), (req, res) => {
});

//Handle logout logic
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//Wrong link
app.get("*", (req, res) => res.send("Sorry, page not found...What are you doing man?"));

//Start the server/ Listen to port
app.listen(3000, 'localhost', () =>{
    console.log("Server has started");
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}