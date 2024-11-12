import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null
}

const AuthSlice = createSlice({
    name:'Auth',
    initialState,
    reducers:{
        SetUser:(state,action)=>{
            state.user=action.payload;
        },
        ClearUser:(state,action)=>{
            state.user=null
        }
    }
})

export const {SetUser,ClearUser} = AuthSlice.actions;
export default AuthSlice.reducer;