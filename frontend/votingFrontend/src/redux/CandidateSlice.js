import { createSlice } from "@reduxjs/toolkit";
import getCandidate from "./CandidateThunk";

const initialState = {
  candidates: [],
  loading: false,
  error: null,
};

const candidateSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCandidate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCandidate.fulfilled, (state, action) => {
        state.candidates = action.payload;
        state.loading = false;
      })
      .addCase(getCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default candidateSlice.reducer;
