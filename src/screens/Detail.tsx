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
          <FlatList
            data={dataSource}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View
                style={{
                  backgroundColor: index % 2 === 0 ? "lightgray" : "white",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <View>
                  <Text>Id: {item.id}</Text>
                  {editingStudent === item ? (
                    <>
                      <TextInput
                        value={editName}
                        onChangeText={(text) => setEditName(text)}
                      />
                      <TextInput
                        value={editEmail}
                        onChangeText={(text) => setEditEmail(text)}
                      />
                    </>
                  ) : (
                    <>
                      <Text>Name: {item.name}</Text>
                      <Text>Email: {item.email}</Text>
                    </>
                  )}
                </View>
                {editingStudent === item ? (
                  <>
                    <Button title="Save" onPress={saveStudent} />
                    <Button title="Cancel" onPress={cancelEditing} />
                  </>
                ) : (
                  <>
                    <Button title="Edit" onPress={() => startEditing(item)} />
                    <Button
                      title="Delete"
                      onPress={() => deleteStudent(item.id)}
                      color="red"
                    />
                  </>
                )}
              </View>
            )}
          />
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
          <Button title="Thêm" onPress={addStudent} />
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
