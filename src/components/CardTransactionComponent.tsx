import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

interface CardTransactionProps {
  title: string;
  description: string;
  date: string;
  amount: string;
  type: string;
  category: string;
}

const CardTransactionComponent = ({
  title,
  description,
  date,
  amount,
  type,
  category,
}: CardTransactionProps) => {
  return (
    <View style={styles.transactionContainer}>
      <View style={styles.transactionCard}>
        <View style={styles.transactionColumn}>
          <Text style={styles.transactionTitle}>{title}</Text>
          <Text style={styles.transactiontext}>{category}</Text>
          <Text style={styles.transactiontext}>{description}</Text>
          <Text style={styles.transactiontext}>{date}</Text>
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
    width: '100%',
  },
  transactionCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  transactionColumn: {
    padding: 3,
  },
  transactionTitle: {
    marginVertical: 4,
    color: '#000',
    fontWeight: 'bold',
  },
  transactiontext: {
    marginVertical: 1,
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
