import {View, Text, StyleSheet} from 'react-native';
import React, { JSX } from 'react';

type CardTransactionProps = {
  title: string;
  description?: string;
  date: string;
  amount: string;
  category?: string;
};

const CardTransactionComponent = ({
  title,
  description,
  date,
  amount,
}: CardTransactionProps): JSX.Element => {
  return (
    <View style={styles.transactionContainer}>
      <Text style={styles.transactionHeader}>Recent Transations</Text>
      <View style={styles.transactionCard}>
        <View style={styles.transactionColumn}>
          <Text style={styles.transactionTitle}>{title}</Text>
          <Text style={styles.transactionDescription}>{description}</Text>
          <Text style={styles.transactionDate}>{date}</Text>
        </View>
        <Text style={styles.transactionAmount}>{amount} €</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionContainer: {
    margin: 10,
  },
  transactionHeader: {
    marginVertical: 10,
    color: '#000',
    fontWeight: 600,
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
  },
});

export default CardTransactionComponent;
