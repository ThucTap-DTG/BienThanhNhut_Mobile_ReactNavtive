import React, { useState } from "react";
import { View, StyleSheet, Button, Text, TextInput, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Student {
  id: number;
  name: string;
  email: string;
}

interface StudentItemProps {
  index: number;
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

const Item_1: React.FC<StudentItemProps> = ({
  index,
  student,
  onEdit,
  onDelete,
}) => {
  const [editName, setEditName] = useState(student.name);
  const [editEmail, setEditEmail] = useState(student.email);

  const handleEdit = () => {
    const updatedStudent: Student = {
      id: student.id,
      name: editName,
      email: editEmail,
    };
    onEdit(updatedStudent);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.itemContainer,
          { backgroundColor: index % 2 === 0 ? "lightgray" : "green" },
        ]}
      >
        <Image
          source={require("../assets/avatar_person.jpg")}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.text}>Id: {student.id}</Text>
          <TextInput
            value={editName}
            onChangeText={(text) => setEditName(text)}
            style={styles.input}
          />
          <TextInput
            value={editEmail}
            onChangeText={(text) => setEditEmail(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Edit" color="blue" onPress={handleEdit} />
          <Button
            title="Delete"
            color="red"
            onPress={() => onDelete(student.id)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontWeight: "bold",
  },
  input: {
    padding: 5,
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});

export default Item_1;
