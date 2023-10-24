import React, { useState } from "react";
import axios from "axios";
import { View, StyleSheet, ScrollView, Text, TextInput, Button } from "react-native";

interface Student {
    id: number
    name: string
    email: string
}

function Home(){
    const [addName,setAddName] = useState<string>("")
    const [addEmail, setAddEmail] = useState<string>("")

    const [idDelete,setIdDelete] = useState<string>("")

    const[idEdit, setIdName] = useState<string>("")
    const[editName, setEditName] = useState<string>("")
    const[editEmail, setEditEmail] = useState<string>("")

    const[dataSource, setDataSource] = useState<Student[]>([])

    //Hàm
    const addStudent = () =>{

    }

    return (
      <View style={styles.container}>
        <View style={styles.view1}>
          <ScrollView style={styles.scroll1}>
            <Text></Text>
          </ScrollView>
        </View>
        <View style={styles.view2}>
          <ScrollView style={styles.scroll2}>
            <Text style={{ fontSize: 20, color: "green" }}>Thêm sinh viên</Text>
            <TextInput
              placeholder="Nhập tên"
              value={addEmail}
              onChangeText={(text) => setAddName(text)}
            ></TextInput>
            <TextInput
              placeholder="Nhập email"
              value={addEmail}
              onChangeText={(text) => setAddEmail(text)}
            ></TextInput>
            <Button title="Thêm" onPress={addStudent} />

            <Text style={{ fontSize: 20, color: "green" }}>Xóa sinh viên</Text>
            <TextInput
              placeholder="Nhập ID"
              value={idDelete}
              onChangeText={(text) => setIdDelete(text)}
            ></TextInput>
            <Button title="Xóa" onPress={addStudent} />

            <Text style={{ fontSize: 20, color: "green" }}>Sửa sinh viên</Text>
            <TextInput
              placeholder="Nhập ID"
              value={idDelete}
              onChangeText={(text) => setIdDelete(text)}
            ></TextInput>
            <Button title="Xóa" onPress={addStudent} />
          </ScrollView>
        </View>
      </View>
    );
}

const styles = StyleSheet.create ({
    container:{
        flex:1
    },
    view1:{
        flex:3,
    },
    scroll1:{
        backgroundColor: 'black'
    },
    view2:{
        flex:1,
    },
    scroll2:{
    },
    //chứa text

});

export default Home;