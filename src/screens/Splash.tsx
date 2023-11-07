import React, { useEffect } from "react";
import { Image, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }: any) => {
    useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 1000);
  }, []);

  const checkLogin = async () => {
    try {
      const status = await AsyncStorage.getItem("username");
      if (status) {
        navigation.navigate("Detail");
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