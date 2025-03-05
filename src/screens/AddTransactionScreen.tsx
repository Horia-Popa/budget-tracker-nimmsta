import {View, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import TransactionTypeToggleButton from '../components/TransactionTypeToggleButton';
import InputFieldComponent from '../components/InputFieldComponent';
import CategoryDropdownModal from '../components/CategoryDropdownModal';

const AddTransactionScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  const handleTypeChange = (transactionType: string) => {
    setType(transactionType);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TransactionTypeToggleButton onTypeChange={handleTypeChange} />

      <View style={styles.formContainer}>
        <InputFieldComponent
          label="TITLE"
          placeholder="E.g., Salary, Groceries, Bills"
          value={title}
          onChangeText={setTitle}
          keyboardType={'decimal-pad'}
          multiline={false}
        />

        <InputFieldComponent
          label="AMOUNT (€)"
          placeholder="0,00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          multiline={false}
        />

        <CategoryDropdownModal
          label="CATEGORY"
          value={category}
          onSelect={setCategory}
        />

        <InputFieldComponent
          label="DESCRIPTION (OPTIONAL)"
          placeholder="Add notes here..."
          value={description}
          onChangeText={setDescription}
          multiline={true}
          keyboardType={'decimal-pad'}
        />
      </View>
    </SafeAreaView>
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
    margin: 20,
  },
});

export default AddTransactionScreen;
