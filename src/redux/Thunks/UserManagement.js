/* eslint-disable */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Sessions from "utils/Sessions";
import ApiService from "../ApiService/ApiService";

const getAllUsers = createAsyncThunk("mobile-users-listing/api", async () => {
  const res = await ApiService.get(`user`, {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  })
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export const CreateNewUser = createAsyncThunk("user/create", async (body) => {
  const res = await ApiService.post(
    `user`,
    { ...body },
    {
      headers: { Authorization: `Bearer ${Sessions.userToken}` },
    }
  )
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export default getAllUsers;
