import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import styles from "./style";
import { useDispatch } from "react-redux";
import { login, register } from "../../redux/authSlice";
import { useFormik } from "formik";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();

  const { values, handleSubmit, handleChange, resetForm } = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
    },
    onSubmit: () => {
      if (isLogin) {
        handleLogin();
      } else {
        handleRegister();
      }
    },
  });

  const handleLogin = () => {
    const loginData = {
      email: values.email,
      password: values.password,
    };

    dispatch(login(loginData));
  };

  const handleRegister = () => {
    const registerData = {
      email: values.email,
      password: values.password,
      setIsLogin,
      resetForm,
    };

    dispatch(register(registerData));

    // dispatch(register(registerData)).then((res) => {
    //   console.log(res);
    //   if (!res.error) {
    //     setIsLogin(true);
    //   }
    // });
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        // translucent
        // backgroundColor="transparent"
      />
      <View style={styles.container}>
        <View style={styles.image_container}>
          <Image
            source={require("../../assets/images/back-image.png")}
            style={styles.back_image}
          />
        </View>
        <View style={styles.white_sheet} />
        <View style={styles.form_container}>
          <Text style={styles.header_text}>
            {isLogin ? "Login" : "Create Account"}
          </Text>
          <TextInput
            placeholder="Enter email"
            placeholderTextColor="#9e9e9e"
            style={styles.input}
            value={values.email}
            onChangeText={handleChange("email")}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Enter password"
            placeholderTextColor="#9e9e9e"
            style={styles.input}
            value={values.password}
            onChangeText={handleChange("password")}
            secureTextEntry
            autoCapitalize="none"
          />
          {isLogin && (
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor="#9e9e9e"
              style={styles.input}
              value={values.rePassword}
              onChangeText={handleChange("rePassword")}
              secureTextEntry
              autoCapitalize="none"
            />
          )}

          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btn_text}>
              {isLogin ? "Login" : "Register"}
            </Text>
          </TouchableOpacity>

          <View style={styles.navigation_container}>
            <Text>
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
            </Text>
            <TouchableOpacity>
              <Text
                style={styles.navigation_text}
                onPress={() => {
                  setIsLogin(!isLogin);
                  resetForm();
                }}
              >
                {isLogin ? "Register" : "Login"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Auth;
