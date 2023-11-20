import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Button,
  Alert,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import Item_1 from "./item";
import Loading from "./Loading";

interface Student {
  id: number;
  name: string;
  email: string;
}
// http://localhost:3001/students
const url = "https://65376c31bb226bb85dd33468.mockapi.io/api/students";

interface Props {
  enableSomeButton: () => void;
}

function Home({ navigation }: any) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [addName, setAddName] = useState<string>("");
  const [addEmail, setAddEmail] = useState<string>("");

  const [dataSource, setDataSource] = useState<Student[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [loading, setLoading] = useState(false);

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

  // const fetchData = (text: string, limit: number, page: number) => {
  //   const apiUrl = `http://localhost:3000/users?_limit=${limit}&_page=${page}&q=${text}`;

  //   axios
  //     .get<Student[]>(apiUrl)
  //     .then((response) => {
  //       setDataSource(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Load dữ liệu thất bại", error);
  //     });
  // };

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
  const currentItems = dataSource.slice(0, indexOfLastItem);
  const totalPages = Math.ceil(dataSource.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };


  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollContentSize = event.nativeEvent.contentSize.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;

    const scrollEnd = scrollContentSize - scrollViewHeight;

    if (scrollOffset >= scrollEnd) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        nextPage()
      }, 1000);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={400}
        >
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
          <View style={styles.pagination}></View>
        </ScrollView>
        <Loading isLoading = {loading}/>
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
