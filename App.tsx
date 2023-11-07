import "react-native-gesture-handler";
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
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props : any) {
  const { navigation } = props;

  const logout = () => {
    Alert.alert("Thông báo logout", "Bạn có chắc chắn muốn thoát ?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.navigate("Login");
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={logout} />
    </DrawerContentScrollView>
  );
}

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
        name="Detail"
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
        name="DetailAccount"
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
        <Drawer.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Detail" component={TabNavigator} />
          <Drawer.Screen name="DetailAccount" component={DetailAccount} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
