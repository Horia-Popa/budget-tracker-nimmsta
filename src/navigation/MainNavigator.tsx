import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import HomeScreen from '../screens/HomeScreen';

export type MainNavigatorParamList = {
  HomeScreen: undefined;
  AddTransactionScreen: undefined;
};

const Stack = createNativeStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddTransactionScreen"
          component={AddTransactionScreen}
          options={{title: 'Add Transaction'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
