import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import MainScreen from './src/MainScreen';
import {NavigationContainer} from '@react-navigation/native';
import AppScreen from './src/AppScreen';
import {MenuProvider} from 'react-native-popup-menu';

const App = () => {
  return (
    <MenuProvider>
      <Provider store={store}>
        <NavigationContainer>
          <MainScreen />
        </NavigationContainer>
      </Provider>
    </MenuProvider>
  );
};

export default App;
