import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CardBalanceComponent from '../components/CardBalanceComponent';
import {MainNavigatorParamList} from '../navigation/MainNavigator';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTransactionStore} from '../stores/transactionStore';
import SwipableItem from '../components/SwipableItem';
import ButtonComponent from '../components/ButtonComponent';

const deviceHeight = Dimensions.get('screen').height;
const HomeScreen = () => {
  const getTransactions = useTransactionStore(state => state.getTransactions);
  const transactions = useTransactionStore(state => state.transactions);
  const balance = useTransactionStore(state => state.getBalance());
  const totalIncome = useTransactionStore(state => state.getTotalIncome());
  const totalExpense = useTransactionStore(state => state.getTotalExpense());

  type SwipableItemProps = {
    id: string;
    title: string;
    description: string;
    date: string;
    amount: string;
    type: string;
    category: string;
  };

  const series = [
    {value: totalIncome, color: '#0090bd'},
    {value: totalExpense, color: 'red'},
  ];

  type HomeScreenNavigationProp = NativeStackNavigationProp<
    MainNavigatorParamList,
    'HomeScreen'
  >;

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const renderItem = ({item}: {item: SwipableItemProps}) => {
    return <SwipableItem item={item} />;
  };

  const handleOnPress = useCallback(() => {
    navigation.navigate('AddTransactionScreen');
    console.log(getTransactions());
  }, [getTransactions, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeContainer}>
        <View style={styles.header}>
          <Text style={styles.headerName}>Budget Tracker</Text>
        </View>
        <CardBalanceComponent
          balanceAmount={balance}
          incomeAmount={totalIncome}
          expensesAmount={totalExpense}
          series={series}
        />
        {transactions.length < 1 ? null : (
          <Text style={styles.transactionHeader}>Recent Transactions</Text>
        )}

        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
      <View style={styles.button}>
        <ButtonComponent onPress={handleOnPress}>
          <Text style={styles.buttonText}>Add Transaction</Text>
        </ButtonComponent>
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
    flex: 1,
    position: 'relative',
    backgroundColor: '#F4F4F4',
    height: deviceHeight,
  },
  homeContainer: {
    marginBottom: 370,
  },
  transactionHeader: {
    margin: 10,
    color: '#000',
    fontWeight: 600,
  },
  flatListContainer: {
    paddingBottom: 80,
  },
  button: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 16,
    marginHorizontal: 40,
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

export default HomeScreen;
