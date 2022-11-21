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
import * as Yup from "yup";
import { FontAwesome } from "@expo/vector-icons";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rePasswordVisible, setRePasswordVisible] = useState(false);

  const dispatch = useDispatch();

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(32, "Password must be at most 32 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(32, "Password must be at most 32 characters")
      .required("Password is required"),
  });

  const { values, handleSubmit, handleChange, resetForm, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        rePassword: "",
      },
      validationSchema: isLogin ? loginSchema : registerSchema,
      onSubmit: (values) => {
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

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleRePasswordVisibility = () => {
    setRePasswordVisible(!rePasswordVisible);
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
          {errors.email && touched.email && (
            <Text style={styles.error_text}>{errors.email}</Text>
          )}
          <View style={styles.password_container}>
            <TextInput
              placeholder="Enter password"
              placeholderTextColor="#9e9e9e"
              value={values.password}
              style={styles.password_input}
              onChangeText={handleChange("password")}
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={handlePasswordVisibility}>
              <FontAwesome
                name={!passwordVisible ? "eye" : "eye-slash"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {errors.password && touched.password && (
            <Text style={styles.error_text}>{errors.password}</Text>
          )}
          {isLogin && (
            <>
              <View style={styles.password_container}>
                <TextInput
                  placeholder="Confirm password"
                  placeholderTextColor="#9e9e9e"
                  value={values.rePassword}
                  style={styles.password_input}
                  onChangeText={handleChange("rePassword")}
                  secureTextEntry={!rePasswordVisible}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={handleRePasswordVisibility}>
                  <FontAwesome
                    name={!rePasswordVisible ? "eye" : "eye-slash"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              {errors.rePassword && touched.rePassword && (
                <Text style={styles.error_text}>{errors.rePassword}</Text>
              )}
            </>
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
                  setPasswordVisible(false);
                  setRePasswordVisible(false);
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
