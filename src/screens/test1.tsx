import React, { useState } from "react";
import { View, TextInput, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";


const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;
};

const MyDateTimePicker: React.FC = () => {
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [focusedInput, setFocusedInput] = useState(""); // State to determine which TextInput is focused

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShowPicker(Platform.OS === "ios");

    if (focusedInput === "input1") {
      setDate1(currentDate); // Update date for TextInput 1
    } else if (focusedInput === "input2") {
      setDate2(currentDate); // Update date for TextInput 2
    }
  };

  const showDatepicker = (input: string) => {
    setFocusedInput(input); // Store the focused TextInput
    setShowPicker(true);
  };

  return (
    <View>
      <TextInput
        value={formatDate(date1)}
        placeholder="Select Date 1"
        style={{ borderWidth: 1, padding: 10 }}
        editable={false}
        onFocus={() => showDatepicker("input1")}
      />
      <TextInput
        value={formatDate(date2)}
        placeholder="Select Date 2"
        style={{ borderWidth: 1, padding: 10 }}
        editable={false}
        onFocus={() => showDatepicker("input2")}
      />
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={focusedInput === "input1" ? date1 : date2}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default MyDateTimePicker;
