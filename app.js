//SETUP
const express = require("express"),
  app = express();

app.set("view engine", "ejs");

//ROUTES
//Direct Route
app.get("/", (req, res) => {
  res.render("home");
});

app.post("/login", (req, res) => {

});

//Wrong link
app.get("*", (req, res) => res.send("Sorry, page not found...What are you doing man?"));

//Start the server/ Listen to port
app.listen(3000, 'localhost', () =>{
    console.log("Server has started");
});
