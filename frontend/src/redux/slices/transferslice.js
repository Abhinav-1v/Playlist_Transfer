import {createSlice} from '@reduxjs/toolkit';


const transferslice=createSlice({
    name:'transferedata',
    initialState:[],
    reducers:{
        updatetransferdata:(state,action)=>{
            return action.payload;
        }
    }
});

export const {updatetransferdata} =transferslice.actions;

export default transferslice.reducer;

