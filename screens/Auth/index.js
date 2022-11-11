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
import { auth } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { login, register } from "../../redux/authSlice";

const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = () => {
    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    dispatch(login(loginData));
  };

  const handleRegister = () => {
    const registerData = {
      email: formData.email,
      password: formData.password,
      setIsLogin,
      setFormData,
    };

    dispatch(register(registerData));

    // dispatch(register(registerData)).then((res) => {
    //   console.log(res);
    //   if (!res.error) {
    //     setIsLogin(true);
    //   }
    // });
  };

  const handleSubmit = () => {
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
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
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Enter password"
            placeholderTextColor="#9e9e9e"
            style={styles.input}
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
            secureTextEntry
            autoCapitalize="none"
          />
          {isLogin && (
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor="#9e9e9e"
              style={styles.input}
              value={formData.rePassword}
              onChangeText={(value) => handleInputChange("rePassword", value)}
              secureTextEntry
              autoCapitalize="none"
            />
          )}

          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btn_text}>
              {isLogin ? "Login" : "Register"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => console.log(auth.currentUser)}
          >
            <Text style={styles.btn_text}>Get User</Text>
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
                  setFormData({
                    email: "",
                    password: "",
                    rePassword: "",
                  });
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
