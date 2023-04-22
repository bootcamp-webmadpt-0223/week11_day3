// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app)

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "ironlauncher-app";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
const bookRoutes = require("./routes/books.routes"); 
const authRoutes = require("./routes/auth.routes")
const droneRoutes = require("./routes/drones.routes"); 
app.use("/", indexRoutes);
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);
app.use("/drones", droneRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
