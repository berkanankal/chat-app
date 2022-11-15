import { useState, useCallback, useEffect } from "react";
import styles from "./style";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { db, auth } from "../../config/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      }));
      setMessages(messages);
    });

    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];

    try {
      addDoc(collection(db, "messages"), {
        _id,
        createdAt,
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
        avatar: "https://placeimg.com/140/140/any",
      }}
      renderBubble={(props) => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: "#7953d2",
              },
            }}
          />
        );
      }}
    />
  );
};

export default Messages;
