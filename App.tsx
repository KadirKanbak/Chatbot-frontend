import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./src/types/navigation";
import HomeScreen from "./src/screens/HomeScreen";
import ChatDetailsScreen from "./src/screens/ChatDetailsScreen";
import AuthScreen from "./src/screens/AuthScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import TodoListScreen from "./src/screens/TodoListScreen";
import TodoDetailsScreen from "./src/screens/TodoDetailsScreen";
import ChatBotScreenWrapper from "./src/screens/ChatBotScreenWrapper";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/styles/ThemeContext";
import ThemeFloatingToggle from "./src/components/ThemeFloatingToggle";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          <ThemeFloatingToggle />
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen
              name="SignUp"
              component={AuthScreen}
              options={{ animation: "fade" }}
            />
            <Stack.Screen
              name="Login"
              component={AuthScreen}
              options={{ animation: "fade" }}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ChatDetails" component={ChatDetailsScreen} />
            <Stack.Screen name="TodoList" component={TodoListScreen} />
            <Stack.Screen name="TodoDetails" component={TodoDetailsScreen} />
            <Stack.Screen name="ChatBot" component={ChatBotScreenWrapper} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
