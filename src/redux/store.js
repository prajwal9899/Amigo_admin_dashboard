import { configureStore } from '@reduxjs/toolkit'
import { alertSlice } from "./features/alertSlice";
import { userSlice } from "./features/userSlice";
import { allUsersSlice } from "./features/allUsersSlice";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    user: userSlice.reducer,
    allUsers: allUsersSlice.reducer
  },
});
