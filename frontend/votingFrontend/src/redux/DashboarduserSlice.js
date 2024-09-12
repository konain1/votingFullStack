
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    User : null
}

const UserSlice = createSlice({

    name:'User',
    initialState,
    reducers:{
        loginUser : (state,action)=>{
            state.User = action.payload
        }
    }
})

export const {loginUser}  = UserSlice.actions
export default UserSlice.reducer