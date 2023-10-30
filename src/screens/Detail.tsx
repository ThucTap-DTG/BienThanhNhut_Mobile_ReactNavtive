import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
} from "react-native";
import item from './item';
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import Item_1 from "./item";

interface Student {
  id: number;
  name: string;
  email: string;
}

const url = "https://65376c31bb226bb85dd33468.mockapi.io/api/students";

function Home() {
  const [addName, setAddName] = useState<string>("");
  const [addEmail, setAddEmail] = useState<string>("");

  const [idDelete, setIdDelete] = useState<string>("");

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");

  const [dataSource, setDataSource] = useState<Student[]>([]);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchData(search);
  }, [search]);

  const fetchData = (text: string) => {
    if (text !== "") {
      const result = dataSource.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setDataSource(result);
    } else {
      axios
        .get<Student[]>(url)
        .then((response) => {
          setDataSource(response.data);
        })
        .catch((error) => {
          console.error("Load dữ lieu that bại", error);
        });
    }
  };

  const addStudent = () => {
    const newStudent: Student = {
      name: addName,
      email: addEmail,
      id: 0,
    };
    axios
      .post(url, newStudent)
      .then(() => {
        fetchData(search);
        setAddName("");
        setAddEmail("");
        Alert.alert("Thêm thành công", "Sinh viên đã được thêm vào danh sách.");
      })
      .catch((error) => {
        Alert.alert("Lỗi", "Không thể thêm sinh viên. Vui lòng thử lại sau.");
        console.error("Thêm thất bại", error);
      });
  };

  const deleteStudent = (id: number) => {
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        fetchData(search);
        setIdDelete("");
        Alert.alert("Xóa thành công", "Sinh viên đã được xóa");
      })
      .catch((error) => {
        console.error("Xóa thất bại", error);
        Alert.alert("Lỗi", "Không thể xóa sinh viên. Vui lòng thử lại sau.");
      });
  };

  const startEditing = (student: Student) => {
    setEditingStudent(student);
    setEditName(student.name);
    setEditEmail(student.email);
  };

  const cancelEditing = () => {
    setEditingStudent(null);
    setEditName("");
    setEditEmail("");
  };

  const saveStudent = () => {
    if (editingStudent) {
      const updatedStudent: Student = {
        id: editingStudent.id,
        name: editName,
        email: editEmail,
      };
      axios
        .put(`${url}/${editingStudent.id}`, updatedStudent)
        .then(() => {
          fetchData(search);
          setEditingStudent(null);
          setEditName("");
          setEditEmail("");
          Alert.alert(
            "Sửa thành công",
            "Thông tin sinh viên đã được cập nhật."
          );
        })
        .catch((error) => {
          console.error("Sửa thất bại", error);
          Alert.alert(
            "Lỗi",
            "Không thể cập nhật thông tin. Vui lòng thử lại sau."
          );
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <ScrollView style={styles.scroll1}>
          <TextInput
            placeholder="Nhập tên tìm kiếm"
            value={search}
            onChangeText={(text) => setSearch(text)}
          ></TextInput>
          <Text style={{ fontSize: 20, color: "green" }}>Danh sách</Text>
          {dataSource.map((item, index) => (
            <Item_1 student = {item} key = {index}> </Item_1>
          ))}
        </ScrollView>
      </View>
      <View style={styles.view2}>
        <ScrollView style={styles.scroll2}>
          <Text style={{ fontSize: 20, color: "green" }}>Thêm sinh viên</Text>
          <TextInput
            placeholder="Nhập tên"
            value={addName}
            onChangeText={(text) => setAddName(text)}
          ></TextInput>
          <TextInput
            placeholder="Nhập email"
            value={addEmail}
            onChangeText={(text) => setAddEmail(text)}
          ></TextInput>
          <Button title="Add" onPress={addStudent} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1: {
    flex: 8,
  },
  scroll1: {},
  view2: {
    flex: 2,
  },
  scroll2: {},
});

export default Home;
