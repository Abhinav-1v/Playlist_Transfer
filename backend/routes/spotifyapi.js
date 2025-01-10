require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const {Router}=require('express');

const app = Router();
app.use(bodyParser.json());

const SPOTIFY_CLIENT_ID=process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET=process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI=process.env.SPOTIFY_REDIRECT_URI;
const FRONTENDURL=process.env.FRONTENDURL;


// Step 1: Redirect the user to Spotify's authorization page
app.get("/login", (req, res) => {
  const scopes = encodeURIComponent("playlist-read-private playlist-read-collaborative");
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`;
  res.redirect(authUrl);
});

// Step 2: Handle the callback from Spotify and exchange the authorization code for an access token
app.get("/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("No authorization code provided.");
  }

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    const { access_token, refresh_token } = tokenResponse.data;

    return res.redirect(`${FRONTENDURL}/playlist?spotifyaccess_token=${access_token}`);
  } catch (error) {
    console.error("Error exchanging code for token:", error.response?.data || error.message);
    res.status(500).send("Failed to retrieve access token.");
  }
});

module.exports=app;
