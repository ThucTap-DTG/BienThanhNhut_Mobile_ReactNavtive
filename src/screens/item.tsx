import {View, StyleSheet, Button, Text} from "react-native"

const Item_1 = ({ student }: any) =>  {
  return (
    <View
      style={{
        backgroundColor: "lightgray",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
      }}
    >
      <View>
        <Text>Id: {student.id}</Text>
        <Text>Name: {student.name}</Text>
        <Text>Email: {student.email}</Text>
      </View>
      <View>
        <Button title="Edit" disabled />
        <Button title="Delete" disabled />
      </View>
    </View>
  );
};
export default Item_1;

const styles = StyleSheet.create({
    container: {

    },
})

