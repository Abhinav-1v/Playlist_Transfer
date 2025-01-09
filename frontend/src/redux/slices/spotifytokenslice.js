import {createSlice} from '@reduxjs/toolkit';


const sptokenslice =createSlice({
    name:'spotifytoken',
    initialState:null,
    reducers:{
        newspotifytoken:(state,action)=>{
            return action.payload
        }
    }
})

export const {newspotifytoken} =sptokenslice.actions;

export default sptokenslice.reducer;