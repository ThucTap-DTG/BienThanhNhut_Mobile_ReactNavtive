import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";
import axios from "axios";

interface Student {
  id: number;
  name: string;
  email: string;
}

const url = "https://65376c31bb226bb85dd33468.mockapi.io/api/students";

const Home: React.FC = () => {
  const [addName, setAddName] = useState<string>("");
  const [addEmail, setAddEmail] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");
  const [dataSource, setDataSource] = useState<Student[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get<Student[]>(url)
      .then((response) => {
        setDataSource(response.data);
      })
      .catch((error) => {
        console.error("Load dữ lieu that bại", error);
      });
  };

  const addStudent = () => {
    const newStudent: Student = {
      name: addName,
      email: addEmail,
      id: Math.floor(Math.random() * 1000),
    };

    axios
      .post(url, newStudent)
      .then(() => {
        fetchData();
        setAddName("");
        setAddEmail("");
      })
      .catch((error) => {
        console.error("Thêm thất bại", error);
      });
  };

  const deleteStudent = () => {
    axios
      .delete(`${url}/${deleteId}`)
      .then(() => {
        fetchData();
        setDeleteId("");
      })
      .catch((error) => {
        console.error("Thêm thành công: ", error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 6 }}>
        <Text>Dữ Liệu</Text>
        <FlatList
          data={dataSource}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{
                backgroundColor: index % 2 === 0 ? "lightgray" : "white",
              }}
            >
              <Text>Id: {item.id}</Text>
              <Text>Name: {item.name}</Text>
              <Text>Email: {item.email}</Text>
            </View>
          )}
        />
      </View>
      <View style={{ flex: 4 }}>
        <Text style={{ fontSize: 20, color: "green", backgroundColor: "blue" }}>
          Thêm mới sinh viên:
        </Text>
        <TextInput
          placeholder="Tên"
          value={addName}
          onChangeText={(text) => setAddName(text)}
        />
        <TextInput
          placeholder="Email"
          value={addEmail}
          onChangeText={(text) => setAddEmail(text)}
        />
        <Button title="Thêm" onPress={addStudent} />

        <Text style={{ fontSize: 20, color: "green", backgroundColor: "blue" }}>
          Xóa sinh viên (theo ID):
        </Text>
        <TextInput
          placeholder="ID"
          value={deleteId}
          onChangeText={(text) => setDeleteId(text)}
        />
        <Button title="Xóa" onPress={deleteStudent} />
      </View>
    </View>
  );
};

export default Home;
