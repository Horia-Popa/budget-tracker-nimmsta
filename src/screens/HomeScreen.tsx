import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CardBalanceComponent from '../components/CardBalanceComponent';
import CardTransactionComponent from '../components/CardTransactionComponent';
import {MainNavigatorParamList} from '../navigation/MainNavigator';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;
const HomeScreen = () => {
  type CardTransactionProps = {
    title: string;
    description: string;
    date: string;
    amount: string;
    type: string;
    category?: string;
  };

  type HomeScreenNavigationProp = NativeStackNavigationProp<
    MainNavigatorParamList,
    'HomeScreen'
  >;

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const data = [
    {
      id: '1',
      title: 'Salary',
      description: 'Gehalt',
      date: '20.03.2025',
      amount: '3000',
      type: 'income',
    },
    {
      id: '2',
      title: 'Grocories',
      description: 'Netto',
      date: '20.02.2025',
      amount: '50.40',
      type: 'expense',
    },
    {
      id: '3',
      title: 'Medikamente',
      description: 'Apotheke',
      date: '20.02.2025',
      amount: '68.85',
      type: 'expense',
    },
    {
      id: '4',
      title: 'Salary',
      description: 'Gehalt',
      date: '20.02.2025',
      amount: '3000',
      type: 'income',
    },
  ];

  const renderItem = ({item}: {item: CardTransactionProps}) => {
    return (
      <CardTransactionComponent
        title={item.title}
        description={item.description}
        date={item.date}
        amount={item.amount}
        type={item.type}
      />
    );
  };

  const handleOnPress = useCallback(() => {
    navigation.navigate('AddTransactionScreen');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerName}>Budget Tracker</Text>
      </View>
      <CardBalanceComponent
        balanceAmount="3500"
        incomeAmount="4000"
        expensesAmount="500"
      />
      <Text style={styles.transactionHeader}>Recent Transactions</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
      <Pressable style={styles.button} onPress={handleOnPress}>
        <Text style={styles.buttonText}>Add Transaction</Text>
      </Pressable>
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
    backgroundColor: '#F4F4F4',
    height: deviceHeight,
    // #E7E7E7
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
    right: (deviceWidth / 2) * 0.33,
    bottom: 30,
    padding: 20,
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
