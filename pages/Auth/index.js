import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import styles from "./style";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigation } from "@react-navigation/native";

const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const navigation = useNavigation();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginFirebase = () => {
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
      });
  };

  const registerFirebase = () => {
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLogin(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
      });
  };

  const handleSubmit = () => {
    if (isLogin) {
      loginFirebase();
    } else {
      registerFirebase();
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
