
# Playlist Transfer

**Playlist Transfer** is a web application that allows users to transfer their playlists from Spotify to YouTube. With an intuitive flow and seamless integration, the app simplifies playlist migration between these two popular platforms.

## Features

- **Spotify to YouTube Migration**: Transfer playlists effortlessly.
- **OAuth2 Authentication**: Secure login via Spotify and YouTube.
- **Dynamic State Management**: Powered by Redux and Redux Toolkit.
- **User-Friendly Interface**: Responsive and intuitive design.

## Technologies Used

- **Frontend**:
  - React.js
  - Redux & Redux Toolkit
- **Backend**:
  - Node.js
  - Express
- **APIs**:
  - Spotify Web API (OAuth2)
  - YouTube Data API v3 (OAuth2)

## Flow of the Application

1. **Spotify Login**:  
   Users log in with their Spotify account via OAuth2. This grants the app access to the user's playlists using Spotify's API.

2. **Playlist Selection**:  
   The user selects which playlists they want to transfer.

3. **YouTube Login**:  
   The app prompts the user to log in with their YouTube account via OAuth2, allowing access to the YouTube Data API v3.

4. **Playlist Creation**:  
   The selected playlists are recreated in the user's YouTube account.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Abhinav-1v/Playlist_Transfer.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd Playlist_Transfer
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   YOUTUBE_API_KEY=your_youtube_api_key
   REDIRECT_URI=your_redirect_uri
   ```

5. **Start the Application**:
   ```bash
   npm start
   ```

## Usage

1. Access the app on `http://localhost:3000`.
2. Log in with your Spotify account to fetch playlists.
3. Select playlists for transfer.
4. Log in with your YouTube account.
5. Confirm the transfer, and your playlists will be created on YouTube.

## Deployment

Access the deployed application [here](https://your-deployed-app-link.com).  
The deployed code is available on [GitHub](https://github.com/Abhinav-1v/Playlist_Transfer_Deployment).

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push the branch:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. Open a Pull Request.

## Contact

- **Author**: Abhinav
- **GitHub**: [@Abhinav-1v](https://github.com/Abhinav-1v)
- **Email**: [abhinavverma@outlook.in](mailto:abhinavverma@outlook.in)
