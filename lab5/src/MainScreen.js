import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import AppScreen from './AppScreen';

const Stack = createStackNavigator();

const MainScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="App" component={AppScreen} />
    </Stack.Navigator>
  );
};

export default MainScreen;
