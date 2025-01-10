require('dotenv').config();
const { google } = require('googleapis');
const crypto = require('crypto');
const session = require('express-session');
const {Router}=require('express');

const app = Router();
// Replace with your credentials
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const FRONTENDURL=process.env.FRONTENDURL;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

// Use session middleware to store state and credentials
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Define scopes
const scopes = [
  'https://www.googleapis.com/auth/youtube.force-ssl',
];

// Endpoint to start the OAuth flow
app.get('/login', (req, res) => {
  // Generate a secure random state value
  const state = crypto.randomBytes(32).toString('hex');
  req.session.state = state;

  // Generate the auth URL
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
    state: state,
  });

  res.redirect(authorizationUrl);
});

// OAuth2 callback endpoint
app.get('/oauth2callback', async (req, res) => {
  const { code, state } = req.query;
  // Validate state to protect against CSRF attacks
  if (state !== req.session.state) {
    return res.status(400).send('Invalid state parameter');
  }

  try {
    // Exchange the authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    return res.redirect(`${FRONTENDURL}/playlist?youtubeaccess_token=${tokens.access_token}`);

  } catch (error) {
    console.error('Error during token exchange:', error);
    res.status(500).send('Authentication failed');
  }
});


app.post('/transferplaylist',async (req,res)=>{
  const {spotifytoken,youtubetoken,playlists}=req.body;
  oauth2Client.setCredentials({access_token:youtubetoken});

  const transferResults = await transferPlaylists(playlists,spotifytoken);

  return res.json({data:transferResults});
});


const transferPlaylists = async (playlists, spotifyToken) => {
  const results = [];

  for (const playlist of playlists) {
    try {
      // Fetch tracks from Spotify
      const tracks = await fetchSpotifyPlaylistTracks(playlist.id, spotifyToken);
      
      // Create a YouTube playlist
      const youtubePlaylistId = await createYouTubePlaylist(playlist.name);
      
      const failedTracks = [];
      
      // Add each track to the YouTube playlist
      for (const track of tracks) {
        try {
          const query = `${track.name} ${track.artist}`;
          const videoId = await searchYouTubeVideo(query);
          if (videoId) {
            await addToYouTubePlaylist(youtubePlaylistId, videoId);
          } else {
            failedTracks.push({
              name: track.name,
              artist: track.artist,
              reason: 'No matching video found'
            });
          }
        } catch (error) {
          failedTracks.push({
            name: track.name,
            artist: track.artist,
            reason: error.message || 'Failed to add to YouTube playlist'
          });
        }
      }

      results.push({ 
        playlist: playlist.name, 
        status: failedTracks.length === 0 ? 'success' : 
        (failedTracks.length === tracks.length ? 'failure' : 'partial'),
        successCount: tracks.length - failedTracks.length,
        totalTracks: tracks.length,
        failedTracks: failedTracks
      });
    } catch (error) {
      results.push({ 
        playlist: playlist.name, 
        status: 'failure',
        error: error.message,
        failedTracks: [] // Empty since we couldn't even start the transfer
      });
    }
  }

  return results;
};

const fetchSpotifyPlaylistTracks = async (playlistId, accessToken) => {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!response.ok) throw new Error('Failed to fetch Spotify playlist tracks');

  const data = await response.json();
  return data.items.map(item => ({
    name: item.track.name,
    artist: item.track.artists.map(artist => artist.name).join(', '),
  }));
};

const createYouTubePlaylist = async (title) => {
  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
  const response = await youtube.playlists.insert({
    part: 'snippet,status',
    requestBody: {
      snippet: {
        title, // Playlist title
        description: 'Created by Spotify to YouTube transfer', // Optional description
      },
      status: {
        privacyStatus: 'private', // or 'public'/'unlisted'
      },
    },
  });
  return response.data.id;
};

const addToYouTubePlaylist = async (playlistId, videoId) => {
  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
  await youtube.playlistItems.insert({
    part: 'snippet',
    requestBody: {
      snippet: {
        playlistId,
        resourceId: {
          kind: 'youtube#video',
          videoId,
        },
      },
    },
  });
};

const searchYouTubeVideo = async (query) => {
  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
  const response = await youtube.search.list({
    part: 'snippet',
    q: query, // The query to search for
    type: 'video',
    maxResults: 1, // Limit results to the first match
  });

  if (response.data.items.length > 0) {
    return response.data.items[0].id.videoId; // Return the videoId of the first result
  }
  return null; // No video found
};




module.exports=app;