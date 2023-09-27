/* eslint-disable */
import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "redux/ApiService/ApiService";
import Sessions from "utils/Sessions";

const createGroups = createAsyncThunk("member", async () => {
  const res = await ApiService.get(`member`, {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  })
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export const getMessageOfGroup = createAsyncThunk("group/message", async (groupId) => {
  const res = await ApiService.get(`group/${groupId}/chat`, {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  })
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export const snedMessages = createAsyncThunk("group/message/send", async (data) => {
  const res = await ApiService.post(
    `group/${data.groupId}/chat`,
    { ...data.body },
    {
      headers: { Authorization: `Bearer ${Sessions.userToken}` },
    }
  )
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export const likeMessages = createAsyncThunk("group/message/like", async (data) => {
  const res = await ApiService.post(
    `group/${data.groupId}/chat/${data.messageId}/like`,
    {},
    {
      headers: { Authorization: `Bearer ${Sessions.userToken}` },
    }
  )
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export default createGroups;
