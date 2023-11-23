import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { View, StyleSheet, ScrollView, Text, TextInput, Button, Alert } from "react-native";
import { Checkbox } from "react-native-paper";

interface Student {
  id: number;
  name: string;
  email: string;
}
interface StudentData {
  id: number;
  id_student: number;
  id_subject: number;
}

const url = "https://65376c31bb226bb85dd33468.mockapi.io/api/students";

function Home({ navigation, route }: any) {
  const [dataSource, setDataSource] = useState<Student[]>([]);
  const [search, setSearch] = useState<string>("");
  const [studentsInSubject, setStudentsInSubject] = useState<number[]>([]);

  const [checkedStudents, setCheckedStudents] = React.useState<number[]>([]);

  //Mảng ds sinh viên
  const [liststudent, setliststudent] = useState<Student[]>([]);

  const { id_s, startDate_s, endDate_s, quantity_s } = route.params;
  const yourSubjectId = id_s;

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await fetch(
          "https://65376c31bb226bb85dd33468.mockapi.io/api/studentsubject"
        );
        const data: StudentData[] = await response.json();

        const filteredStudents = data
          .filter((item) => item.id_subject === yourSubjectId)
          .map((item) => item.id_student);

        setStudentsInSubject(filteredStudents);
      } catch (error) {
        console.error("Load dữ liệu thất bại", error);
      }
    };
    fetchData1();
  }, [yourSubjectId]);

  useEffect(() => {
    const fetchData = async (text: string) => {
      try {
        const response = await axios.get<Student[]>(`${url}?search=${text}`);
        setDataSource(response.data);
      } catch (error) {
        console.error("Load dữ liệu thất bại", error);
      }
    };
    fetchData(search);
  }, [search]);

  const studentsToExclude = studentsInSubject;

  const studentsToDisplay = dataSource.filter(
    (student) => !studentsToExclude.includes(student.id)
  );

  const toggleCheckbox = (studentId: number) => {
    if (checkedStudents.includes(studentId)) {
      setCheckedStudents((prevState) =>
        prevState.filter((id) => id !== studentId)
      );
    } else {
      setCheckedStudents((prevState) => [...prevState, studentId]);
    }
  };

  const registerStudents = () => {
    const selectedStudents = dataSource.filter((student) =>
      checkedStudents.includes(student.id)
    );
    setliststudent(selectedStudents);
    console.log("Danh sách sinh viên đã đăng ký:", selectedStudents);
    addStudents(selectedStudents);
  };


const addStudents = async (studentsToAdd: Student[]) => {
  try {
    const currentQuantity = await quantityStudent(yourSubjectId);
    if (currentQuantity <= quantity_s) {
      const addStudentsPromises = studentsToAdd.map((student) => {
        const newstu_sub: StudentData = {
          id: 0,
          id_student: student.id,
          id_subject: yourSubjectId,
        };
        return axios.post(
          "https://65376c31bb226bb85dd33468.mockapi.io/api/studentsubject",
          newstu_sub
        );
      });

      Promise.all(addStudentsPromises)
        .then(() => {
          Alert.alert(
            "Thêm thành công",
            "Các sinh viên đã được thêm vào danh sách."
          );
        })
        .catch((error) => {
          Alert.alert("Lỗi", "Không thể thêm sinh viên. Vui lòng thử lại sau.");
          console.error("Thêm thất bại", error);
        });
    } else {
      Alert.alert(
        "Số lượng sinh viên đã đủ",
        "Không thể thêm sinh viên do số lượng sinh viên hiện tại đã đủ."
      );
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra số lượng sinh viên:", error);
    Alert.alert(
      "Lỗi",
      "Không thể kiểm tra số lượng sinh viên. Vui lòng thử lại sau."
    );
  }
};


  // Hàm để đếm số lượng sinh viên cho một môn học cụ thể (dựa trên id_subject)
const countStudentsBySubjectId = (
  studentDataList: StudentData[],
  id: number
): number => {
  const filteredStudents = studentDataList.filter(
    (student) => student.id_subject === id
  );
  return filteredStudents.length;
};

  //Lấy tất cả các studentdata
  const getAllStudentData = async (): Promise<StudentData[]> => {
    try {
      const response = await axios.get<StudentData[]>(
        "https://65376c31bb226bb85dd33468.mockapi.io/api/studentsubject"
      );

      if (response && response.data) {
        return response.data; 
      }

      return [];
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu StudentData:", error);
      throw error; 
    }
  };

  const quantityStudent = (id: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      getAllStudentData()
        .then((studentDataList) => {
          const count = countStudentsBySubjectId(studentDataList, id);
          resolve(count);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu StudentData:", error);
          reject(error);
        });
    });
  };


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nhập tên tìm kiếm"
        value={search}
        onChangeText={(text) => setSearch(text)}
        style={styles.searchInput}
      />
      <ScrollView style={styles.scrollView}>
        {studentsToDisplay.map((student) => (
          <View style={styles.studentCard} key={student.id}>
            <View>
              <Checkbox
                testID={student.id.toString()}
                status={
                  checkedStudents.includes(student.id) ? "checked" : "unchecked"
                }
                onPress={() => {
                  toggleCheckbox(student.id);
                }}
              />
            </View>
            <Text style={styles.name}>{student.name}</Text>
            <Text style={styles.email}>{student.email}</Text>
          </View>
        ))}
        <View>
          <Button title="Đăng ký" onPress={registerStudents}></Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  scrollView: {
    flex: 1,
  },
  studentCard: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#555",
  },
});

export default Home;
