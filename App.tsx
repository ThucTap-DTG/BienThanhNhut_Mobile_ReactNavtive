import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Splash from "./src/screens/Splash"
import Detail from "./src/screens/Detail";
import Detailacount from "./src/screens/Detail_Account";
import { UserProvider } from "./src/context/Usercontext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Detail" component={Detail}></Stack.Screen>
          <Stack.Screen
            name="Detail_Account"
            component={Detailacount}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};
export default App;