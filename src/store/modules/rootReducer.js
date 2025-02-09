import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/reducer";
import loadingReducer from "./loading/reducer";

export default combineReducers({
  auth: authReducer,
  loading: loadingReducer,
});