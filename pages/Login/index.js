import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import styles from "./style";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigation = useNavigation();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Alert.alert("Success", "Login Successful");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code);
        console.log(error.message);
        Alert.alert("Error", errorMessage);
        // ..
      });
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
          <Text style={styles.header_text}>Login</Text>
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
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btn_text}>Login</Text>
          </TouchableOpacity>

          <View style={styles.navigation_container}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.navigation_text}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Login;
