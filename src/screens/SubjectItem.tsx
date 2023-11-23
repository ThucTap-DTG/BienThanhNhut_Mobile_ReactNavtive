  import React, { useState } from "react";
  import { View, StyleSheet, Button, Text, TextInput, Image, TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Checkbox } from "react-native-paper";

  interface Subject {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    quantity: string;
  }

  interface SubjectItemProps {
    index: number;
    subject: Subject;
    onEdit: (subject: Subject) => void;
    onDelete: (id: number) => void;
    onPress: (id: number) => void;
    onPress2: (id: number, startDate: Date, endDate: Date, quantity: string) => void;
  }

  const SubjectItem: React.FC<SubjectItemProps> = ({
    index,
    subject,
    onEdit,
    onDelete,
    onPress,
    onPress2,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(subject.name);
    const [editStartDate, setEditStartDate] = useState(subject.startDate);
    const [editEndDate, setEditEndDate] = useState(subject.endDate);
    const [editQuantity, setEditQuantity] = useState(subject.quantity);
    const [initialValues, setInitialValues] = useState<Subject>({
      id: subject.id,
      name: subject.name,
      startDate: subject.startDate,
      endDate: subject.endDate,
      quantity: subject.quantity,
    });

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

    const handleCancel = () => {
      setEditName(initialValues.name);
      setEditStartDate(initialValues.startDate);
      setEditEndDate(initialValues.endDate);
      setEditQuantity(initialValues.quantity);
      setIsEditing(false);
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback  onPress={() => onPress(subject.id)}>
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
              <Text style={styles.text}>Id: {subject.id}</Text>
              {isEditing ? (
                <>
                  <TextInput
                    value={editName}
                    onChangeText={(text) => setEditName(text)}
                    style={styles.input}
                  />
                  {/* <TextInput
                  value={editStartDate}
                  onChangeText={(text) => setEditStartDate(text)}
                  style={styles.input}
                />
                <TextInput
                  value={editEndDate}
                  onChangeText={(text) => setEditEndDate(text)}
                  style={styles.input}
                /> */}
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
            <View>
              <View style={styles.buttonContainer}>
                {isEditing ? (
                  <>
                    <Button title="Save" color="green" onPress={handleEdit} />
                    <Button title="Cancel" color="red" onPress={handleCancel} />
                  </>
                ) : (
                  <>
                    <Button
                      title="Edit"
                      color="blue"
                      onPress={handleEditPress}
                    />
                    <Button
                      title="Delete"
                      color="red"
                      onPress={() => onDelete(subject.id)}
                    />
                  </>
                )}
              </View>
              <View>
                <Button title="List_student" onPress={() => onPress2(subject.id, subject.startDate, subject.endDate, subject.quantity)}></Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
