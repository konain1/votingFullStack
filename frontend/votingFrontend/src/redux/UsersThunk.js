

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GetUser = createAsyncThunk('getuser',async()=>{

    let response = await axios.get('http://localhost:4001/api/v1/users',{
        headers: { 'Content-type': 'application/json' },
    })

    if (response.status === 200) {
        // console.log(response.status)
        return response.data;
      } else {
        throw new Error('Failed to fetch userThuk');
      }
})

export default GetUser