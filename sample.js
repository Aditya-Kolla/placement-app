//SETUP
const express = require("express");
const app = express();

//ROUTES
//Direct Route
app.get("/", (req, res) => res.send("Hi There, Welcome to my assignment!"));

//Route params
app.get("/speak/:animal", (req, res) => {
   let sounds = {
       dog: "Woof Woof!",
       pig: "Oink",
       cat: "MeoW",
       cow: "Moo",
       bear: "gimme honey"
   }
   let animal = req.params.animal.toLowerCase();
   let sound = sounds[animal];
   res.render("animals.ejs", {animal: animal, sound: sound});
});

app.get("/repeat/:word/:number", (req, res) => {
    let str = req.params.word + " ";
    let num = Number(req.params.number);
    res.send(str.repeat(num));
});

app.get("*", (req, res) => res.send("Sorry, page not found...What are you doing man?"));

//Start the server/ Listen to port
app.listen(3000, 'localhost', () =>{
    console.log("Server has started");
});
