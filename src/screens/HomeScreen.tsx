import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import CardBalanceComponent from '../components/CardBalanceComponent';
import CardTransactionComponent from '../components/CardTransactionComponent';

let deviceHeight = Dimensions.get('screen').height;
const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerName}>Budget Tracker</Text>
        </View>
        <CardBalanceComponent
          balanceAmount="3500"
          incomeAmount="4000"
          expensesAmount="500"
        />
        <CardTransactionComponent
          title="Groceries"
          description="Netto"
          date="20.02.2025"
          amount="50.40"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
  },
  headerName: {
    marginVertical: 10,
    textAlign: 'center',
    color: '#0090bd',
    fontWeight: 'bold',
    fontSize: 30,
  },
  container: {
    backgroundColor: '#F4F4F4',
    height: deviceHeight,
    // #E7E7E7
  },
});

export default HomeScreen;
