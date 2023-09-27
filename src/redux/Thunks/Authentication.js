/* eslint-disable */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Sessions from "utils/Sessions";
import ApiService from "redux/ApiService/ApiService";

export const loginThunk = createAsyncThunk("login/api", async (body) => {
  const res = await ApiService.post("user/login", {
    ...body,
  })
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

const logoutThunk = createAsyncThunk("logout/api", async () => {
  const res = await ApiService.get("admins/logout", {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  });
  return res.data;
});

// create dummy thunk for reseting all state
export const resetStateThunk = createAsyncThunk("reset-state/api", async () => "reset");

export default logoutThunk;
