import React, {useContext, useState}from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { userContext } from "../context/Usercontext";
import AsyncStorage from "@react-native-async-storage/async-storage";


function Detail_Acount() {
    const item = useContext(userContext)
    const [username, setusername] = useState<string | undefined>(item?.user?.username);
    const [password, setpassword] = useState<string | undefined>(item?.user?.password);
    const [address, setaddress] = useState<string | undefined>(item?.user?.diachi);
    const [gender, setgender] = useState<string | undefined>(item?.user?.gioitinh);

    console.log("Kết quả là");
    console.log(username)
    console.log(password)
    console.log(address)
    console.log(gender)

    const handleEdit = async () => {
      const user = {
        username: username || "",
        password: password || "",
        diachi: address || "",
        gioitinh: gender || "",
      };
      try {
        await AsyncStorage.setItem("username", user.username);
        await AsyncStorage.setItem("password", user.password);
        await AsyncStorage.setItem("diachi", user.diachi);
        await AsyncStorage.setItem("gioitinh", user.gioitinh);
        item?.setUser(user);
      } catch (error) {
        console.error("Lỗi: ", error);
      }
      alert("Cập nhật thành công")
    }


  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Thông tin tài khoản</Text>
      <View>
        <Text style={styles.title}>Tên tài khoản</Text>
        <TextInput
          onChangeText={(text) => setusername(text)}
          style={styles.content}
        >
          {item?.user?.username}
        </TextInput>
      </View>
      <View>
        <Text style={styles.title}>Mật khẩu</Text>
        <TextInput
          onChangeText={(text) => setpassword(text)}
          style={styles.content}
        >
          {item?.user?.password}
        </TextInput>
      </View>
      <View>
        <Text style={styles.title}>Địa chỉ</Text>
        <TextInput
          onChangeText={(text) => setaddress(text)}
          style={styles.content}
        >
          {item?.user?.diachi}
        </TextInput>
      </View>
      <View>
        <Text style={styles.title}>Giới Tính</Text>
        <TextInput
          onChangeText={(text) => setgender(text)}
          style={styles.content}
        >
          {item?.user?.gioitinh}
        </TextInput>
      </View>
      <Button title="Cập nhật" onPress={handleEdit}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  
  title: {
    fontSize: 16,
    color: "green",
    textAlign: "center"
  },

  content: {
    padding: 10,
    textAlign: "center"
  },
});
export default Detail_Acount;
