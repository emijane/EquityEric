const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { rmSync } = require('fs');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
// Importing bcrypt for password hashing and all that

const sequelize = new Sequelize('askeric', 'root', 'root')
app.use(cors());
app.use(express.json());
const db = require("./models");

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
       console.log("Server is now running on port 3001") 
    })
})
// No need to worry about serving the actual React, since Vercel takes care of that :)



app.post('/api/login', async function (req, res) {
    const {email, pwd} = req.body;
    // Get the email and the password and stuff
    if (!email || !pwd) return res.status(400).json({message: "Please provide both email and password"});
    // Check database for duplicates in sql 🤮🤮
    db.query(
        "SELECT * FROM users WHERE username = ? and PASSWORD = ?",
        [email, pwd],
        (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).json({message: "There was an error! see Error Object included for more details", err});
            } else if (result) {
                res.status(200).json({result}) // Login was successful so no error :)
            } else {
                res.status(403).json({message: "Wrong username and password combination!"})
            }
            
        }
    )
})
/**
 * @route api/register should create a user row with the following schema
 * email
 * password,
 * location,
 */
app.post('/api/register', async function (req, res) {
    const {email, pwd, firstName, lastName} = req.body;
    // Getting email, password, first name, last name
    // location is another thing but I'm not sure how to provide it
    const location = "N/A";
    // Hashing password for user privacy
    const hashedPwd = await bcrypt.hash(pwd,10);
    // INSHALLAH userID created from email seed is unique nevermind cant use seed
    const userID = nanoid();

})
app.post('/api/refresh', function (req, res) {

  });
