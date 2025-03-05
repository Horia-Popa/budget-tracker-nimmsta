import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import DetailedTransactionScreen from '../screens/DetailedTransactionScreen';
import HomeScreen from '../screens/HomeScreen';

export type MainNavigatorParamList = {
  HomeScreen: undefined;
  AddTransactionScreen: undefined;
  DetailedTransactionScreen: {
    id: string;
    title: string;
    description: string;
    date: string;
    amount: string;
    type: string;
  };
};

const Stack = createNativeStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{ headerShown: false }}/>
        <Stack.Screen
          name="AddTransactionScreen"
          component={AddTransactionScreen}
        />
        <Stack.Screen
          name="DetailedTransactionScreen"
          component={DetailedTransactionScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
