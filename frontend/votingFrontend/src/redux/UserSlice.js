
import { createSlice } from "@reduxjs/toolkit";
import GetUser from "./UsersThunk";
const initialState ={
    users:[],
    loading:false,
    error :null
}

const UserSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(GetUser.pending , (state)=>{
            state.loading =true,
            state.error = null
        })
        builder.addCase(GetUser.fulfilled , (state,action)=>{
            state.users = action.payload;
            state.loading = false
        })
        builder.addCase(GetUser.rejected , (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        })
    }
})

export default UserSlice.reducer