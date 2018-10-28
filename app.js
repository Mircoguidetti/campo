const express = require("express"),
      app = express(),
			mongoose = require("mongoose"),
      bodyParser = require("body-parser"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      methodOverride = require("method-override"),
      Campground = require("./models/campground"),
      Comment	= require("./models/comment"),
      User = require("./models/user"),
      seeds	= require("./seeds"),
      flash	= require("connect-flash");


// requiring routes
const campgroundsRoutes	 = require("./routes/campgrounds"),
      commentsRoutes = require("./routes/comments"),
      indexRoutes = require("./routes/index")

const url = process.env.DATABASEURL || "mongodb://localhost/campo";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seeds();

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "pam is the cutest cat in the world",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments",commentsRoutes);
app.use(indexRoutes);


//RUN THE SERVER
app.listen(process.env.PORT || 3000, () => {
  console.log(process.env.DATABASEURL)
  console.log(process.env.PORT)
  console.log("The YelpCamp Server Has Started");
});
