import React from "react";
import { View, Text, Button, Alert, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { MaterialIcons } from "@expo/vector-icons";
import { logout } from "./redux/authSlice";

const Stack = createNativeStackNavigator();

const ChatApp = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
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
          <Stack.Navigator
            screenOptions={{
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
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Chat" component={Chat} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default ChatApp;
