import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const logout = createAsyncThunk("auth/logout", (payload, thunkAPI) => {
  signOut(auth).catch((err) => {
    Alert.alert("Error", err.message);
  });
});

export const login = createAsyncThunk("auth/login", (payload, thunkAPI) => {
  const { email, password } = payload;

  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const data = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      };

      return data;
    })
    .catch((err) => {
      const errCode = err.code;
      const errMessage = err.message;
      Alert.alert("Error", errMessage);
    });
});

export const register = createAsyncThunk(
  "auth/register",
  (payload, thunkAPI) => {
    const { email, password, setIsLogin, resetForm } = payload;

    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLogin(true);
        resetForm();
      })
      .catch((err) => {
        const errCode = err.code;
        const errMessage = err.message;
        Alert.alert("Error", errMessage);

        return thunkAPI.rejectWithValue(errMessage);
      });
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {},
  extraReducers: {
    [logout.fulfilled]: (state) => {
      state.user = null;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [register.fulfilled]: (state, action) => {},
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
