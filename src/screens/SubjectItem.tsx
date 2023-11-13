import React, { useState } from "react";
import { View, StyleSheet, Button, Text, TextInput, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Subject {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  quantity: string;
}

interface SubjectItemProps {
  index: number;
  subject: Subject;
  onEdit: (subject: Subject) => void;
  onDelete: (id: number) => void;
}

const SubjectItem: React.FC<SubjectItemProps> = ({
  index,
  subject,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(subject.name);
  const [editStartDate, setEditStartDate] = useState(subject.startDate);
  const [editEndDate, setEditEndDate] = useState(subject.endDate);
  const [editQuantity, setEditQuantity] = useState(subject.quantity);

  const handleEdit = () => {
    const updatedSubject: Subject = {
      id: subject.id,
      name: editName,
      startDate: editStartDate,
      endDate: editEndDate,
      quantity: editQuantity,
    };
    onEdit(updatedSubject);
    setIsEditing(false);
  };

  const handleEditPress = () => {
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.itemContainer,
          { backgroundColor: index % 2 === 0 ? "lightgray" : "green" },
        ]}
      >
        {/* Adjust the image source or remove it based on your design */}
        <Image
          source={require("../assets/avatar_person.jpg")}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.text}>Id: {subject.id}</Text>
          {isEditing ? (
            <>
              <TextInput
                value={editName}
                onChangeText={(text) => setEditName(text)}
                style={styles.input}
              />
              <TextInput
                value={editStartDate}
                onChangeText={(text) => setEditStartDate(text)}
                style={styles.input}
              />
              <TextInput
                value={editEndDate}
                onChangeText={(text) => setEditEndDate(text)}
                style={styles.input}
              />
              <TextInput
                value={editQuantity}
                onChangeText={(text) => setEditQuantity(text)}
                style={styles.input}
              />
            </>
          ) : (
            <>
              <Text>{editName}</Text>
              <Text>{`Start Date: ${editStartDate}`}</Text>
              <Text>{`End Date: ${editEndDate}`}</Text>
              <Text>{`Quantity: ${editQuantity}`}</Text>
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
          {isEditing ? (
            <Button title="Save" color="green" onPress={handleEdit} />
          ) : (
            <Button title="Edit" color="blue" onPress={handleEditPress} />
          )}
          <Button
            title="Delete"
            color="red"
            onPress={() => onDelete(subject.id)}
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

export default SubjectItem;
