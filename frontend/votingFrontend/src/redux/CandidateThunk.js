import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getCandidate = createAsyncThunk('getCandidate', async () => {
  let response = await axios.get('http://localhost:4001/candidate/api/v1/candidates', {
    headers: { 'Content-type': 'application/json' },
  });

  if (response.status === 200) {
    // console.log(response.status)
    return response.data;
  } else {
    throw new Error('Failed to fetch candidates');
  }
});

export default getCandidate;
