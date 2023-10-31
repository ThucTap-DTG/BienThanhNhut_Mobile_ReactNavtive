import { useState, useEffect} from "react";
import {View, StyleSheet, Button, Text, TextInput} from "react-native"

interface Student {
  id: number;
  name: string;
  email: string;
}

interface StudentItemProps {
    index: any;
    student: Student;
    onEdit: (student: Student) => void;
    onDelete: (id: number) => void;
}

const Item_1: React.FC<StudentItemProps> = ({index, student, onEdit, onDelete }: any) => {

      const [editName, setEditName] = useState(student.name);
      const [editEmail, setEditEmail] = useState(student.email);
      const [person, setPerson]= useState<Student>();

      useEffect(() => {
        const person1: Student = { id: student.id, name: editName, email: editEmail };
        setPerson(person1);
      }, [editName, editEmail]);

      const handleEdit = () => {
        const sv: Student = {id: student.id, name: editName, email: editEmail}
        onEdit(sv)
      }

  return (
    <View
      style={{
        backgroundColor: index % 2 ? "lightgray" : "green",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
      }}
    >
      <View>
        <Text>Id: {student.id}</Text>
        <TextInput onChangeText={(text) => setEditName(text)}>
          {editName}
        </TextInput>
        <TextInput onChangeText={(text) => setEditEmail(text)}>
          {editEmail}
        </TextInput>
      </View>
      <View>
        <Button title="Edit" color="blue" onPress={handleEdit} />
        <Button
          title="Delete"
          color="red"
          onPress={() => onDelete(student.id)}
        />
      </View>
    </View>
  );
};
export default Item_1;

const styles = StyleSheet.create({
    container: {

    },
})

