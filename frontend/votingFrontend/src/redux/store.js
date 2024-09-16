import { configureStore } from "@reduxjs/toolkit";
import CandidateReducer from "./CandidateSlice";
import DashuserReducer from './DashboarduserSlice';
import UserReducer from './UserSlice'
const store = configureStore({
  reducer: {
    UserStore: DashuserReducer,
    CandidateStore: CandidateReducer,
    UsersStore:UserReducer
  },
});

export default store;
