import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import styles from "./style";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
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
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
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
        onChangeText={(value) => handleInputChange("email", value)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        onChangeText={(value) => handleInputChange("password", value)}
        secureTextEntry
      />
      <Button title="Signup" onPress={handleRegister} />
    </View>
  );
};

export default Signup;
