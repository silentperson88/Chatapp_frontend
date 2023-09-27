import { combineReducers, configureStore } from "@reduxjs/toolkit";
import NotificationReducer from "redux/Slice/Notification";
import Groups from "redux/Slice/Groups";

export const rootReducer = combineReducers({
  Notification: NotificationReducer,
  group: Groups,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
