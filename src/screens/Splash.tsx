import React, { useEffect } from "react";
import { Image, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Splash = ({ navigation }: any) => {
  //   useEffect(() => {
  //     console.log('xyz')
  //     checkLogin();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      checkLogin();
    }, [])
  )

  const checkLogin = async () => {
    try {
      console.log("abc")
      const status = await AsyncStorage.getItem("username");
      if (status) {
        navigation.navigate("Drawer");
      }
      else
      {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Lỗi: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../image/logo.png")}/>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});