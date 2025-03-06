import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import TransactionTypeToggleButton from '../components/TransactionTypeToggleButton';
import InputComponent from '../components/InputComponent';
import CategoryDropdownModal from '../components/CategoryDropdownModal';
import DatePickerInputComponent from '../components/DatePickerInputComponent';
import {useTransactionStore} from '../stores/transactionStore';
import ButtonComponent from '../components/ButtonComponent';

const AddTransactionScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');

  const addTransaction = useTransactionStore(state => state.addTransaction);

  const handleTypeChange = (transactionType: string) => {
    setType(transactionType);
  };

  const handleOnPress = useCallback(() => {
    if (!title || !description || !date || !amount || !category) {
      Alert.alert('Please fill in all fields and try again.');
      return;
    }

    function formatDate(newDate: Date) {
      const day = String(newDate.getDate()).padStart(2, '0');
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      const year = newDate.getFullYear();

      const formattedDate = `${day}.${month}.${year}`;
      return formattedDate;
    }

    const transactionId = Date.now().toString();
    addTransaction(
      transactionId,
      title,
      description,
      formatDate(date),
      amount,
      type,
      category,
    );

    setTitle('');
    setDescription('');
    setDate(new Date());
    setAmount('');
    setType('income');
    setCategory('');
  }, [addTransaction, amount, category, date, description, title, type]);

  return (
    <ScrollView style={styles.container}>
      <TransactionTypeToggleButton onTypeChange={handleTypeChange} />

      <View style={styles.formContainer}>
        <InputComponent
          label="TITLE"
          placeholder="E.g., Salary, Groceries, Bills"
          value={title}
          onChangeText={setTitle}
          keyboardType={'decimal-pad'}
        />

        <InputComponent
          label="AMOUNT (€)"
          placeholder="0,00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />

        <DatePickerInputComponent
          label={'DATE'}
          value={date}
          onChange={setDate}
        />

        <CategoryDropdownModal
          label="CATEGORY"
          value={category}
          onSelect={setCategory}
        />

        <InputComponent
          label="DESCRIPTION"
          placeholder="Add notes here..."
          value={description}
          onChangeText={setDescription}
          keyboardType={'decimal-pad'}
        />
        <View style={styles.button}>
          <ButtonComponent onPress={handleOnPress}>
            <Text style={styles.buttonText}>Save Transaction</Text>
          </ButtonComponent>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F4',
  },
  screenHeader: {
    marginVertical: 10,
    textAlign: 'center',
    color: '#0090bd',
    fontWeight: 'bold',
    fontSize: 21,
  },
  formContainer: {
    margin: 10,
  },
  button: {
    flex: 1,
    bottom: 30,
    padding: 20,
    margin: 40,
    backgroundColor: '#0090bd',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddTransactionScreen;
