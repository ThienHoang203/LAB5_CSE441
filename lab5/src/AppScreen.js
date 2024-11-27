import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MenuScreen from './MenuScreen';
import ServicesDetail from './home/ServicesDetail';
import ServiceAdd from './home/ServiceAdd';
import ServiceUpdate from './home/ServiceUpdate';
import ServiceUpdateHeader from './headerCustom/ServiceUpdateHeader';
import AddHeader from './headerCustom/AddHeader';
import CustomerAdd from './customer/CustomerAdd';
import TransactionDetail from './transaction/TransactionDetail';
import CustomerDetail from './customer/CustomerDetail';
import DetailHeader from './headerCustom/DetailHeader';

const Stack = createStackNavigator();

const custom = {
  serviceDetailHeader: () => (
    <DetailHeader
      title="Service detail"
      updateScreenName="ServiceUpdate"
      popUpTitle1="Update"
      popUpTitle2="Delete"
    />
  ),
  serviceUpdateHeader: () => <ServiceUpdateHeader />,
  serviceAddHeader: () => <AddHeader title="Service add" />,
  customerAddHeader: () => <AddHeader title="Add customer" />,
  customerDetailHeader: () => (
    <DetailHeader
      title="Customer detail"
      updateScreenName="ServiceUpdate"
      popUpTitle1="Edit"
      popUpTitle2="Delete"
    />
  ),
  transactionDetailHeader: () => (
    <DetailHeader
      title="Transaction detail"
      updateScreenName="ServiceUpdate"
      popUpTitle1="See more detail"
      popUpTitle2="Delete"
    />
  ),
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
      <Stack.Screen
        name="CustomerAdd"
        component={CustomerAdd}
        options={{
          header: custom.customerAddHeader,
        }}
      />
      <Stack.Screen
        name="CustomerDetail"
        component={CustomerDetail}
        options={{
          header: custom.customerDetailHeader,
        }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetail}
        options={{
          header: custom.transactionDetailHeader,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppScreen;
