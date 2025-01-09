import {createSlice} from '@reduxjs/toolkit';

const yttokenslice=createSlice({
    name:'yttoken',
    initialState:null,
    reducers:{
        newyttoken:(state,action)=>{
            return action.payload;
        }
    }
});

export const {newyttoken}=yttokenslice.actions;

export default yttokenslice.reducer;