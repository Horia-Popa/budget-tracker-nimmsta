import {View, Text, StyleSheet} from 'react-native';
import React, {JSX} from 'react';

type CardTransactionProps = {
  title: string;
  description: string;
  date: string;
  amount: string;
  type: string;
  category?: string;
};

const CardTransactionComponent = ({
  title,
  description,
  date,
  amount,
  type,
}: CardTransactionProps): JSX.Element => {
  return (
    <View style={styles.transactionContainer}>
      <View style={styles.transactionCard}>
        <View style={styles.transactionColumn}>
          <Text style={styles.transactionTitle}>{title}</Text>
          <Text style={styles.transactionDescription}>{description}</Text>
          <Text style={styles.transactionDate}>{date}</Text>
        </View>
        {type === 'income' ? (
          <Text style={styles.transactionAmount}>+ {amount} €</Text>
        ) : (
          <Text style={styles.transactionExpensesAmount}>- {amount} €</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionContainer: {
    margin: 10,
  },
  transactionCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionColumn: {
    padding: 5,
  },
  transactionTitle: {
    marginVertical: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  transactionDescription: {
    marginVertical: 5,
    color: 'grey',
    fontWeight: 600,
  },
  transactionDate: {
    marginVertical: 5,
    color: 'grey',
    fontWeight: 600,
  },
  transactionAmount: {
    paddingRight: 10,
    textAlign: 'center',
    color: '#0090bd',
    fontWeight: 'bold',
  },
  transactionExpensesAmount: {
    padding: 5,
    textAlign: 'center',
    color: '#FF0000',
    fontWeight: 'bold',
  },
});

export default CardTransactionComponent;
