require("dotenv").config()

// ========== DEPENDENCIES ==========

const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection


// ========== PORT ==========

// allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000


// ========== DATABASE ==========

// how to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI

// connect to Mongo &
// fix Depreciation Warnings from Mongoose
// may or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true })

// error / success
db.on("error", (err) => console.log(err.message + " is mongod not running?"))
db.on("connected", () => console.log("mongod connected: "))
db.on("disconnected", () => console.log("mongod disconnected"))


// ========= MIDDLEWARE ==========

// use public folder for static assets
app.use(express.static("public"))

// populates req.body with parsed info from forms - if not data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false })) // extended: false - does not allow nested objects in query strings
app.use(express.json()) // returns middleware that only parses JSON - may or may not need it depending on your project

// use method override
app.use(methodOverride('_method')) // allow POST, PUT and DELETE from a form


// ========= ROUTES ==========

// localhost:3000
app.get("/", (req, res) => {
    res.send("Hello World!")
})


// ========== LISTENER ==========

app.listen(PORT, () => {
    console.log(`express is listening on port: ${PORT}`)
})