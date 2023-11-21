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
} from "react-native";

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
  const scrollViewRef = useRef<ScrollView>(null);
  const [addName, setAddName] = useState<string>("");
  const [addEmail, setAddEmail] = useState<string>("");

  const [dataSource, setDataSource] = useState<Student[]>([]);
  const [search, setSearch] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [studentsInSubject, setStudentsInSubject] = useState<number[]>([]);
  const [studentsToDisplay, setStudentsToDisplay] = useState<Student[]>([]);

  
  const { subjectId } = route.params;
  const yourSubjectId = subjectId;

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await fetch(
          "https://df60cfc8570642678c963778bdafeb0f.api.mockbin.io/"
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
  }, []);

  useEffect(() => {
    fetchData(search);
  }, [search]);

  useEffect(() => {
    const filteredStudentsToDisplay = dataSource.filter((student) =>
      studentsInSubject.includes(student.id)
    );
    setStudentsToDisplay(filteredStudentsToDisplay);
  }, [dataSource, studentsInSubject]);

  const fetchData = (text: string) => {
    axios
      .get<Student[]>(`${url}?search=${text}`)
      .then((response) => {
        setDataSource(response.data);
      })
      .catch((error) => {
        console.error("Load dữ liệu thất bại", error);
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
            <Text style={styles.name}>{student.name}</Text>
            <Text style={styles.email}>{student.email}</Text>
          </View>
        ))}
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
