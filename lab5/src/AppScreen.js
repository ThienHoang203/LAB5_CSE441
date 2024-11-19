import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MenuScreen from './MenuScreen';
import ServicesDetail from './home/ServicesDetail';
import ServiceAdd from './home/ServiceAdd';
import ServiceDetailHeader from './headerCustom/ServiceDetailHeader';
import ServiceUpdate from './home/ServiceUpdate';
import ServiceUpdateHeader from './headerCustom/ServiceUpdateHeader';
import ServiceAddHeader from './headerCustom/ServiceAddHeader';

const Stack = createStackNavigator();

const custom = {
  serviceDetailHeader: () => <ServiceDetailHeader />,
  serviceUpdateHeader: () => <ServiceUpdateHeader />,
  serviceAddHeader: () => <ServiceAddHeader />,
};

const AppScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ServicesDetail"
        component={ServicesDetail}
        options={{
          header: custom.serviceDetailHeader,
        }}
      />
      <Stack.Screen
        name="ServiceUpdate"
        component={ServiceUpdate}
        options={{
          header: custom.serviceUpdateHeader,
        }}
      />
      <Stack.Screen
        name="ServiceAdd"
        component={ServiceAdd}
        options={{
          header: custom.serviceAddHeader,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppScreen;
