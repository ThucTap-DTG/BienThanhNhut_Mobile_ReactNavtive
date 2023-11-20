import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/Home";
import Detail from "./src/screens/Detail";
import Detail_Account from "./src/screens/Detail_Account";
import Splash from "./src/screens/Splash";
import Login from "./src/screens/Login";
import Edit from "./src/screens/Edit_Account";
import Subject from "./src/screens/Detail_Subject"
import test1 from "./src/screens/test2";
import Loadding from "./src/screens/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProvider } from "./src/context/Usercontext";
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
//
function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Detail"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Detail"
        component={Detail}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Detail_Account"
        component={Detail_Account}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
//
function TabNavigator2() {
  return (
    <Tab.Navigator
      initialRouteName="Detail_Account"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Detail"
        component={Detail}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Detail_Account"
        component={Detail_Account}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function DrawerNavigator(props: any) {
  const { navigation } = props;
  const handleLogout = async () => {
  Alert.alert("Thông báo logout", "Bạn có chắc chắn muốn thoát ?", [
    {
      text: "No",
      style: "cancel",
    },
    {
      text: "Yes",
      onPress: async () => {
        await AsyncStorage.clear();
        navigation.navigate("Splash");
      },
    },
  ]);
  };
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Đăng xuất" onPress={handleLogout} />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="DrawerScreen"
        component={TabNavigator}
        options={{ title: "Chi tiết" }}
      />
      <Drawer.Screen
        name="DrawerScreen2"
        component={TabNavigator2}
        options={{ title: "Thông tin tài khoản" }}
      />
      <Drawer.Screen
        name="Menu"
        component={NestedDrawer}
        options={{ title: "Danh mục" , headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

function NestedDrawer () {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="subject"
        component={Subject}
        options={{ drawerLabel: "Danh mục môn học" }}
      />
      <Drawer.Screen
        name="detail"
        component={Detail}
        options={{ drawerLabel: "Danh mục sinh viên" }}
      />
    </Drawer.Navigator>
  );
}
function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="subject" component={Subject} />
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="load" component={Loadding} />
          <Stack.Screen
            name="Edit"
            component={Edit}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
