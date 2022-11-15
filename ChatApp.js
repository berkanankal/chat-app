import React from "react";
import { View, Text, Button, Alert, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import Auth from "./screens/Auth";
import Home from "./screens/Home";
import Messages from "./screens/Messages";
import { MaterialIcons } from "@expo/vector-icons";
import { logout } from "./redux/authSlice";

const Stack = createNativeStackNavigator();

const ChatApp = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
      },
      {
        text: "Logout",
        onPress: () => dispatch(logout()),
      },
    ]);
  };

  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Messages"
              component={Messages}
              options={{
                headerRight: () => (
                  <TouchableOpacity
                    onPress={handleLogout}
                    style={{
                      marginRight: 10,
                    }}
                    activeOpacity={0.6}
                  >
                    <MaterialIcons name="logout" size={32} color="#7953d2" />
                  </TouchableOpacity>
                ),
              }}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default ChatApp;
