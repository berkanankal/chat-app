import { View, Text } from "react-native";
import { useState, useCallback, useEffect } from "react";
import styles from "./style";
import { GiftedChat } from "react-native-gifted-chat";
import { db, auth } from "../../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesCollection = collection(db, "messages");
      const messagesSnapshot = await getDocs(messagesCollection);
      const messagesList = messagesSnapshot.docs.map((doc) => doc.data());
      setMessages(messagesList);
    };

    fetchMessages();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];

    try {
      addDoc(collection(db, "messages"), {
        _id,
        createdAt: createdAt.toString(),
        text,
        user,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth.currentUser.uid,
      }}
    />
  );
};

export default Messages;
