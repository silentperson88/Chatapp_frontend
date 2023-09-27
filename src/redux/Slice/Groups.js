import { createSlice } from "@reduxjs/toolkit";
import { resetStateThunk } from "redux/Thunks/Authentication";
import GetAllGroups from "redux/Thunks/Member";

const initialState = {
  loading: "idle",
  groupList: [],
};

export const GroupSlice = createSlice({
  name: "Group",
  initialState,
  reducers: {},

  extraReducers: {
    [GetAllGroups.pending]: (state) => {
      state.loading = "pending";
    },
    [GetAllGroups.fulfilled]: (state, { payload }) => {
      state.loading = "fullfilled";
      state.groupList = payload.data.data;
    },
    [GetAllGroups.rejected]: (state) => {
      state.loading = "rejected";
    },
    [resetStateThunk.fulfilled]: (state) => {
      state.loading = "idle";
      state.groupList = [];
    },
  },
});

export default GroupSlice.reducer;
