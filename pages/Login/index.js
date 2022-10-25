import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
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
    <View>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={formData.password}
        onChangeText={(value) => handleInputChange("password", value)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Don't you have an account?"
        onPress={() => navigation.navigate("Signup")}
      />
      <Button title="Get User" onPress={() => console.log(auth)} />
      <Button title="Logout" onPress={() => auth.signOut()} />
    </View>
  );
};

export default Login;
