import { configureStore } from "@reduxjs/toolkit";
import CandidateReducer from "./CandidateSlice";
import DashuserReducer from './DashboarduserSlice';

const store = configureStore({
  reducer: {
    UserStore: DashuserReducer,
    CandidateStore: CandidateReducer,
  },
});

export default store;
