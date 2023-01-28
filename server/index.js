const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { rmSync } = require('fs');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
// Importing bcrypt for password hashing and all that

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'LoginSystem',
})
db.connect(function(err) {
    console.log("If this works, my DB is connected");
  });
// No need to worry about serving the actual React, since Vercel takes care of that :)
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

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
 * userID
 * health-insurance-plan-details  (WTF????)
 * 
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
    // Full honesty I have no Idea how to implement insurance stuff so I'm gonna leave that for later
    if (!email || !pwd || !firstName || !lastName)
        return res.status(400).json({message: "Please provide all 4 fields: First Name, Last Name, Email, and Password"})
    db.query(
        "INSERT INTO users (email, password, user-id, first-name, last-name) VALUES (?, ?, ?, ?, ?)",
        [email, hashedPwd, userID, firstName, lastName],
        (err, result) => {
            // I hate SQL so much especially this half-baked MySQL I'm writing I wish this was PostGre
            (err, result) => {
                if (err)
                    res.status(400).json({message: "Something went wrong. Ensure your input is valid"});
                if (result) {
                    res.status(200).json({message: "Account Successfully created! Now try logging in."})
                }
            }
        }
    )
})
app.post('/api/refresh', function (req, res) {

  });
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('send_message', (data) => {
        socket.broadcast.emit('receive_message', data);
    }) 
});

server.listen(3001, () => {
    console.log('FABULOSOOOO');
})