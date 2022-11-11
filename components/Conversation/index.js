import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React from "react";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

const Conversation = () => {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor="#DDDDDD"
      onPress={() => navigation.navigate("Messages")}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://picsum.photos/200/300?random=1",
          }}
          style={styles.image}
        />
        <View style={styles.right_container}>
          <View style={styles.right_container_left}>
            <Text style={styles.username}>User</Text>
            <Text style={styles.last_message}>LastMessage</Text>
          </View>
          <View style={styles.right_container_right}>
            <Text style={styles.date}>13:16</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default Conversation;
