import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userContext } from "../context/Usercontext";

const Login = ({ navigation }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const a = useContext(userContext);

  const user = {
    username: "bthanhnhut",
    password: "123",
    diachi: "140 Lê Trọng Tấn",
    gioitinh: "Nam",
  };

  const handleLogin = async () => {
    if (username === user.username && password === user.password) {
      try {
        await AsyncStorage.setItem("username", user.username);
        await AsyncStorage.setItem("password", user.password);
        await AsyncStorage.setItem("diachi", user.diachi);
        await AsyncStorage.setItem("gioitinh", user.gioitinh);
        a?.setUser(user);
      } catch (error) {
        console.error("Lỗi: ", error);
      }
      navigation.navigate("Drawer");
      alert("Đăng nhập thành công");
    } else {
      alert("Đăng nhập không thành công. Vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/avatar_person.jpg")} 
        style={styles.loginImage}
      />
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Đăng nhập" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    //
    backgroundColor: "rgba(126, 171, 165, 0.2)",
  },
  loginImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 60,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
});

export default Login;
