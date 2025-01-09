import {createSlice} from '@reduxjs/toolkit';


const playlistslice=createSlice({
    name:'Playlists',
    initialState:[],
    reducers:{
        updateplaylist:(state,action)=>{
            return action.payload;
        },
    },
});

export const {updateplaylist} =playlistslice.actions;

export default playlistslice.reducer;