import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";
import Item_1 from "./item";

interface Student {
  id: number;
  name: string;
  email: string;
}

const url = "https://65376c31bb226bb85dd33468.mockapi.io/api/students";

function Home({ navigation }: any) {
  const [addName, setAddName] = useState<string>("");
  const [addEmail, setAddEmail] = useState<string>("");

  const [dataSource, setDataSource] = useState<Student[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  useEffect(() => {
    fetchData(search);
  }, [search, currentPage, itemsPerPage]);

  const fetchData = (text: string) => {
    axios
      .get<Student[]>(url)
      .then((response) => {
        setDataSource(response.data);
      })
      .catch((error) => {
        console.error("Load dữ liệu thất bại", error);
      });
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
        Alert.alert("Xóa thành công", "Sinh viên đã được xóa");
      })
      .catch((error) => {
        console.error("Xóa thất bại", error);
        Alert.alert("Lỗi", "Không thể xóa sinh viên. Vui lòng thử lại sau.");
      });
  };

  const handle_navigate = () => {
    navigation.navigate("Detail_Account");
  };

  const startEditing = (student: Student) => {
    saveStudent(student);
  };

  const saveStudent = (sv: Student) => {
    axios
      .put(`${url}/${sv.id}`, sv)
      .then(() => {
        fetchData(search);
        Alert.alert("Sửa thành công", "Thông tin sinh viên đã được cập nhật.");
      })
      .catch((error) => {
        console.error("Sửa thất bại", error);
        Alert.alert(
          "Lỗi",
          "Không thể cập nhật thông tin. Vui lòng thử lại sau."
        );
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataSource.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataSource.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
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
          {currentItems.map((item, index) => (
            <Item_1
              student={item}
              onEdit={startEditing}
              onDelete={deleteStudent}
              index={index}
              key={index}
            ></Item_1>
          ))}
          <View style={styles.pagination}>
            <Button
              title="Previous Page"
              onPress={prevPage}
              disabled={currentPage === 1}
            />
            <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
            <Button
              title="Next Page"
              onPress={nextPage}
              disabled={currentPage === totalPages}
            />
          </View>
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
          <Text>Chuyển trang</Text>
          <Button title="Chuyển trang" onPress={handle_navigate}></Button>
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
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default Home;
