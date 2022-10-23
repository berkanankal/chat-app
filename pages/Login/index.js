import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import styles from "./style";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, "deneme2@mail.com", "deneme1233")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
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
      />
      <Button title="Login" onPress={handleRegister} />
    </View>
  );
};

export default Login;
