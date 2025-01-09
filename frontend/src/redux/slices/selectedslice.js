// selectedPlaylistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const selectedPlaylistSlice = createSlice({
  name: 'selectedPlaylists',
  initialState: [], // Initialize the selected playlists as an empty array
  reducers: {
    addSelectedPlaylist: (state, action) => {
      // Adds the playlist object to the array
      state.push(action.payload);
    },
    removeSelectedPlaylist: (state, action) => {
      // Removes the playlist object from the array by filtering it out
      return state.filter(playlist => playlist.id !== action.payload.id); // Assuming the payload contains an 'id' field to identify the playlist
    },
  },
});

export const { addSelectedPlaylist, removeSelectedPlaylist } = selectedPlaylistSlice.actions;

export default selectedPlaylistSlice.reducer;
