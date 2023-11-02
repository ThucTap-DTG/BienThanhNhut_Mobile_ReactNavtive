import React, { useState, useEffect, useContext, FC } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userContext } from "../context/Usercontext";

function Login  ({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // context
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
        console.log(user.username)
        a?.setUser(user);
      } catch (error) {
        console.error("Lỗi: ", error);
      }
      navigation.navigate("Detail");
      alert("Đăng nhập thành công");
    } else {
      alert("Đăng nhập không thành công. Vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.container}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    paddingBottom: 30,
    fontSize: 24,
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
