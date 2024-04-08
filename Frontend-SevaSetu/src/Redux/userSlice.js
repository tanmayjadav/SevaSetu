import { createSlice } from "@reduxjs/toolkit";

// const {userId} = localStorage.getItem('userId')
const initialState = {
  userId:null
  // accessToken: "",
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserLocalStorage: (state, action) => {
      const userId  = action.payload;
      // console.log(action.payload)
      console.log(userId)
      localStorage.setItem("userId", JSON.stringify({ userId }));
      // localStorage.setItem("token", JSON.stringify({ token }));
      state.userId = userId;
      // state.accessToken = token;
    },
    deleteUserLocalStorage: (state) => {
      localStorage.removeItem("userId");
      // localStorage.removeItem("token");
      state.userId = null;
      // state.accessToken = "";
    },
    updateUserLocalStorage: (state, action) => {
      const userId = action.payload;
      localStorage.setItem("userId", JSON.stringify({ userId }));
      state.userId = { ...state.userId, userId };
    },
    updateUserProfileToLocalStorage: (state, action) => {
      const profilePicture = action.payload;
      const dataFromLocalStorage = JSON.parse(localStorage.getItem("userId"));
      console.log(dataFromLocalStorage);
      const updatedData = { ...dataFromLocalStorage.userId, profilePicture };
      console.log(updatedData);
      localStorage.setItem("userId", JSON.stringify(updatedData));
      state.userId = updatedData;
    },
  },
});

export const {
  setUserLocalStorage,
  deleteUserLocalStorage,
  updateUserLocalStorage,
  updateUserProfileToLocalStorage,
} = userSlice.actions;

export default userSlice.reducer;