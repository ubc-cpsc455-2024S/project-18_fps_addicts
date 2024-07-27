var express = require('express');
var router = express.Router();
const { google } = require('googleapis');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const User = require('../models/User');
const Auth = require('../models/Auth');
const MongoStore = require("connect-mongo");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() =>
{
    console.log("mongoDB connection successful");
});

const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'session_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_CONNECTION_STRING,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none'
    }
};

router.use(session(sessionConfig));

// router.use((req, res, next) => {
//     console.log('Session:', req.session);
//     console.log('Session ID:', req.sessionID);
//     next();
// });

router.use(cors({
    origin: 'https://ubcstudyspotterclient.onrender.com', // Specify the frontend origin
    credentials: true // Allow credentials (cookies) to be sent
}));

// Set up OAuth 2.0 client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://study-spotter-google-auth.onrender.com/auth/google/callback'
);

router.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});

// Define routes
router.get('/auth/google', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
        prompt: 'select_account'
    });
    res.redirect( url );
});

router.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Store tokens in session
        req.session.tokens = tokens;
        console.log(req.sessionID);

        const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
        const { data } = await oauth2.userinfo.get();

        // Find or create user in the database
        let user = await User.findById( data.id );
        if (!user) {
            user = new User({
                _id: data.id,
                email: data.email,
                name: data.name,
                picture: data.picture
            });
            await user.save();
        }

        // Store session info in cookie
        const sessionId = req.sessionID;

        res.redirect(`https://ubcstudyspotterclient.onrender.com/profile?sessionId=${sessionID}`);
    } catch (error) {
        console.error('Error getting tokens:', error);
        res.redirect('https://ubcstudyspotterclient.onrender.com/profile');
    }


});

router.get('/auth/logout/:id', async (req, res, next) => {
    if (req.session) {
        // Destroy the session
        Auth.findByIdAndDelete( req.params.id ).then(r=>{
            //connect-mongo session successfully deleted
        }).catch(e=>{
            console.error('Error destroying session:', err);
            return res.status(500).json({message: 'Error logging out'});
        });

        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({message: 'Error logging out'});
            }

            // Clear the session cookie
            res.clearCookie('connect.sid'); // Adjust the cookie name if you're using a different one

            // Send a successful response
            res.status(200).json({message: 'Logged out successfully'});
        });
    } else {
        // If there's no session, just send a successful response
        res.status(200).json({message: 'Logged out successfully'});
    }
});

router.get('/api/user/:id', async (req, res) => {
    let auth = await Auth.findById( req.params.id );
    console.log(await Auth.find({}));

    if (!auth || !auth.session || !auth.session.tokens) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    oauth2Client.setCredentials(auth.session.tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });

    try {
        const { data } = await oauth2.userinfo.get();
        let user = await User.findById( data.id );
        res.json(user);
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ error: 'Failed to fetch user info' });
    }
});

module.exports = router;
