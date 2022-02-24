import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await axios.get("http://localhost:5000/users");
  return response.data;
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData) => {
    const response = await axios.post(
      "http://localhost:5000/users/register",
      userData
    );
    return response.data;
  }
);
export const loginUser = createAsyncThunk(
    "users/loginUser",
    async (userData) => {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        userData
      );
      let data = await response.json()
      console.log("data", data)
      return response.data;
    }
  );
const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    status: null,
    error: "",
  },
  extraReducers: {
    [createUser.fulfilled]: (state, action) => {
      state.list.push(action.payload);
      state.state = "success";
    },
    [createUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = "Add Errorr";
    },
    [getUsers.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = "Fetch error";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.state = "success";
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.error = "Login failed";
    },
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
  },
});

export default usersSlice.reducer;
