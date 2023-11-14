import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const MyDateTimePicker: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios"); // On iOS, always show picker
    setDate(currentDate);
    // You can perform actions with the selected date here
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Show Date Picker" />
      </View>
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date" // You can set mode as "time" for time picker
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default MyDateTimePicker;
