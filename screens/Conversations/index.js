import { View, Text, Image } from "react-native";
import React from "react";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import Conversation from "../../components/Conversation";

const Conversations = () => {
  const test = async () => {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        text: "Hello world!",
        createdAt: new Date(),
        receiver: "user1",
        sender: "user2",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  return (
    <View>
      <Conversation />
    </View>
  );
};

export default Conversations;
