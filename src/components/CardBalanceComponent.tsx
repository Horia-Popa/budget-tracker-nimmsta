import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {PieChart} from 'react-native-gifted-charts';

type CardBalanceProps = {
  balanceAmount: number;
  incomeAmount: number;
  expensesAmount: number;
  series: {
    value: number;
    color: string;
  }[];
};

const CardBalanceComponent = ({
  balanceAmount,
  incomeAmount,
  expensesAmount,
  series,
}: CardBalanceProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardHeader}>Current Balance</Text>
      <Text style={styles.balanceAmount}>{balanceAmount} €</Text>
      <View style={styles.cardRowContainer}>
        <View style={styles.incomeContainer}>
          <Text style={styles.title}>Income</Text>
          <Text style={styles.amount}>{incomeAmount} €</Text>
        </View>
        <View style={styles.graphContainer}>
          {series.length < 1 ? null : (
            <PieChart data={series} donut radius={40} textColor={'#000'} />
          )}
        </View>
        <View style={styles.expensesContainer}>
          <Text style={styles.title}>Expenses</Text>
          <Text style={styles.expensesAmount}>{expensesAmount} €</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderRadius: 12,
  },
  cardHeader: {
    fontWeight: 600,
    color: 'grey',
    textAlign: 'center',
    marginTop: 10,
  },
  balanceAmount: {
    fontSize: 30,
    fontWeight: 800,
    color: '#0090bd',
    textAlign: 'center',
  },
  cardRowContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  incomeContainer: {
    padding: 5,
    width: 120,
    backgroundColor: '#E9F3F8',
    borderRadius: 12,
  },
  expensesContainer: {
    padding: 5,
    width: 120,
    backgroundColor: '#FFE9E8',
    borderRadius: 12,
  },
  title: {padding: 5, textAlign: 'center', color: 'grey'},
  amount: {padding: 5, textAlign: 'center', color: '#0090bd'},
  expensesAmount: {padding: 5, textAlign: 'center', color: '#FF0000'},
  graphContainer: {
    alignItems: 'center',
    margin: 5,
  },
});

export default CardBalanceComponent;
