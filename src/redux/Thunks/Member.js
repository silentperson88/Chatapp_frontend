/* eslint-disable */
import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "redux/ApiService/ApiService";
import Sessions from "utils/Sessions";

const getAllGroupsOfMember = createAsyncThunk("member/group", async () => {
  const res = await ApiService.get(`member`, {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  })
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export const getAllMemberOfGroups = createAsyncThunk("group/member", async (groupId) => {
  const res = await ApiService.get(`member/${groupId}`, {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  })
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export const createGroups = createAsyncThunk("group-create", async (data) => {
  const res = await ApiService.post(`group`, data, {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  })
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export const removeMemberFromGroup = createAsyncThunk("remove/member", async (data) => {
  const res = await ApiService.delete(`group/${data.groupId}/members/${data.memberId}`, {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  })
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export const addMemberInGroup = createAsyncThunk("add/member", async (data) => {
  const res = await ApiService.post(
    `group/${data.groupId}/members`,
    { ...data.body },
    {
      headers: { Authorization: `Bearer ${Sessions.userToken}` },
    }
  )
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export default getAllGroupsOfMember;
