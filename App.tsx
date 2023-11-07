import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Splash from "./src/screens/Splash";
import Detail from "./src/screens/Detail";
import DetailAccount from "./src/screens/Detail_Account";
import { UserProvider } from "./src/context/Usercontext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Danh sách"
        component={Detail}
        options={{
          tabBarLabel: "Detail",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account-details"
              size={32}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chi tiết"
        component={DetailAccount}
        options={{
          tabBarLabel: "DetailAccount",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="card-account-details-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Detail" component={TabNavigator} />
          <Stack.Screen name="DetailAccount" component={DetailAccount} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
