import React from "react";
import { StyleSheet } from "react-native";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import ChatApp from "./ChatApp";

const App = () => {
  return (
    <Provider store={store}>
      <ChatApp />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
