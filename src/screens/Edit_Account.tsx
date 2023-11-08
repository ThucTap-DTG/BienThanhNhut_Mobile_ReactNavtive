import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { userContext } from "../context/Usercontext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Edit_Account() {
  const item = useContext(userContext);
  const [username, setusername] = useState<string | undefined>(
    item?.user?.username
  );
  const [password, setpassword] = useState<string | undefined>(
    item?.user?.password
  );
  const [address, setaddress] = useState<string | undefined>(
    item?.user?.diachi
  );
  const [gender, setgender] = useState<string | undefined>(
    item?.user?.gioitinh
  );
//

const [repassword, setrepassword] = useState<string | undefined>(
  item?.user?.password
);

  

  const handleEdit = async () => {
    const user = {
      username: username || "",
      password: password || "",
      diachi: address || "",
      gioitinh: gender || "",
    };
    if(password === repassword)
    {
      try {
        await AsyncStorage.setItem("username", user.username);
        await AsyncStorage.setItem("password", user.password);
        await AsyncStorage.setItem("diachi", user.diachi);
        await AsyncStorage.setItem("gioitinh", user.gioitinh);
        item?.setUser(user);
      } catch (error) {
        console.error("Lỗi: ", error);
      }
      Alert.alert("Cập nhật thành công", "", [{ text: "OK" }]);
    }
    else
    {
      Alert.alert("Không hợp lệ vui lòng nhập lại", "", [{ text: "OK" }]);
    }
    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Thông tin tài khoản</Text>
      <Image
        style={styles.profileImage}
        source={require("../assets/avatar_person.jpg")}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Tên tài khoản</Text>
        <Text>{username}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Mật khẩu</Text>
        <TextInput
          onChangeText={(text) => setpassword(text)}
          style={styles.infoInput}
          value={password}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Nhập lại mật khẩu</Text>
        <TextInput
          onChangeText={(text) => setrepassword(text)}
          style={styles.infoInput}
          value={repassword}
          secureTextEntry={true}
        />
      </View>
      <Button title="Cập nhật" onPress={handleEdit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "green",
  },
  infoInput: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default Edit_Account;
