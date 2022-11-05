import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const logout = createAsyncThunk("auth/logout", (payload, thunkAPI) => {
  signOut(auth)
    .then(() => {
      Alert.alert("Success", "Logout success");
    })
    .catch((err) => {
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

      Alert.alert("Success", "Login success");

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
    const { email, password, setIsLogin, setFormData } = payload;

    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Success", "Register success");
        setFormData({
          email: "",
          password: "",
        });

        setIsLogin(true);
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
      console.log("logout çalıştı");
      state.user = null;
    },
    [login.fulfilled]: (state, action) => {
      console.log("login çalıştı");
      state.user = action.payload;
    },
    [register.fulfilled]: (state, action) => {
      console.log(action);
      console.log("register çalıştı");
    },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
