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
  Platform,
} from "react-native";
import SubjectItem from "./SubjectItem"; // Assuming you have a SubjectItem component
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface Subject {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  quantity: string;
}

const url = "https://65376c31bb226bb85dd33468.mockapi.io/api/subject";

function Home({ navigation }: any) {
  const [addName, setAddName] = useState<string>("");
  const [addQuantity, setAddQuantity] = useState<string>("");

  // Date
  const [addStartDate, setAddStartDate] = useState(new Date(2024,0,0));
  const [addEndDate, setAddEndDate] = useState(new Date(2024,0,0));

  const [showPicker, setShowPicker] = useState(false);
  const [focusedInput, setFocusedInput] = useState("");

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShowPicker(Platform.OS === "ios");

    if (focusedInput === "input1") {
      setAddStartDate(currentDate);
    } else if (focusedInput === "input2") {
      setAddEndDate(currentDate);
    }
  };

  const showDatepicker = (input: string) => {
    setFocusedInput(input);
    setShowPicker(true);
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };
  //

  const [idDelete, setIdDelete] = useState<string>("");

  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editStartDate, setEditStartDate] = useState<string>("");
  const [editEndDate, setEditEndDate] = useState<string>("");
  const [editQuantity, setEditQuantity] = useState<string>("");

  const [dataSource, setDataSource] = useState<Subject[]>([]);

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
        .get<Subject[]>(url)
        .then((response) => {
          setDataSource(response.data);
        })
        .catch((error) => {
          console.error("Load dữ lieu that bại", error);
        });
    }
  };

  const addSubject = () => {
    const newSubject: Subject = {
      name: addName,
      startDate: addStartDate,
      endDate: addEndDate,
      quantity: addQuantity,
      id: 0,
    };
    axios
      .post(url, newSubject)
      .then(() => {
        fetchData(search);
        setAddName("");
        setAddStartDate(new Date()); //
        setAddEndDate(new Date());
        setAddQuantity("");
        Alert.alert("Thêm thành công", "Môn học đã được thêm vào danh sách.");
      })
      .catch((error) => {
        Alert.alert("Lỗi", "Không thể thêm môn học. Vui lòng thử lại sau.");
        console.error("Thêm thất bại", error);
      });
  };

  const deleteSubject = (id: number) => {
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        fetchData(search);
        setIdDelete("");
        Alert.alert("Xóa thành công", "Môn học đã được xóa");
      })
      .catch((error) => {
        console.error("Xóa thất bại", error);
        Alert.alert("Lỗi", "Không thể xóa môn học. Vui lòng thử lại sau.");
      });
  };

  const startEditing = (subject: Subject) => {
    saveSubject(subject);
  };

  const saveSubject = (subj: Subject) => {
    axios
      .put(`${url}/${subj.id}`, subj)
      .then(() => {
        fetchData(search);
        setEditingSubject(null);
        setEditName("");
        setEditStartDate("");
        setEditEndDate("");
        setEditQuantity("");
        Alert.alert("Sửa thành công", "Thông tin môn học đã được cập nhật.");
      })
      .catch((error) => {
        console.error("Sửa thất bại", error);
        Alert.alert(
          "Lỗi",
          "Không thể cập nhật thông tin. Vui lòng thử lại sau."
        );
      });
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
          {dataSource &&
            dataSource.map((item, index) => (
              <SubjectItem
                subject={item}
                onEdit={startEditing}
                onDelete={deleteSubject}
                index={index}
                key={index}
              ></SubjectItem>
            ))}
        </ScrollView>
      </View>
      <View style={styles.view2}>
        <ScrollView style={styles.scroll2}>
          <Text style={{ fontSize: 20, color: "green" }}>Thêm môn học</Text>
          <TextInput
            placeholder="Nhập tên môn học"
            value={addName}
            onChangeText={(text) => setAddName(text)}
          ></TextInput>
          <TextInput
            placeholder="Nhập ngày bắt đầu"
            value={formatDate(addStartDate)}
            onPressIn={() => showDatepicker("input1")}
          ></TextInput>
          <TextInput
            placeholder="Nhập ngày kết thúc"
            value={formatDate(addEndDate)}
            onPressIn={() => showDatepicker("input2")}
          ></TextInput>
          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={focusedInput === "input1" ? addStartDate : addEndDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <TextInput
            placeholder="Nhập số lượng"
            value={addQuantity}
            onChangeText={(text) => setAddQuantity(text)}
          ></TextInput>
          <Button title="Thêm" onPress={addSubject} />
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
