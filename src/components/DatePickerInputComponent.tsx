import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface DatePickerInputComponentProps {
  label: string;
  value: Date;
  onChange: (value: Date) => void;
}

const DatePickerInputComponent = ({
  label,
  value,
  onChange,
}: DatePickerInputComponentProps) => {
  const [showPicker, setShowPicker] = useState(false);
  // Ensure value is always a Date object
  const dateValue = value instanceof Date ? value : new Date();
  const formattedDate = dateValue.toDateString();

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');

    if (selectedDate) {
      onChange(selectedDate);
      setShowPicker(false);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <Pressable
        style={styles.dateSelector}
        onPress={() => setShowPicker(true)}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={dateValue}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default DatePickerInputComponent;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  dateSelector: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 15,
    color: '#333',
  },
});
