//SETUP
const LocalStrategy         = require("passport-local"),
  methodOverride            = require('method-override'),
  bodyParser                = require("body-parser"),
  passport                  = require('passport'),
  mongoose                  = require("mongoose"),
  express                   = require("express"),
  app                       = express();

//Mongoose model exports
const User  = require('./models/user'),
  Company   = require('./models/company');

//Routes exports
const companyRoutes = require('./routes/companies'),
  indexRoutes       = require('./routes/index');

//CONFIGURE APP
mongoose.connect('mongodb://localhost:27017/placement_app', { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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


app.use(companyRoutes);
app.use(indexRoutes);


//Start the server/ Listen to port
app.listen(3000, 'localhost', () =>{
    console.log("Server has started");
});


