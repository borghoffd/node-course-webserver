const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

let app = express();

// Register HBS Partials
hbs.registerPartials(__dirname+"/views/partials");

// Use View Engine HBS
app.set("view engine","hbs");
// Express Middleware
// Log requests to server
app.use((req,res, next) => {
    let now = new Date().toString();
    let log = `${now}:${req.method} ${req.url}`;
    fs.appendFile("server.log", log + "\n" , (err)=> {
        if(err) {
            console.log("Unable to append to server.log");
        }
    });
    next();
});
// Maintenance mode
/*app.use((req,res,next) => {
    res.render("maintenance.hbs");
});*/
// Serves up directory
app.use(express.static(__dirname+"/public"));

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});
hbs.registerHelper("screamIt",(text) => {
    return text.toUpperCase();
});

app.get("/",(req, res) => {
    res.render("home.hbs",{
        pageTitle: "Home",
        welcomeMessage: "Whatever you like"
    });
});

app.get("/about",(req,res) => {
    res.render("about.hbs", {
        pageTitle: "About Page"
    });
});

app.get("/projects",(req,res) => {
    res.render("projects.hbs", {
        pageTitle: "Projects Page"
    });
});

app.get("/bad",(req,res) => {
    res.send({
        errorMessage:"Unable to handle request"
    });
});

app.listen(3000, () => {
    console.log("Server is up in port 3000");
});
