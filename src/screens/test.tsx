import React, { useState } from 'react';
import { View, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (date : any) => {
    setSelectedDate(date);
  };

  const handleButtonPress = () => {
    // Handle button press with selectedDate value
    console.log('Selected Date:', selectedDate);
  };

  return (
    <View>
      <DatePicker
        style={{ width: 200 }}
        date={selectedDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2023-01-01"
        maxDate="2030-12-31"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
          // ...other custom styles
        }}
        onDateChange={handleDateChange}
      />
      <Button title="Submit" onPress={handleButtonPress} />
    </View>
  );
};

export default DateSelector;
